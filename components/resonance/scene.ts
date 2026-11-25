import * as THREE from "three";

export type SceneOptions = {
    reducedMotion: boolean;
    onFrame?: (depth: number) => void;
    onPulse?: () => void;
};

export type SceneHandle = {
    setDepth: (depth: number) => void;
    dispose: () => void;
};

const FIELD_RADIUS = 7;

// Canopy (depth 0) to roots (depth 1).
const PALETTE = {
    bgHigh: new THREE.Color("#0a120c"),
    bgLow: new THREE.Color("#120b07"),
    sandHigh: new THREE.Color("#9fc7a0"),
    sandLow: new THREE.Color("#c97a3a"),
    node: new THREE.Color("#f3ead6"),
    firefly: new THREE.Color("#ffd27a"),
    rain: new THREE.Color("#cfe3da"),
};

const fieldVertex = /* glsl */ `
    uniform float uTime;
    uniform float uDepth;
    uniform float uSize;
    uniform float uPixelRatio;
    uniform vec2 uPointer;
    uniform float uPointerStrength;
    uniform vec2 uPulseOrigin;
    uniform float uPulseTime;

    attribute vec2 aUv;
    attribute float aSeed;

    varying float vAlpha;
    varying float vNode;

    const float PI = 3.14159265;

    // Chladni plate: the standing-wave pattern sand settles into on a vibrating plate.
    float chladni(vec2 p, float n, float m) {
        return cos(n * PI * p.x) * cos(m * PI * p.y)
             - cos(m * PI * p.x) * cos(n * PI * p.y);
    }

    float modeAt(vec2 p, float i) {
        float n = 7.0 - i;
        float m = max(1.0, floor(n / 2.0));
        return chladni(p, n, m);
    }

    void main() {
        vec2 p = aUv;

        // Higher frequency = more nodal lines. Blend between integer modes.
        float k = uDepth * 5.0;
        float i = min(floor(k), 4.0);
        float c = mix(modeAt(p, i), modeAt(p, i + 1.0), smoothstep(0.0, 1.0, k - i));

        float speed = mix(1.4, 0.45, uDepth);
        float osc = sin(uTime * speed * 6.2831 + aSeed * 0.3);

        vec3 pos = position;
        float amp = mix(0.22, 0.55, uDepth);
        pos.y += c * osc * amp;

        // The visitor's presence ripples the field.
        float d = distance(pos.xz, uPointer);
        pos.y += sin(d * 4.0 - uTime * 5.0) * exp(-d * 0.9) * 0.35 * uPointerStrength;

        // A tap sends a ring outward.
        float age = uTime - uPulseTime;
        float pd = distance(pos.xz, uPulseOrigin);
        float ring = exp(-abs(pd - age * 3.0) * 2.0) * exp(-age * 1.2);
        pos.y += ring * 0.6;

        // Sand gathers on the nodal lines, where the plate stays still.
        float node = 1.0 - smoothstep(0.0, 0.2, abs(c));
        vNode = clamp(node + ring * 0.6, 0.0, 1.0);

        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mv;
        // Clamp so grains close to the camera stay sand, not blobs.
        gl_PointSize = min(uSize * uPixelRatio * mix(0.55, 1.35, vNode) / -mv.z, 6.0 * uPixelRatio);

        float edge = 1.0 - smoothstep(0.7, 1.0, length(p));
        vAlpha = edge * mix(0.1, 0.85, vNode);
    }
`;

const fieldFragment = /* glsl */ `
    uniform float uDepth;
    uniform vec3 uSandHigh;
    uniform vec3 uSandLow;
    uniform vec3 uNode;

    varying float vAlpha;
    varying float vNode;

    void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float soft = smoothstep(0.5, 0.0, d);
        vec3 base = mix(uSandHigh, uSandLow, uDepth);
        vec3 col = mix(base * 0.7, uNode, vNode * 0.6);
        gl_FragColor = vec4(col, vAlpha * soft);
    }
`;

const rainVertex = /* glsl */ `
    uniform float uTime;
    uniform float uPixelRatio;
    attribute vec3 aSeed;
    varying float vFade;

    void main() {
        float h = 10.0;
        float y = 7.0 - mod(aSeed.z * h + uTime * (5.0 + aSeed.x * 2.0), h);
        vec3 pos = vec3(position.x, y, position.z);
        vFade = smoothstep(-3.0, 0.5, y) * smoothstep(7.0, 5.0, y);
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = 90.0 * uPixelRatio / -mv.z;
    }
`;

const rainFragment = /* glsl */ `
    uniform vec3 uColor;
    uniform float uOpacity;
    varying float vFade;

    void main() {
        vec2 c = gl_PointCoord - 0.5;
        float streak = (1.0 - smoothstep(0.0, 0.04, abs(c.x)))
                     * (1.0 - smoothstep(0.1, 0.5, abs(c.y)));
        gl_FragColor = vec4(uColor, streak * vFade * uOpacity);
    }
`;

const fireflyVertex = /* glsl */ `
    uniform float uTime;
    uniform float uPixelRatio;
    attribute vec3 aSeed;
    varying float vBlink;

    void main() {
        vec3 pos = position;
        float t = uTime * 0.35;
        pos.x += sin(t * (0.7 + aSeed.x) + aSeed.y * 6.0) * 0.8;
        pos.y += sin(t * (0.5 + aSeed.y) + aSeed.z * 6.0) * 0.35;
        pos.z += cos(t * (0.6 + aSeed.z) + aSeed.x * 6.0) * 0.8;
        vBlink = pow(max(0.0, sin(uTime * (0.6 + aSeed.z * 0.8) + aSeed.x * 20.0)), 6.0);
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = 70.0 * uPixelRatio / -mv.z;
    }
`;

const fireflyFragment = /* glsl */ `
    uniform vec3 uColor;
    uniform float uOpacity;
    varying float vBlink;

    void main() {
        float d = length(gl_PointCoord - 0.5);
        float glow = pow(max(0.0, 1.0 - d * 2.0), 2.5);
        gl_FragColor = vec4(uColor, glow * vBlink * uOpacity);
    }
`;

const smooth01 = (e0: number, e1: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
    return t * t * (3 - 2 * t);
};

export function createScene(
    canvas: HTMLCanvasElement,
    { reducedMotion, onFrame, onPulse }: SceneOptions
): SceneHandle {
    const isSmall = window.matchMedia("(max-width: 768px)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
    });
    renderer.setPixelRatio(pixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);

    // --- Cymatic sand field -------------------------------------------------
    const fieldCount = isSmall ? 26000 : 60000;
    const fieldPos = new Float32Array(fieldCount * 3);
    const fieldUv = new Float32Array(fieldCount * 2);
    const fieldSeed = new Float32Array(fieldCount);
    for (let i = 0; i < fieldCount; i++) {
        const r = Math.sqrt(Math.random());
        const a = Math.random() * Math.PI * 2;
        const u = Math.cos(a) * r;
        const v = Math.sin(a) * r;
        fieldUv.set([u, v], i * 2);
        fieldPos.set([u * FIELD_RADIUS, 0, v * FIELD_RADIUS], i * 3);
        fieldSeed[i] = Math.random();
    }
    const fieldGeo = new THREE.BufferGeometry();
    fieldGeo.setAttribute("position", new THREE.BufferAttribute(fieldPos, 3));
    fieldGeo.setAttribute("aUv", new THREE.BufferAttribute(fieldUv, 2));
    fieldGeo.setAttribute("aSeed", new THREE.BufferAttribute(fieldSeed, 1));

    const fieldMat = new THREE.ShaderMaterial({
        vertexShader: fieldVertex,
        fragmentShader: fieldFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
            uTime: { value: 0 },
            uDepth: { value: 0 },
            uSize: { value: isSmall ? 34 : 28 },
            uPixelRatio: { value: pixelRatio },
            uPointer: { value: new THREE.Vector2(99, 99) },
            uPointerStrength: { value: 0 },
            uPulseOrigin: { value: new THREE.Vector2(0, 0) },
            uPulseTime: { value: -100 },
            uSandHigh: { value: PALETTE.sandHigh },
            uSandLow: { value: PALETTE.sandLow },
            uNode: { value: PALETTE.node },
        },
    });
    const field = new THREE.Points(fieldGeo, fieldMat);
    scene.add(field);

    // --- Rain ---------------------------------------------------------------
    const rainCount = isSmall ? 900 : 2200;
    const rainPos = new Float32Array(rainCount * 3);
    const rainSeed = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
        const r = Math.sqrt(Math.random()) * 9;
        const a = Math.random() * Math.PI * 2;
        rainPos.set([Math.cos(a) * r, 0, Math.sin(a) * r], i * 3);
        rainSeed.set([Math.random(), Math.random(), Math.random()], i * 3);
    }
    const rainGeo = new THREE.BufferGeometry();
    rainGeo.setAttribute("position", new THREE.BufferAttribute(rainPos, 3));
    rainGeo.setAttribute("aSeed", new THREE.BufferAttribute(rainSeed, 3));
    const rainMat = new THREE.ShaderMaterial({
        vertexShader: rainVertex,
        fragmentShader: rainFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
            uTime: { value: 0 },
            uPixelRatio: { value: pixelRatio },
            uColor: { value: PALETTE.rain },
            uOpacity: { value: 0.35 },
        },
    });
    const rain = new THREE.Points(rainGeo, rainMat);
    scene.add(rain);

    // --- Fireflies ----------------------------------------------------------
    const flyCount = isSmall ? 90 : 180;
    const flyPos = new Float32Array(flyCount * 3);
    const flySeed = new Float32Array(flyCount * 3);
    for (let i = 0; i < flyCount; i++) {
        const r = Math.sqrt(Math.random()) * 6.5;
        const a = Math.random() * Math.PI * 2;
        flyPos.set(
            [Math.cos(a) * r, 0.3 + Math.random() * 2.2, Math.sin(a) * r],
            i * 3
        );
        flySeed.set([Math.random(), Math.random(), Math.random()], i * 3);
    }
    const flyGeo = new THREE.BufferGeometry();
    flyGeo.setAttribute("position", new THREE.BufferAttribute(flyPos, 3));
    flyGeo.setAttribute("aSeed", new THREE.BufferAttribute(flySeed, 3));
    const flyMat = new THREE.ShaderMaterial({
        vertexShader: fireflyVertex,
        fragmentShader: fireflyFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
            uTime: { value: 0 },
            uPixelRatio: { value: pixelRatio },
            uColor: { value: PALETTE.firefly },
            uOpacity: { value: 0 },
        },
    });
    const fireflies = new THREE.Points(flyGeo, flyMat);
    scene.add(fireflies);

    // --- Interaction --------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const ndc = new THREE.Vector2();
    const hit = new THREE.Vector3();
    const parallax = new THREE.Vector2();
    let pointerTarget = 0;
    let lastMove = 0;

    const toGround = (clientX: number, clientY: number) => {
        const rect = canvas.getBoundingClientRect();
        ndc.set(
            ((clientX - rect.left) / rect.width) * 2 - 1,
            -((clientY - rect.top) / rect.height) * 2 + 1
        );
        raycaster.setFromCamera(ndc, camera);
        return raycaster.ray.intersectPlane(ground, hit);
    };

    const onPointerMove = (e: PointerEvent) => {
        parallax.set(
            (e.clientX / window.innerWidth) * 2 - 1,
            (e.clientY / window.innerHeight) * 2 - 1
        );
        if (toGround(e.clientX, e.clientY)) {
            fieldMat.uniforms.uPointer.value.set(hit.x, hit.z);
            pointerTarget = 1;
            lastMove = performance.now();
        }
    };

    const onPointerDown = (e: PointerEvent) => {
        if (toGround(e.clientX, e.clientY)) {
            fieldMat.uniforms.uPulseOrigin.value.set(hit.x, hit.z);
            fieldMat.uniforms.uPulseTime.value = fieldMat.uniforms.uTime.value;
            onPulse?.();
        }
    };

    const target = canvas.parentElement ?? canvas;
    target.addEventListener("pointermove", onPointerMove);
    target.addEventListener("pointerdown", onPointerDown);

    // --- Sizing -------------------------------------------------------------
    const resize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // Pull back on narrow screens so the plate still fits.
        camera.fov = camera.aspect < 0.8 ? 68 : 50;
        camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // --- Loop ---------------------------------------------------------------
    let targetDepth = 0;
    let depth = 0;
    let time = 0;
    let last = performance.now();
    let frame = 0;
    let visible = true;
    const bg = new THREE.Color();
    const lookAt = new THREE.Vector3();

    const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
    });
    io.observe(canvas);

    const tick = (now: number) => {
        frame = requestAnimationFrame(tick);
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        if (!visible) return;

        if (!reducedMotion) time += dt;
        depth += (targetDepth - depth) * (1 - Math.exp(-dt * 4));

        if (now - lastMove > 1200) pointerTarget = 0;
        const ps = fieldMat.uniforms.uPointerStrength;
        ps.value += (pointerTarget - ps.value) * (1 - Math.exp(-dt * 3));

        fieldMat.uniforms.uTime.value = time;
        fieldMat.uniforms.uDepth.value = depth;
        rainMat.uniforms.uTime.value = time;
        rainMat.uniforms.uOpacity.value = 0.4 * (1 - smooth01(0.1, 0.5, depth));
        flyMat.uniforms.uTime.value = time;
        flyMat.uniforms.uOpacity.value =
            smooth01(0.15, 0.45, depth) * (1 - 0.6 * smooth01(0.8, 1, depth));

        // Descend toward the plate as depth increases.
        const sway = reducedMotion ? 0 : Math.sin(time * 0.15) * 0.4;
        camera.position.set(
            sway + parallax.x * 0.6,
            7.5 - 5.0 * depth - parallax.y * 0.3,
            7.5 - 1.5 * depth
        );
        lookAt.set(0, 0.5 * depth, 0);
        camera.lookAt(lookAt);
        field.rotation.y = time * 0.02;

        bg.copy(PALETTE.bgHigh).lerp(PALETTE.bgLow, depth);
        renderer.setClearColor(bg);
        renderer.render(scene, camera);
        onFrame?.(depth);
    };
    frame = requestAnimationFrame(tick);

    return {
        setDepth: (d) => {
            targetDepth = Math.min(1, Math.max(0, d));
        },
        dispose: () => {
            cancelAnimationFrame(frame);
            ro.disconnect();
            io.disconnect();
            target.removeEventListener("pointermove", onPointerMove);
            target.removeEventListener("pointerdown", onPointerDown);
            [fieldGeo, rainGeo, flyGeo].forEach((g) => g.dispose());
            [fieldMat, rainMat, flyMat].forEach((m) => m.dispose());
            renderer.dispose();
        },
    };
}
