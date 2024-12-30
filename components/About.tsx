import styled from "@emotion/styled";
import { mediaQueries } from "@app/theme";
import { forwardRef } from "react";

const AboutContainer = styled.div(
    {
        alignItems: "center",
        fontFamily: "sans-serif",
        padding: 32,
        fontSize: 18,
        lineHeight: 2,
        letterSpacing: 1.25,
        [mediaQueries.md]: {
            padding: "25vh 25vw",
            fontSize: 24,
        },
    },
    ({ theme }) => ({
        color: theme.palette.typography.main,
    }),
);

const Link = styled.a(
    {
        textDecoration: "none",
        cursor: "pointer",
        fontWeight: "bold",
    },
    ({ theme }) => ({
        color: theme.palette.typography.secondary,
        "&:hover": {
            color: theme.palette.typography.main,
        },
    }),
);

export const About = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <AboutContainer ref={ref}>
            I'm Nico. Originally from Bogotá, Colombia, I lead and enable teams
            as an Engineering Manager at{" "}
            <Link target="_blank" href="https://www.efworldjourneys.com/">
                EF World Journeys
            </Link>{" "}
            in Zurich, building technology that connects cultures, communities,
            and people through travel. By night, I’m immersed in music and
            art—DJing, producing, and capturing life through the lens of my film
            camera. My journey thrives at the intersection of culture, sound,
            and spiritual curiosity. Drop me a note if you’re into technology,
            music, the cosmos, or the soulful pursuit of making ideas come
            alive.
        </AboutContainer>
    );
});
