import { TfiAngleDown } from "react-icons/tfi";
import { IoCallOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { HiOutlineUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RagistrationModal";
import { useNavigate } from "react-router-dom";
import Userdropdown from './Userdropdown';

const Header = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [ragistrationOpen, setragistrationOpen] = useState(false);

    // mobile menu state (replaces the old document.querySelector code)
    const [menuOpen, setMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null); // 'properties' | 'blogs' | null

    const closeMobileMenu = () => {
        setMenuOpen(false);
        setOpenSubmenu(null);
    };

   const handleParentClick = (e, key) => {
    e.preventDefault(); // hamesha prevent karo, chahe kisi bhi width pe ho
    if (window.innerWidth <= 991) {
        setOpenSubmenu(openSubmenu === key ? null : key);
    }
};

    return (
        <div className="header">
            <div className="container">
                <div className="header-inner">
                    <button
                        className={`menu-toggle ${menuOpen ? 'active' : ''}`}
                        aria-label="Menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span></span><span></span><span></span>
                    </button>

                    <div className="logo">
                        <a href="#"><img src="assets/images/logo.png" alt="home-logo" /></a>
                    </div>
                    <div className={`navbar ${menuOpen ? 'active' : ''}`}>
                        <ul>
                            <li onClick={closeMobileMenu}>
                                <Link to={'/'}>Home</Link>
                            </li>
                            <li onClick={closeMobileMenu}>
                                <Link to={'/About_us'}>About Us</Link>
                            </li>
                            <li className={openSubmenu === 'properties' ? 'open' : ''}>
                                <a href="#" onClick={(e) => handleParentClick(e, 'properties')}>Properties</a>
                                <TfiAngleDown className="a-icon" />
                                <ul className="sub-manu">
                                    <li onClick={closeMobileMenu}>
                                        <Link to={'/Properties'}>Properties</Link>
                                    </li>
                                    <li onClick={closeMobileMenu}><Link to={'/Property-details'}>Property Detail</Link></li>
                                </ul>
                            </li>
                            <li className={openSubmenu === 'blogs' ? 'open' : ''}>
                                <a href="#" onClick={(e) => handleParentClick(e, 'blogs')}>Blogs</a>
                                <TfiAngleDown className="a-icon" />
                                <ul className="sub-manu">
                                    <li onClick={closeMobileMenu}>
                                        <Link to={'/Blogs'}>Blogs</Link>
                                    </li>
                                    <li onClick={closeMobileMenu}><a href="#">Blog detail</a></li>
                                </ul>
                            </li>
                            <li onClick={closeMobileMenu}><Link to={'/contact'}>Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="contact-number">

                        <a href="#"> <i><IoCallOutline /></i>+1 234 567 890</a>
                    </div>
                    <div className="auth-btn">

                        {
                            localStorage.getItem("islogin") &&
                            <Userdropdown />
                        }
                        {
                            !localStorage.getItem("islogin") &&
                            <button
                                className="login-btn"
                                onClick={() => {
                                    setragistrationOpen(false); // Registration band
                                    setLoginOpen(true);         // Login open
                                }}
                            >
                                Login
                            </button>
                        }



                        {
                            !localStorage.getItem("islogin") &&
                            <button
                                className="header-register-btn"
                                onClick={() => {
                                    setragistrationOpen(true);
                                    setLoginOpen(false);
                                }

                                }
                            >
                                Register
                            </button>
                        }




                    </div>


                </div>

                <div
                    className={`mobile-nav-overlay ${menuOpen ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                ></div>

                {
                    loginOpen &&
                    <LoginModal
                        close={() => setLoginOpen(false)}
                        switchToRegister={() => {
                            setLoginOpen(false);
                            setragistrationOpen(true);
                        }}
                    />
                }
                {
                    ragistrationOpen &&
                    <>
                        <RegistrationModal
                            close={() => setragistrationOpen(false)}
                            switchToLogin={() => {
                                setragistrationOpen(false);
                                setLoginOpen(true);
                            }}
                        />


                    </>

                }
            </div >
        </div>
    )
}
export default Header;