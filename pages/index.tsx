import { About, Intro, Links, Tip } from "@app/components";
import { Email } from "@app/components";

export default function Index() {
    return (
        <>
            <Intro />
            <About />
            <Links />
            <Email />
            <Tip />
        </>
    );
}
