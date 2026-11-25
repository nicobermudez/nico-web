import { depthToHz } from "./bands";

type AudioSessionNavigator = Navigator & {
    audioSession?: { type: string };
};

// A short silent WAV. Playing it through an <audio> element inside the tap
// moves iOS into its media playback category, so the silent switch no longer
// mutes Web Audio. Only needed on iOS versions without navigator.audioSession.
const silentWavUrl = () => {
    const sampleRate = 8000;
    const samples = 800;
    const buffer = new ArrayBuffer(44 + samples * 2);
    const view = new DataView(buffer);
    const write = (offset: number, text: string) =>
        [...text].forEach((c, i) => view.setUint8(offset + i, c.charCodeAt(0)));
    write(0, "RIFF");
    view.setUint32(4, 36 + samples * 2, true);
    write(8, "WAVE");
    write(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    write(36, "data");
    view.setUint32(40, samples * 2, true);
    return URL.createObjectURL(new Blob([buffer], { type: "audio/wav" }));
};

// A small generative soundscape that follows the scene's depth:
// rain in the canopy, a beating drone tuned to the current frequency,
// and a low river rumble near the roots. Started only by a user gesture.
export class JungleAudio {
    private ctx: AudioContext | null = null;
    private unlockEl: HTMLAudioElement | null = null;
    private overtone2!: OscillatorNode;
    private overtone3!: OscillatorNode;
    private master!: GainNode;
    private filter!: BiquadFilterNode;
    private drone!: OscillatorNode;
    private droneBeat!: OscillatorNode;
    private fifth!: OscillatorNode;
    private sub!: OscillatorNode;
    private subGain!: GainNode;
    private rainGain!: GainNode;
    private riverGain!: GainNode;
    private depth = 0;

    get running() {
        return this.ctx?.state === "running";
    }

    // Must be called synchronously from the tap: iOS only allows audio to
    // start inside the gesture itself.
    async start(depth: number) {
        this.unlockIOS();
        if (!this.ctx) this.build();
        const ctx = this.ctx!;
        await ctx.resume();
        this.setDepth(depth, true);
        this.master.gain.cancelScheduledValues(ctx.currentTime);
        this.master.gain.setTargetAtTime(0.55, ctx.currentTime, 0.6);
    }

    async stop() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        this.master.gain.cancelScheduledValues(ctx.currentTime);
        this.master.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
        await new Promise((r) => setTimeout(r, 900));
        if (this.master.gain.value < 0.01) {
            await ctx.suspend();
            this.unlockEl?.pause();
        }
    }

    // iOS can suspend audio when the page is backgrounded; try to resume.
    resumeIfInterrupted() {
        if (this.ctx && this.ctx.state !== "running") {
            this.unlockEl?.play().catch(() => {});
            this.ctx.resume().catch(() => {});
        }
    }

    private unlockIOS() {
        const nav = navigator as AudioSessionNavigator;
        if (nav.audioSession) {
            try {
                nav.audioSession.type = "playback";
            } catch {}
            return;
        }
        if (!this.unlockEl) {
            this.unlockEl = new Audio(silentWavUrl());
            this.unlockEl.loop = true;
            this.unlockEl.setAttribute("playsinline", "");
        }
        this.unlockEl.play().catch(() => {});
    }

    setDepth(depth: number, immediate = false) {
        this.depth = depth;
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const tc = immediate ? 0.01 : 0.35;
        const f = depthToHz(depth);

        this.drone.frequency.setTargetAtTime(f, t, tc);
        // A slight detune makes the two tones beat against each other.
        this.droneBeat.frequency.setTargetAtTime(f * 1.004, t, tc);
        this.fifth.frequency.setTargetAtTime(f * 1.5, t, tc);
        // Natural overtones carry the low tones on small speakers.
        this.overtone2.frequency.setTargetAtTime(f * 2, t, tc);
        this.overtone3.frequency.setTargetAtTime(f * 3, t, tc);
        this.sub.frequency.setTargetAtTime(f / 2, t, tc);

        this.filter.frequency.setTargetAtTime(
            600 + 3400 * Math.pow(1 - depth, 1.5),
            t,
            tc
        );
        this.subGain.gain.setTargetAtTime(0.02 + 0.14 * depth, t, tc);
        this.rainGain.gain.setTargetAtTime(
            0.09 * Math.pow(1 - depth, 2),
            t,
            tc
        );
        this.riverGain.gain.setTargetAtTime(
            0.16 * Math.pow(depth, 1.5),
            t,
            tc
        );
    }

    // A bell in the canopy, a drum at the roots, blended in between.
    pulse() {
        if (!this.running) return;
        const ctx = this.ctx!;
        const t = ctx.currentTime;
        const f = depthToHz(this.depth);
        const bellWeight = 1 - this.depth;
        const drumWeight = this.depth;

        [1, 2.76, 5.4].forEach((ratio, i) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = "sine";
            osc.frequency.value = f * 2 * ratio;
            const peak = (0.12 / (i + 1)) * bellWeight;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(peak, t + 0.005);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 2.8 / (i + 1));
            osc.connect(g).connect(this.master);
            osc.start(t);
            osc.stop(t + 3);
        });

        const drum = ctx.createOscillator();
        const dg = ctx.createGain();
        drum.type = "sine";
        drum.frequency.setValueAtTime(Math.max(f, 70) * 2.2, t);
        drum.frequency.exponentialRampToValueAtTime(Math.max(f, 45), t + 0.18);
        dg.gain.setValueAtTime(0, t);
        dg.gain.linearRampToValueAtTime(0.5 * drumWeight, t + 0.004);
        dg.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
        drum.connect(dg).connect(this.master);
        drum.start(t);
        drum.stop(t + 1);
    }

    dispose() {
        this.ctx?.close();
        this.ctx = null;
        if (this.unlockEl) {
            this.unlockEl.pause();
            URL.revokeObjectURL(this.unlockEl.src);
            this.unlockEl = null;
        }
    }

    private build() {
        const Ctx =
            window.AudioContext ??
            (window as unknown as { webkitAudioContext: typeof AudioContext })
                .webkitAudioContext;
        const ctx = new Ctx();
        this.ctx = ctx;

        this.master = ctx.createGain();
        this.master.gain.value = 0;
        const compressor = ctx.createDynamicsCompressor();
        this.master.connect(compressor).connect(ctx.destination);

        this.filter = ctx.createBiquadFilter();
        this.filter.type = "lowpass";
        this.filter.Q.value = 0.7;
        this.filter.connect(this.master);

        const tone = (type: OscillatorType, gain: number) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = type;
            g.gain.value = gain;
            osc.connect(g).connect(this.filter);
            osc.start();
            return { osc, g };
        };
        this.drone = tone("sine", 0.1).osc;
        this.droneBeat = tone("sine", 0.08).osc;
        this.fifth = tone("triangle", 0.025).osc;
        this.overtone2 = tone("sine", 0.05).osc;
        this.overtone3 = tone("sine", 0.025).osc;
        const sub = tone("sine", 0);
        this.sub = sub.osc;
        this.subGain = sub.g;

        // Shared noise source for rain and river.
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        noise.start();

        const rainHp = ctx.createBiquadFilter();
        rainHp.type = "highpass";
        rainHp.frequency.value = 1800;
        const rainLp = ctx.createBiquadFilter();
        rainLp.type = "lowpass";
        rainLp.frequency.value = 9000;
        this.rainGain = ctx.createGain();
        this.rainGain.gain.value = 0;
        noise.connect(rainHp).connect(rainLp).connect(this.rainGain);
        this.rainGain.connect(this.master);

        const riverLp = ctx.createBiquadFilter();
        riverLp.type = "lowpass";
        riverLp.frequency.value = 260;
        this.riverGain = ctx.createGain();
        this.riverGain.gain.value = 0;
        noise.connect(riverLp).connect(this.riverGain);
        this.riverGain.connect(this.master);
    }
}
