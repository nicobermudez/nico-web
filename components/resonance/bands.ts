// Depth runs from 0 (canopy) to 1 (roots).
//
// Tuning follows Hans Cousto's cosmic octave: a body's orbital period is
// raised by whole octaves until it becomes audible. The Earth year gives
// C# = 136.10 Hz, which places A at 432 Hz. Each band holds one of these
// tones, and depth glides between them only near band edges.

export type Band = {
    name: string;
    from: number;
    to: number;
    hz: number;
    tone: string;
    lines: string[];
};

export const BANDS: Band[] = [
    {
        name: "Canopy",
        from: 0,
        to: 0.25,
        hz: 432,
        tone: "A",
        lines: ["Hola,", "I'm Nico."],
    },
    {
        name: "Understory",
        from: 0.25,
        to: 0.5,
        hz: 210.42,
        tone: "Moon",
        lines: ["Born in Bogotá.", "Tuned in Zürich."],
    },
    {
        name: "Forest floor",
        from: 0.5,
        to: 0.75,
        hz: 136.1,
        tone: "Earth year · Om",
        lines: [
            "I lead teams building technology",
            "that connects people through travel.",
        ],
    },
    {
        name: "Roots",
        from: 0.75,
        to: 1.0001,
        hz: 68.05,
        tone: "Earth year · octave below",
        lines: ["Sound, film, the cosmos.", "Everything vibrates."],
    },
];

export const bandIndexAt = (depth: number) =>
    Math.max(
        0,
        BANDS.findIndex((b) => depth >= b.from && depth < b.to)
    );

// Width of the glide between two neighbouring tones, in depth units.
const GLIDE = 0.08;

export const depthToHz = (depth: number) => {
    for (let i = 1; i < BANDS.length; i++) {
        const edge = BANDS[i].from;
        if (Math.abs(depth - edge) < GLIDE / 2) {
            const t = (depth - (edge - GLIDE / 2)) / GLIDE;
            const s = t * t * (3 - 2 * t);
            const a = BANDS[i - 1].hz;
            const b = BANDS[i].hz;
            // Glide in pitch space (logarithmic), as the ear hears it.
            return a * Math.pow(b / a, s);
        }
    }
    return BANDS[bandIndexAt(depth)].hz;
};

export const formatHz = (hz: number) => hz.toFixed(2).replace(/\.00$/, "");
