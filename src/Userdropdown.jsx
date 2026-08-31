import { useState, useRef, useEffect } from "react";
import { User, ShoppingCart, LogOut, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Userdropdown() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Yahan localStorage se actual user data lo (name, email, avatar)
    const userName = localStorage.getItem("userName") || "User";
    const userEmail = localStorage.getItem("userEmail") || "";

    const initials = userName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    // Bahar click karne par dropdown band karo
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const logout = () => {
        localStorage.removeItem("islogin");
         localStorage.removeItem("userid");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        sessionStorage.removeItem("homeLoaded"); 
        
        setOpen(false);
        window.location.href = "/";
    };

    return (
        <div className="user-dropdown-wrapper" ref={dropdownRef}>
            <button className="user-trigger-btn" onClick={() => setOpen(!open)}>
                <span className="user-avatar">{initials}</span>
                <span className="user-name">{userName}</span>
                <ChevronDown size={16} className={`chevron ${open ? "rotate" : ""}`} />
            </button>

            {open && (
                <div className="user-dropdown-menu">
                    <div className="dropdown-header">
                        <span className="user-avatar large">{initials}</span>
                        <div>
                            <p className="dropdown-user-name">{userName}</p>
                            {userEmail && <p className="dropdown-user-email">{userEmail}</p>}
                        </div>
                    </div>

                    <div className="dropdown-divider" />

                    <Link className="dropdown-item" to={"/Profile"}>
                        <User size={18} />
                        <span>My Profile</span>
                    </Link>

                    <a href="#" className="dropdown-item">
                        <ShoppingCart size={18} />
                        <span>Cart</span>
                    </a>

                    <div className="dropdown-divider" />

                    <button className="dropdown-item logout" onClick={logout}>
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            )}

          
        </div>
    );
}