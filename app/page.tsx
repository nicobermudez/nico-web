"use client";
import { About, Email, Intro, Links } from "@app/components";
import { useRef } from "react";

export default function Home() {
    const aboutRef = useRef<HTMLDivElement>(null);
    return (
        <div>
            <Intro aboutRef={aboutRef} />
            <About ref={aboutRef} />
            <Links />
            <Email />
        </div>
    );
}
