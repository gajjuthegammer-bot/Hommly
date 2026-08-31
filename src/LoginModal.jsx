import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginModal = ({ close, switchToRegister }) => {
    const email = useRef();
    const password = useRef();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Lock background scroll while modal is open
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    // =========================
    // VALIDATION
    // =========================
    const validateForm = () => {
        const newErrors = {};

        const emailValue = email.current.value.trim();
        const passwordValue = password.current.value;

        // Email validation
        if (!emailValue) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)
        ) {
            newErrors.email = "Please enter a valid email address";
        }

        // Password validation
        if (!passwordValue) {
            newErrors.password = "Password is required";
        } else if (passwordValue.length < 8) {
            newErrors.password =
                "Password must be at least 8 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // =========================
    // LOGIN
    // =========================
    const handleLogin = async (e) => {
        e.preventDefault();

        // First validate frontend
        if (!validateForm()) {
            return;
        }

        const data = {
            email: email.current.value.trim(),
            password: password.current.value,
        };

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:3030/login",
                data
            );

            if (response.data.status === true) {
                localStorage.setItem("islogin", "yes");
                localStorage.setItem(
                    "userid",
                    response.data.data._id
                );
                localStorage.setItem(
                    "userName",
                    response.data.data.name
                );
                localStorage.setItem(
                    "userEmail",
                    response.data.data.email
                );

                navigate("/About_us");
            } else {
                setErrors({
                    login: "Invalid email or password",
                });
            }
        } catch (err) {
            console.log(err);

            if (err.response) {
                setErrors({
                    login:
                        err.response.data?.message ||
                        "Invalid email or password",
                });
            } else {
                setErrors({
                    login:
                        "Unable to connect to server. Please try again.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // CLEAR ERROR WHEN USER TYPES
    // =========================
    const handleEmailChange = () => {
        setErrors((prev) => ({
            ...prev,
            email: "",
            login: "",
        }));
    };

    const handlePasswordChange = () => {
        setErrors((prev) => ({
            ...prev,
            password: "",
            login: "",
        }));
    };

    return createPortal(
        <div className="auth-overlay">

            <div className="auth-modal login-modal">

                <button
                    className="close-btn"
                    onClick={close}
                    type="button"
                >
                    <RxCross2 />
                </button>

                <h2>Welcome Back</h2>

                <p className="auth-text">
                    Login to continue to Homely
                </p>

                <form onSubmit={handleLogin}>

                    {/* EMAIL */}
                    <label>Email Address</label>

                    <div
                        className={`input-box ${
                            errors.email ? "input-error" : ""
                        }`}
                    >
                        <FiMail />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            ref={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>

                    {errors.email && (
                        <p className="validation-error">
                            {errors.email}
                        </p>
                    )}

                    {/* PASSWORD */}
                    <label>Password</label>

                    <div
                        className={`input-box ${
                            errors.password ? "input-error" : ""
                        }`}
                    >
                        <FiLock />

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Enter your password"
                            ref={password}
                            onChange={handlePasswordChange}
                            minLength={8}
                            required
                        />

                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() =>
                                setShowPassword(
                                    (prev) => !prev
                                )
                            }
                        >
                            {showPassword ? (
                                <FiEyeOff />
                            ) : (
                                <FiEye />
                            )}
                        </button>
                    </div>

                    {errors.password && (
                        <p className="validation-error">
                            {errors.password}
                        </p>
                    )}

                    {/* LOGIN ERROR */}
                    {errors.login && (
                        <p className="login-error">
                            {errors.login}
                        </p>
                    )}

                    {/* REMEMBER */}
                    <div className="remember">

                        <div>
                            <input
                                type="checkbox"
                                defaultChecked
                            />

                            <span>Remember Me</span>
                        </div>

                        <a href="#">
                            Forgot Password?
                        </a>

                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <div className="or">
                        <span>or</span>
                    </div>

                    <button
                        type="button"
                        className="google-btn"
                    >
                        Login with Google
                    </button>

                    <p className="bottom-text">
                        Don't have an account?

                        <button
                            type="button"
                            className="link-btn"
                            onClick={switchToRegister}
                        >
                            Register
                        </button>
                    </p>

                </form>

            </div>

        </div>,

        document.body
    );
};

export default LoginModal;