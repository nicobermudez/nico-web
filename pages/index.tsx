import { About, Intro, Links, Tip } from "@app/components";
import { Email } from "@app/components";
import { UserGeolocationData } from "@app/middleware";
import { useRef } from "react";

export const getServerSideProps = ({ query }: any) => ({
    props: query,
});

export default function Index({ greeting }: UserGeolocationData) {
    const aboutRef = useRef<HTMLDivElement>(null);
    return (
        <>
            <Intro greeting={greeting} aboutRef={aboutRef} />
            <About ref={aboutRef} />
            <Links />
            <Email />
            <Tip />
        </>
    );
}
