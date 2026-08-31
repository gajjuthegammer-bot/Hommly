import Category_proms from "./Category_proms";
import { PiHouseLineLight, PiBuildingApartmentLight, PiWarehouse } from "react-icons/pi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlineVilla } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

const GAP = 30; // must match ".block { gap: 30px }" in the CSS
const VISIBLE = 5; // ek time par kitne category cards dikhenge (desktop)
const SLIDE_INTERVAL = 3000; // 3 second
const TRANSITION_MS = 600;
const DESKTOP_BREAKPOINT = 850; // matches the existing mobile CSS breakpoint

const CATDATA = [
    { icon: <PiHouseLineLight />, cartegory: "Residential", prop: "15" },
    { icon: <HiOutlineBuildingOffice2 />, cartegory: "office", prop: "10" },
    { icon: <PiBuildingApartmentLight />, cartegory: "Apartment", prop: "9" },
    { icon: <MdOutlineVilla />, cartegory: "Villa", prop: "5" },
    { icon: <PiWarehouse />, cartegory: "Warehouse", prop: "3" }
];

const Hero = () => {
    const [index, setIndex] = useState(0);
    const [withTransition, setWithTransition] = useState(true);
    const [cardWidth, setCardWidth] = useState(0);
    const [isDesktop, setIsDesktop] = useState(true);

    const timerRef = useRef(null);
    const firstCardRef = useRef(null);

    // Seamless loop ke liye shuru ke VISIBLE cards ko end me clone kar diya
    const slides = [...CATDATA, ...CATDATA.slice(0, VISIBLE)];

    // card ki real rendered width measure karo taaki slide distance aur
    // viewport width har screen size / breakpoint par sahi rahe
    useEffect(() => {
        const measure = () => {
            setIsDesktop(window.innerWidth > DESKTOP_BREAKPOINT);
            if (firstCardRef.current) {
                setCardWidth(firstCardRef.current.getBoundingClientRect().width);
            }
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    useEffect(() => {
        if (!isDesktop) return; // chhote screen par cards stack hote hain, slide nahi

        timerRef.current = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, SLIDE_INTERVAL);

        return () => clearInterval(timerRef.current);
    }, [isDesktop]);

    // Jab clone wale hisse tak pahunch jaye, to bina animation ke start par jump karo (infinite loop illusion)
    useEffect(() => {
        if (index === CATDATA.length) {
            const resetTimer = setTimeout(() => {
                setWithTransition(false);
                setIndex(0);
            }, TRANSITION_MS);
            return () => clearTimeout(resetTimer);
        } else if (!withTransition) {
            // ek frame baad transition wapas on karo taaki next slide smooth ho
            const enableTimer = requestAnimationFrame(() => {
                setWithTransition(true);
            });
            return () => cancelAnimationFrame(enableTimer);
        }
    }, [index, withTransition]);

    const step = cardWidth + GAP;
    const viewportWidth = cardWidth ? cardWidth * VISIBLE + GAP * (VISIBLE - 1) : undefined;

    const visibleData = isDesktop ? slides : CATDATA;

    return (
        <div className="hero-sec">
            <div className="container">
                <div className="inner-hero-sec">
                    <div className="content">
                        <h2>
                            Find Your Dream <br />
                            Home with Us
                        </h2>
                        <a href="#">Find Home</a>
                    </div>
                    <div className="category-block">
                        <div className="categorys">
                            <div className="cat-viewport"
                                style={isDesktop ? { width: viewportWidth } : undefined}
                            >
                                <div
                                    className="block"
                                    style={
                                        isDesktop
                                            ? {
                                                  transform: `translateX(-${index * step}px)`,
                                                  transition: withTransition ? "transform .6s ease" : "none",
                                              }
                                            : undefined
                                    }
                                >
                                    {visibleData.map((item, i) => (
                                        <div className="category" key={i} ref={i === 0 ? firstCardRef : null}>
                                            <Category_proms
                                                icon={item.icon}
                                                cartegory={item.cartegory}
                                                prop={item.prop}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Hero