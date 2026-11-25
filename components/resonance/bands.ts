// Depth runs from 0 (canopy, high frequency) to 1 (roots, low frequency).
// The scale spans three octaves, A4 down to A1.
export const F_HIGH = 440;
export const F_LOW = 55;

export const depthToHz = (depth: number) =>
    F_HIGH * Math.pow(F_LOW / F_HIGH, depth);

export type Band = {
    name: string;
    from: number;
    to: number;
    lines: string[];
};

export const BANDS: Band[] = [
    {
        name: "Canopy",
        from: 0,
        to: 0.25,
        lines: ["Hola,", "I'm Nico."],
    },
    {
        name: "Understory",
        from: 0.25,
        to: 0.5,
        lines: ["Born in Bogotá.", "Tuned in Zürich."],
    },
    {
        name: "Forest floor",
        from: 0.5,
        to: 0.75,
        lines: [
            "I lead teams building technology",
            "that connects people through travel.",
        ],
    },
    {
        name: "Roots",
        from: 0.75,
        to: 1.0001,
        lines: ["Sound, film, the cosmos.", "Everything vibrates."],
    },
];

export const bandIndexAt = (depth: number) =>
    Math.max(
        0,
        BANDS.findIndex((b) => depth >= b.from && depth < b.to)
    );
