import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaPhone,
    FaGoogle
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";


const RegistrationModal = ({ close, switchToLogin }) => {

    const name = useRef();
    const email = useRef();
    const phone = useRef();
    const password = useRef();
    const cpassword = useRef();
    const terms = useRef();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // =========================
    // LOCK BACKGROUND SCROLL
    // =========================

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

        const nameValue = name.current.value.trim();
        const emailValue = email.current.value.trim();
        const phoneValue = phone.current.value.trim();
        const passwordValue = password.current.value;
        const cpasswordValue = cpassword.current.value;


        // -------------------------
        // NAME
        // -------------------------

        if (!nameValue) {

            newErrors.name = "Full name is required";

        } else if (nameValue.length < 3) {

            newErrors.name =
                "Name must be at least 3 characters";

        } else if (!/^[A-Za-z ]+$/.test(nameValue)) {

            newErrors.name =
                "Name can contain only letters";

        }


        // -------------------------
        // EMAIL
        // -------------------------

        if (!emailValue) {

            newErrors.email =
                "Email is required";

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)
        ) {

            newErrors.email =
                "Please enter a valid email address";

        }


        // -------------------------
        // PHONE
        // -------------------------

        if (!phoneValue) {

            newErrors.phone =
                "Phone number is required";

        } else if (!/^[0-9]{10}$/.test(phoneValue)) {

            newErrors.phone =
                "Phone number must be exactly 10 digits";

        }


        // -------------------------
        // PASSWORD
        // -------------------------

        if (!passwordValue) {

            newErrors.password =
                "Password is required";

        } else if (passwordValue.length < 8) {

            newErrors.password =
                "Password must be at least 8 characters";

        } else if (!/[A-Z]/.test(passwordValue)) {

            newErrors.password =
                "Password must contain at least 1 uppercase letter";

        } else if (!/[a-z]/.test(passwordValue)) {

            newErrors.password =
                "Password must contain at least 1 lowercase letter";

        } else if (!/[0-9]/.test(passwordValue)) {

            newErrors.password =
                "Password must contain at least 1 number";

        }


        // -------------------------
        // CONFIRM PASSWORD
        // -------------------------

        if (!cpasswordValue) {

            newErrors.cpassword =
                "Please confirm your password";

        } else if (passwordValue !== cpasswordValue) {

            newErrors.cpassword =
                "Passwords do not match";

        }


        // -------------------------
        // TERMS
        // -------------------------

        if (!terms.current.checked) {

            newErrors.terms =
                "You must agree to the Terms & Conditions";

        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    // =========================
    // CLEAR FIELD ERROR
    // =========================

    const clearError = (field) => {

        setErrors((prev) => ({
            ...prev,
            [field]: "",
            register: ""
        }));

    };


    // =========================
    // REGISTRATION
    // =========================

    const handleRegistration = async (e) => {

        e.preventDefault();

        // Frontend validation
        if (!validateForm()) {
            return;
        }


        const data = {

            name: name.current.value.trim(),

            email: email.current.value.trim(),

            phone: phone.current.value.trim(),

            password: password.current.value

        };


        try {

            setLoading(true);


            const res = await axios.post(
                "http://localhost:3030/Ragistration",
                data
            );


            console.log(res.data);


            if (res.data.status === false) {

                setErrors({
                    register:
                        res.data.message ||
                        "Registration failed"
                });

                return;
            }


            // SUCCESS

            alert("Registration successful");

            close();

            switchToLogin();


        } catch (err) {

            console.log(err);


            if (err.response) {

                setErrors({

                    register:
                        err.response.data?.message ||
                        "Registration failed"

                });

            } else {

                setErrors({

                    register:
                        "Unable to connect to server. Please try again."

                });

            }

        } finally {

            setLoading(false);

        }

    };


    return createPortal(

        <div className="auth-overlay">

            <div className="auth-modal register-modal">


                {/* CLOSE BUTTON */}

                <button
                    className="close-btn"
                    onClick={close}
                    type="button"
                >

                    <IoClose />

                </button>


                <h1>Create Account</h1>

                <p className="auth-text">
                    Register to get started with Homely
                </p>


                <form onSubmit={handleRegistration}>


                    {/* ================= NAME + EMAIL ================= */}

                    <div className="row">


                        {/* NAME */}

                        <div>

                            <label>Full Name</label>

                            <div
                                className={`input-box ${
                                    errors.name
                                        ? "input-error"
                                        : ""
                                }`}
                            >

                                <FaUser className="icon" />

                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    ref={name}
                                    onChange={() =>
                                        clearError("name")
                                    }
                                    required
                                />

                            </div>


                            {errors.name && (

                                <p className="validation-error">
                                    {errors.name}
                                </p>

                            )}

                        </div>


                        {/* EMAIL */}

                        <div>

                            <label>Email Address</label>

                            <div
                                className={`input-box ${
                                    errors.email
                                        ? "input-error"
                                        : ""
                                }`}
                            >

                                <FaEnvelope className="icon" />

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    ref={email}
                                    onChange={() =>
                                        clearError("email")
                                    }
                                    required
                                />

                            </div>


                            {errors.email && (

                                <p className="validation-error">
                                    {errors.email}
                                </p>

                            )}

                        </div>

                    </div>


                    {/* ================= PHONE ================= */}

                    <label>Phone Number</label>

                    <div
                        className={`input-box full ${
                            errors.phone
                                ? "input-error"
                                : ""
                        }`}
                    >

                        <FaPhone className="icon" />

                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            ref={phone}
                            maxLength={10}
                            onInput={(e) => {

                                e.target.value =
                                    e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                    );

                            }}
                            onChange={() =>
                                clearError("phone")
                            }
                            required
                        />

                    </div>


                    {errors.phone && (

                        <p className="validation-error">
                            {errors.phone}
                        </p>

                    )}


                    {/* ================= PASSWORD + CONFIRM ================= */}

                    <div className="row">


                        {/* PASSWORD */}

                        <div>

                            <label>Password</label>

                            <div
                                className={`input-box ${
                                    errors.password
                                        ? "input-error"
                                        : ""
                                }`}
                            >

                                <FaLock className="icon" />

                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    ref={password}
                                    minLength={8}
                                    onChange={() =>
                                        clearError("password")
                                    }
                                    required
                                />

                            </div>


                            {errors.password && (

                                <p className="validation-error">
                                    {errors.password}
                                </p>

                            )}

                        </div>


                        {/* CONFIRM PASSWORD */}

                        <div>

                            <label>Confirm Password</label>

                            <div
                                className={`input-box ${
                                    errors.cpassword
                                        ? "input-error"
                                        : ""
                                }`}
                            >

                                <FaLock className="icon" />

                                <input
                                    type="password"
                                    placeholder="Confirm your password"
                                    ref={cpassword}
                                    minLength={8}
                                    onChange={() =>
                                        clearError("cpassword")
                                    }
                                    required
                                />

                            </div>


                            {errors.cpassword && (

                                <p className="validation-error">
                                    {errors.cpassword}
                                </p>

                            )}

                        </div>

                    </div>


                    {/* ================= TERMS ================= */}

                    <div className="terms">

                        <input
                            type="checkbox"
                            ref={terms}
                            onChange={() =>
                                clearError("terms")
                            }
                        />

                        <span>

                            I agree to the

                            <a href="#">
                                Terms & Conditions
                            </a>

                            and

                            <a href="#">
                                Privacy Policy
                            </a>

                        </span>

                    </div>


                    {errors.terms && (

                        <p className="validation-error">
                            {errors.terms}
                        </p>

                    )}


                    {/* ================= SERVER ERROR ================= */}

                    {errors.register && (

                        <p className="register-error">
                            {errors.register}
                        </p>

                    )}


                    {/* ================= REGISTER BUTTON ================= */}

                    <button
                        type="submit"
                        className="register-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Account..."
                            : "Register"
                        }

                    </button>


                    {/* ================= GOOGLE ================= */}

                    <div className="divider">
                        <span>or</span>
                    </div>


                    <button
                        type="button"
                        className="google-btn"
                    >

                        <FaGoogle />

                        Register with Google

                    </button>


                    {/* ================= LOGIN ================= */}

                    <p className="login-text">

                        Already have an account?

                        <button
                            type="button"
                            className="link-btn"
                            onClick={switchToLogin}
                        >

                            Login

                        </button>

                    </p>


                </form>

            </div>

        </div>,

        document.body

    );

};

export default RegistrationModal;