import React, { forwardRef } from "react";
import styles from "./About.module.css";
import Link from "next/link";

export const About = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} className={styles.container}>
            I&apos;m Nico. Originally from Bogotá, Colombia, I lead and enable
            teams as an Engineering Manager at&nbsp;
            <Link
                target="_blank"
                href="https://www.efworldjourneys.com/"
                className={styles.link}
            >
                EF World Journeys
            </Link>
            &nbsp;in Zurich, building technology that connects cultures,
            communities, and people through travel. By night, I’m immersed in
            music and art—DJing, producing, and capturing life through the lens
            of my film camera. My journey thrives at the intersection of
            culture, sound, and spiritual curiosity. Drop me a note if you’re
            into technology, music, the cosmos, or the soulful pursuit of making
            ideas come alive.
        </div>
    );
});

About.displayName = "About";
