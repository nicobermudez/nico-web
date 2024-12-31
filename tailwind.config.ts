import type { Config } from "tailwindcss";

export default {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                typography: {
                    main: "#ffffff",
                    secondary: "#E0FBFC",
                    contrast: "#3D5A80",
                },
                surfaces: {
                    default: "#16181d",
                    secondary: "#ffffff",
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
