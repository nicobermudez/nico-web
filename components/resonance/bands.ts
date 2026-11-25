// Depth runs from 0 (canopy) to 1 (roots).
//
// Tuning follows Hans Cousto's cosmic octave: a body's orbital period is
// raised by whole octaves until it becomes audible. The Earth year gives
// C# = 136.10 Hz, which places A at 432 Hz. Each band holds one of these
// tones, and depth glides between them only near band edges.
//
// Content descends from the public to the personal: a greeting in the
// canopy, origins and work in the understory, sound (meditation and music
// production) on the forest floor, and what's underneath it all, with an
// invitation to write, at the roots.

export type BandLink = {
    label: string;
    href: string;
};

export type Band = {
    name: string;
    from: number;
    to: number;
    hz: number;
    tone: string;
    lines: string[];
    detail?: string;
    links?: BandLink[];
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
        lines: ["Born in Colombia,", "living in Switzerland."],
        detail: "I build technology that connects people.",
        links: [
            { label: "EF World Journeys", href: "https://www.efworldjourneys.com/" },
            { label: "GitHub", href: "https://github.com/nicobermudez" },
            { label: "CV", href: "https://www.linkedin.com/in/nicolasbermudezco/" },
        ],
    },
    {
        name: "Forest floor",
        from: 0.5,
        to: 0.75,
        hz: 136.1,
        tone: "Earth year · Om",
        lines: ["I love sitting in the space", "between sound."],
        detail: "Sometimes in meditation, sometimes in the studio.",
        links: [{ label: "SoundCloud", href: "https://soundcloud.com/nicobermudez16" }],
    },
    {
        name: "Roots",
        from: 0.75,
        to: 1.0001,
        hz: 68.05,
        tone: "Earth year · octave below",
        lines: ["Everything vibrates."],
        detail: "If you're into sound, tech, or exploring our existence, drop me a note.",
        links: [{ label: "bermnicolas@gmail.com", href: "mailto:bermnicolas@gmail.com" }],
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
