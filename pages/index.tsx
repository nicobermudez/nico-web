import { About, Intro, Links, Tip } from "@app/components";
import { Email } from "@app/components";
import { UserGeolocationData } from "@app/middleware";

export const getServerSideProps = ({ query }: any) => ({
    props: query,
});

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
