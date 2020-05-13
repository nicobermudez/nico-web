import React, { useState, useEffect } from "react";
import { Loading } from "./Loading";
import { Intro } from "./Intro";
import { About } from "./About";
import { Footer } from "./Footer";

export const Home: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
          }, 2000);
          return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading 
                ? <Loading />
                : <div style={{ position: "relative" }}>
                    <Intro />
                    <About />
                    <Footer />
                </div>
            }
        </>
    );
};
