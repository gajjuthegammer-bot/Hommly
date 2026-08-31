import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Progres from "./Progres";
import Header from "../Header";
import Footer from "../Footer";
import Solution from "./Solution";
import Gallery from "./Gallery";
import Check_out from "./Check_out";
import Testimonial from "./Testimonial";
import Brands from "./Brands";
import AGENTS from "./AGENTS";
import LatestBlog from "./LatestBlog";

const Home = () => {
    // Agar flag pehle se set hai, to loading skip karo
    const [loading, setLoading] = useState(() => {
        return sessionStorage.getItem("homeLoaded") ? false : true;
    });

    useEffect(() => {
        // Sirf pehli baar hi timer chalao
        if (!sessionStorage.getItem("homeLoaded")) {
            const timer = setTimeout(() => {
                setLoading(false);
                sessionStorage.setItem("homeLoaded", "true");
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, []);

    if (loading) {
        return (
            <div className="loader-container">
                <div>
                    <span className="loader"></span>
                    <h1 style={{ color: "orange", fontSize: "60px" }}>Home</h1>
                </div>
            </div>
        );
    }

return (
    <>
        <Header />
        <Hero />
        <Progres />
        <Solution />
        <Gallery />
        <Check_out />
        <Testimonial />
        <AGENTS/>
         <LatestBlog />
        <Brands />
        <Footer />
       
    </>
);
};

export default Home;