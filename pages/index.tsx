import { About, Intro, Links, Tip } from "@app/components";
import { Email } from "@app/components/Email";
import { UserGeolocationData } from "@app/middleware";

export default function Index({ greeting }: UserGeolocationData) {
    return (
        <>
            <Intro greeting={greeting} />
            <About />
            <Links />
            <Email />
            <Tip />
        </>
    );
}
