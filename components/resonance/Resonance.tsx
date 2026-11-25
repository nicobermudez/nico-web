"use client";

import React, { useEffect, useRef, useState } from "react";
import { JungleAudio } from "./audio";
import { BANDS, bandIndexAt, depthToHz } from "./bands";
import type { SceneHandle } from "./scene";
import styles from "./Resonance.module.css";

export const Resonance: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hzRef = useRef<HTMLSpanElement>(null);
    const markerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<SceneHandle | null>(null);
    const audioRef = useRef<JungleAudio | null>(null);
    const depthRef = useRef(0);
    const bandRef = useRef(0);

    const [band, setBand] = useState(0);
    const [soundOn, setSoundOn] = useState(false);
    const [webglFailed, setWebglFailed] = useState(false);

    // Reflect the scene's eased depth in the overlay without re-rendering React every frame.
    const showDepth = (d: number) => {
        if (hzRef.current) hzRef.current.textContent = `${Math.round(depthToHz(d))} Hz`;
        if (markerRef.current) markerRef.current.style.top = `${d * 100}%`;
        const i = bandIndexAt(d);
        if (i !== bandRef.current) {
            bandRef.current = i;
            setBand(i);
        }
    };

    useEffect(() => {
        let disposed = false;
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const readScroll = () => {
            const el = sectionRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const travel = rect.height - window.innerHeight;
            const d = Math.min(1, Math.max(0, -rect.top / travel));
            depthRef.current = d;
            sceneRef.current?.setDepth(d);
            audioRef.current?.setDepth(d);
            if (!sceneRef.current) showDepth(d);
        };

        import("./scene")
            .then(({ createScene }) => {
                if (disposed || !canvasRef.current) return;
                sceneRef.current = createScene(canvasRef.current, {
                    reducedMotion,
                    onFrame: showDepth,
                    onPulse: () => audioRef.current?.pulse(),
                });
                readScroll();
            })
            .catch(() => setWebglFailed(true));

        window.addEventListener("scroll", readScroll, { passive: true });
        readScroll();

        return () => {
            disposed = true;
            window.removeEventListener("scroll", readScroll);
            sceneRef.current?.dispose();
            sceneRef.current = null;
            audioRef.current?.dispose();
            audioRef.current = null;
        };
    }, []);

    const toggleSound = async () => {
        if (!audioRef.current) audioRef.current = new JungleAudio();
        if (soundOn) {
            setSoundOn(false);
            await audioRef.current.stop();
        } else {
            setSoundOn(true);
            await audioRef.current.start(depthRef.current);
        }
    };

    return (
        <section
            ref={sectionRef}
            className={styles.section}
            aria-label="Hola. Scroll to descend from the canopy to the roots."
        >
            <div className={styles.stage}>
                <canvas
                    ref={canvasRef}
                    className={`${styles.canvas} ${webglFailed ? styles.fallback : ""}`}
                    aria-hidden="true"
                />

                <div className={styles.bands}>
                    {BANDS.map((b, i) => (
                        <div
                            key={b.name}
                            className={`${styles.band} ${i === band ? styles.active : ""}`}
                        >
                            <p className={styles.bandName}>{b.name}</p>
                            {b.lines.map((line) =>
                                i === 0 ? (
                                    <h1 key={line} className={styles.line}>
                                        {line}
                                    </h1>
                                ) : (
                                    <p key={line} className={styles.line}>
                                        {line}
                                    </p>
                                )
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.meter} aria-hidden="true">
                    <div className={styles.track}>
                        {BANDS.map((b) => (
                            <span
                                key={b.name}
                                className={styles.tick}
                                style={{ top: `${b.from * 100}%` }}
                            />
                        ))}
                        <div ref={markerRef} className={styles.marker}>
                            <span ref={hzRef} className={styles.hz}>
                                440 Hz
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className={styles.sound}
                    onClick={toggleSound}
                    aria-pressed={soundOn}
                >
                    <span className={`${styles.dot} ${soundOn ? styles.dotOn : ""}`} />
                    {soundOn ? "Sound on" : "Sound off"}
                </button>

                <p className={styles.hint}>
                    Scroll to descend · Tap the field to make it ring
                </p>
            </div>
        </section>
    );
};
