import { useState, useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaDribbble } from "react-icons/fa";

const AGENTS = [
    {
        name: "Rebecca Robinson",
        title: "Real Estate Broker",
        img: "https://i.pravatar.cc/400?img=32",
    },
    {
        name: "Susan Hernandez",
        title: "Real Estate Broker",
        img: "https://i.pravatar.cc/400?img=47",
    },
    {
        name: "William Martinez",
        title: "Real Estate Broker",
        img: "https://i.pravatar.cc/400?img=13",
    },
    {
        name: "Rebecca Robinson",
        title: "Real Estate Broker",
        img: "https://i.pravatar.cc/400?img=45",
    },
    {
        name: "Daniel Carter",
        title: "Real Estate Broker",
        img: "https://i.pravatar.cc/400?img=51",
    },
    {
        name: "Amanda Lewis",
        title: "Real Estate Broker",
        img: "https://i.pravatar.cc/400?img=29",
    },
];

const SLIDE_INTERVAL = 3000; // 3 second
const TRANSITION_MS = 600;

// CSS ke media queries (980px / 560px) se hubahu match karta hai.
// Agar CSS breakpoint badlo, to yahan bhi wahi number badalna zaroori hai,
// warna translateX step aur actual card-width out of sync ho jayega.
const getVisibleCount = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth <= 580) return 1;
    if (window.innerWidth <= 980) return 2;
    return 4;
};

export default function AgentsSection() {
    const [index, setIndex] = useState(0);
    const [withTransition, setWithTransition] = useState(true);
    const [visible, setVisible] = useState(getVisibleCount);
    const timerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setVisible(getVisibleCount());
            // breakpoint badalte hi index reset karo taaki purana index
            // naye layout ke hisaab se galat jagah na le jaye
            setWithTransition(false);
            setIndex(0);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Seamless loop ke liye shuru ke `visible` cards ko end me clone kar diya
    const slides = [...AGENTS, ...AGENTS.slice(0, visible)];

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, SLIDE_INTERVAL);

        return () => clearInterval(timerRef.current);
    }, []);

    // Jab clone wale hisse tak pahunch jaye, to bina animation ke start par jump karo (infinite loop illusion)
    useEffect(() => {
        if (index === AGENTS.length) {
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

    return (
        <section className="agents-section">
            <div className="agents-heading">
                <h2>Meet Our Real Estate Agents</h2>
                <p>
                    Meet our team of experienced and professional real estate agents
                    ready to help you with your property needs.
                </p>
            </div>

            <div className="agents-viewport">
                <div
                    className="agents-track"
                    style={{
                        transform: `translateX(-${index * (100 / visible)}%)`,
                        transition: withTransition
                            ? `transform ${TRANSITION_MS}ms ease`
                            : "none",
                    }}
                >
                    {slides.map((agent, i) => (
                        <div className="agent-card" key={i}>
                            <div className="agent-card-content">
                                <img className="agent-photo" src={agent.img} alt={agent.name} />
                                <h3>{agent.name}</h3>
                                <p>{agent.title}</p>
                                <div className="agent-socials">
                                    <a href="#" aria-label="Facebook">
                                        <FaFacebookF size={14} />
                                    </a>
                                    <a href="#" aria-label="Instagram">
                                        <FaInstagram size={14} />
                                    </a>
                                    <a href="#" aria-label="YouTube">
                                        <FaYoutube size={14} />
                                    </a>
                                    <a href="#" aria-label="Dribbble">
                                        <FaDribbble size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{styles}</style>
        </section>
    );
}

const styles = `
    .agents-section {
        background: #f7f7f8;
        padding: 70px 20px;
        font-family: 'Segoe UI', sans-serif;
    }

    .agents-heading {
        text-align: center;
        max-width: 640px;
        margin: 0 auto 44px auto;
    }

    .agents-heading h2 {
        font-size: 36px;
        font-weight: 700;
        letter-spacing: 0.5px;
        color: #16181d;
        margin: 0 0 14px 0;
        text-transform: uppercase;
    }

    .agents-heading p {
        color: #6b7280;
        font-size: 15px;
        line-height: 1.6;
        margin: 0;
    }

    .agents-viewport {
        max-width: 1400px;
        margin: 0 auto;
        overflow: hidden;
    }

    .agents-track {
        display: flex;
    }

    .agent-card {
        flex: 0 0 25%;
        box-sizing: border-box;
        padding: 0 12px;
    }

    .agent-card-content {
        background: #eef0f2;
        border-radius: 14px;
        padding: 36px 20px 26px 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .agent-photo {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid #fff;
    }

    .agent-card-content h3 {
        margin: 22px 0 4px 0;
        font-size: 20px;
        font-weight: 700;
        color: #16181d;
    }

    .agent-card-content p {
        margin: 0 0 18px 0;
        font-size: 14px;
        color: #8a8f98;
        font-weight: 500;
    }

    .agent-socials {
        display: flex;
        justify-content: center;
        gap: 14px;
    }

    .agent-socials a {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #16181d;
        background: transparent;
        border: 1.5px solid #16181d;
        transition: background 0.15s ease, color 0.15s ease;
    }

    .agent-socials a:hover {
        background: #16181d;
        color: #fff;
    }

    @media (max-width: 980px) {
        .agent-card {
            flex: 0 0 50%;
        }
    }

    @media (max-width: 560px) {
        .agent-card {
            flex: 0 0 100%;
        }
        .agents-heading h2 {
            font-size: 24px;
        }
    }
`;