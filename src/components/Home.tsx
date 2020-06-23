import React, { useState, useEffect } from "react";
import { Loading } from "./Loading";
import { About } from "./About";
import { Email } from "./Email";
import { Footer } from "./Footer";
import { Intro } from "./Intro";
import firebase from "firebase";

export const Home: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
          }, 2000);
          return () => clearTimeout(timer);
    }, []);

    firebase.analytics().logEvent('notification_received');

    return (
        <>
            {loading
                ? <Loading />
                : <div style={{ position: "relative" }}>
                    <Intro />
                    <About />
                    <Footer />
                    <Email />
                </div>
            }
        </>
    );
};
