import { useState, useEffect } from "react";
import axios from "axios";
import {
    User,
    Mail,
    Phone,
    Lock,
    Camera,
    Eye,
    EyeOff,
    Home,
    Heart,
    Bell,
    Check,
    Loader2,
} from "lucide-react";

export default function UserProfile() {
    const [activeTab, setActiveTab] = useState("personal");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [passwords, setPasswords] = useState({
        current: "",
        next: "",
        confirm: "",
    });

    // Database se current user ka data lao
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem("userid");
                if (!userId) {
                    setLoading(false);
                    return;
                }
                const res = await axios.get(`http://localhost:3030/profile/${userId}`);
                setProfile({
                    name: res.data.data.name || "",
                    email: res.data.data.email || "",
                    phone: res.data.data.phone || "",
                });
            } catch (err) {
                console.error("Profile fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const initials = (profile.name || "U")
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const handleProfileChange = (field, value) => {
        setProfile((p) => ({ ...p, [field]: value }));
    };

    const handlePasswordChange = (field, value) => {
        setPasswords((p) => ({ ...p, [field]: value }));
    };

    const saveProfile = async () => {
        setSaving(true);
        setSaved(false);
        try {
            const userId = localStorage.getItem("userid");
            await axios.patch(`http://localhost:3030/profile/${userId}`, profile);
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch (err) {
            console.error("Profile save error:", err);
        } finally {
            setSaving(false);
        }
    };

    const savePassword = async () => {
        if (passwords.next !== passwords.confirm) {
            alert("New password and confirm password do not match");
            return;
        }
        setSaving(true);
        setSaved(false);
        try {
            const userId = localStorage.getItem("userid");
            await axios.patch(`http://localhost:3030/profile/${userId}/password`, {
                currentPassword: passwords.current,
                newPassword: passwords.next,
            });
            setPasswords({ current: "", next: "", confirm: "" });
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch (err) {
            console.error("Password update error:", err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-loading">
                    <Loader2 size={28} className="spin" />
                    <span>Loading profile...</span>
                </div>
                <style>{styles}</style>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-shell">
                {/* Header */}
                <div className="profile-header-card">
                    <div className="profile-header-inner">
                        <div className="avatar-wrap">
                            <span className="avatar-big">{initials}</span>
                            <button className="avatar-edit-btn" title="Change photo">
                                <Camera size={14} />
                            </button>
                        </div>
                        <div className="header-text">
                            <h1>{profile.name || "Your Name"}</h1>
                            <p>{profile.email || "your@email.com"}</p>
                        </div>
                    </div>
                </div>

                <div className="profile-body">
                    {/* Sidebar tabs */}
                    <nav className="profile-tabs">
                        <button
                            className={`tab-btn ${activeTab === "personal" ? "active" : ""}`}
                            onClick={() => setActiveTab("personal")}
                        >
                            <User size={17} />
                            <span>Personal Info</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "security" ? "active" : ""}`}
                            onClick={() => setActiveTab("security")}
                        >
                            <Lock size={17} />
                            <span>Security</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "saved" ? "active" : ""}`}
                            onClick={() => setActiveTab("saved")}
                        >
                            <Heart size={17} />
                            <span>Saved Homes</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "notifications" ? "active" : ""}`}
                            onClick={() => setActiveTab("notifications")}
                        >
                            <Bell size={17} />
                            <span>Notifications</span>
                        </button>
                    </nav>

                    {/* Content */}
                    <div className="profile-content-card">
                        {activeTab === "personal" && (
                            <div className="panel">
                                <h2>Personal Information</h2>
                                <p className="panel-sub">Update your name, email and phone number</p>

                                <div className="field">
                                    <label>Full Name</label>
                                    <div className="input-wrap">
                                        <User size={18} />
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={profile.name}
                                            onChange={(e) => handleProfileChange("name", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="field-row">
                                    <div className="field">
                                        <label>Email Address</label>
                                        <div className="input-wrap">
                                            <Mail size={18} />
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                value={profile.email}
                                                onChange={(e) => handleProfileChange("email", e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label>Phone Number</label>
                                        <div className="input-wrap">
                                            <Phone size={18} />
                                            <input
                                                type="tel"
                                                placeholder="Enter your phone number"
                                                value={profile.phone}
                                                onChange={(e) => handleProfileChange("phone", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button className="primary-btn" onClick={saveProfile} disabled={saving}>
                                    {saving ? (
                                        <Loader2 size={16} className="spin" />
                                    ) : saved ? (
                                        <Check size={16} />
                                    ) : null}
                                    {saving ? "Saving..." : saved ? "Saved" : "Save Changes"}
                                </button>
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div className="panel">
                                <h2>Security</h2>
                                <p className="panel-sub">Change your password to keep your account safe</p>

                                <div className="field">
                                    <label>Current Password</label>
                                    <div className="input-wrap">
                                        <Lock size={18} />
                                        <input
                                            type="password"
                                            placeholder="Enter current password"
                                            value={passwords.current}
                                            onChange={(e) => handlePasswordChange("current", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="field-row">
                                    <div className="field">
                                        <label>New Password</label>
                                        <div className="input-wrap">
                                            <Lock size={18} />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Create a new password"
                                                value={passwords.next}
                                                onChange={(e) => handlePasswordChange("next", e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="eye-btn"
                                                onClick={() => setShowPassword((s) => !s)}
                                            >
                                                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label>Confirm New Password</label>
                                        <div className="input-wrap">
                                            <Lock size={18} />
                                            <input
                                                type={showConfirm ? "text" : "password"}
                                                placeholder="Confirm new password"
                                                value={passwords.confirm}
                                                onChange={(e) => handlePasswordChange("confirm", e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="eye-btn"
                                                onClick={() => setShowConfirm((s) => !s)}
                                            >
                                                {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button className="primary-btn" onClick={savePassword} disabled={saving}>
                                    {saving ? (
                                        <Loader2 size={16} className="spin" />
                                    ) : saved ? (
                                        <Check size={16} />
                                    ) : null}
                                    {saving ? "Updating..." : saved ? "Updated" : "Update Password"}
                                </button>
                            </div>
                        )}

                        {activeTab === "saved" && (
                            <div className="panel">
                                <h2>Saved Homes</h2>
                                <p className="panel-sub">Properties you've bookmarked for later</p>
                                <div className="empty-state">
                                    <Home size={32} />
                                    <p>No saved homes yet</p>
                                    <span>Properties you like will show up here</span>
                                </div>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div className="panel">
                                <h2>Notifications</h2>
                                <p className="panel-sub">Choose what you want to be notified about</p>
                                {["New listings matching your search", "Price drops on saved homes", "Messages from agents"].map(
                                    (label, i) => (
                                        <div className="toggle-row" key={i}>
                                            <span>{label}</span>
                                            <label className="switch">
                                                <input type="checkbox" defaultChecked={i !== 2} />
                                                <span className="slider" />
                                            </label>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{styles}</style>
        </div>
    );
}

const styles = `
    .profile-page {
        min-height: 100vh;
        background: #121212;
        font-family: 'Segoe UI', sans-serif;
        padding: 40px 20px;
        display: flex;
        justify-content: center;
    }

    .profile-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        color: #9a9a9a;
        margin: 120px auto;
        font-size: 14px;
    }

    .spin {
        animation: spin 0.9s linear infinite;
        color: #c68c5c;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .profile-shell {
        width: 100%;
        max-width: 1200px;
        padding: 7% 0;
    }

    .profile-header-card {
        background: linear-gradient(135deg, #1c1c1c 0%, #201a16 100%);
        border: 1px solid #3a3a3a;
        border-radius: 14px;
        padding: 32px;
        margin-bottom: 20px;
    }

    .profile-header-inner {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .avatar-wrap {
        position: relative;
        flex-shrink: 0;
    }

    .avatar-big {
        width: 84px;
        height: 84px;
        border-radius: 50%;
        background: #c68c5c;
        color: #1c1c1c;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 28px;
    }

    .avatar-edit-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #c68c5c;
        border: 3px solid #1c1c1c;
        color: #1c1c1c;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    .avatar-edit-btn:hover {
        background: #d9a173;
    }

    .header-text h1 {
        color: #f2f2f2;
        font-size: 24px;
        font-weight: 700;
        margin: 0 0 4px 0;
    }

    .header-text p {
        color: #9a9a9a;
        font-size: 14px;
        margin: 0;
    }

    .profile-body {
        display: grid;
        grid-template-columns: 220px 1fr;
        gap: 20px;
    }

    .profile-tabs {
        display: flex;
        flex-direction: column;
        gap: 6px;
        background: #1c1c1c;
        border: 1px solid #3a3a3a;
        border-radius: 14px;
        padding: 12px;
        height: fit-content;
    }

    .tab-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        background: none;
        border: none;
        color: #b0b0b0;
        font-size: 14px;
        font-weight: 500;
        padding: 11px 12px;
        border-radius: 8px;
        cursor: pointer;
        text-align: left;
        transition: background 0.15s ease, color 0.15s ease;
    }

    .tab-btn:hover {
        background: #262626;
        color: #e0e0e0;
    }

    .tab-btn.active {
        background: #c68c5c;
        color: #1c1c1c;
        font-weight: 600;
    }

    .profile-content-card {
        background: #1c1c1c;
        border: 1px solid #3a3a3a;
        border-radius: 14px;
        padding: 32px;
    }

    .panel h2 {
        color: #f2f2f2;
        font-size: 20px;
        font-weight: 700;
        margin: 0 0 4px 0;
    }

    .panel-sub {
        color: #9a9a9a;
        font-size: 13px;
        margin: 0 0 26px 0;
    }

    .field {
        flex: 1;
        margin-bottom: 20px;
    }

    .field-row {
        display: flex;
        gap: 18px;
    }

    .field label {
        display: block;
        color: #d0d0d0;
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .input-wrap {
        display: flex;
        align-items: center;
        gap: 10px;
        background: #141414;
        border: 1px solid #3a3a3a;
        border-radius: 8px;
        padding: 12px 14px;
        transition: border-color 0.15s ease;
    }

    .input-wrap:focus-within {
        border-color: #c68c5c;
    }

    .input-wrap svg {
        color: #8a8a8a;
        flex-shrink: 0;
    }

    .input-wrap input {
        flex: 1;
        background: none;
        border: none;
        outline: none;
        color: #f2f2f2;
        font-size: 14px;
    }

    .input-wrap input::placeholder {
        color: #6a6a6a;
    }

    .eye-btn {
        background: none;
        border: none;
        color: #8a8a8a;
        cursor: pointer;
        display: flex;
        padding: 0;
    }

    .eye-btn:hover {
        color: #c68c5c;
    }

    .primary-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: linear-gradient(135deg, #c68c5c 0%, #b47b4b 100%);
        color: #1c1c1c;
        border: none;
        border-radius: 8px;
        padding: 13px 26px;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        margin-top: 8px;
        transition: opacity 0.15s ease, transform 0.1s ease;
    }

    .primary-btn:hover {
        opacity: 0.92;
    }

    .primary-btn:active {
        transform: scale(0.98);
    }

    .primary-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 50px 20px;
        color: #6a6a6a;
        text-align: center;
    }

    .empty-state svg {
        color: #c68c5c;
        margin-bottom: 6px;
    }

    .empty-state p {
        color: #d0d0d0;
        font-size: 15px;
        font-weight: 600;
        margin: 0;
    }

    .empty-state span {
        font-size: 13px;
        color: #7a7a7a;
    }

    .toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 0;
        border-bottom: 1px solid #2a2a2a;
        color: #e0e0e0;
        font-size: 14px;
    }

    .toggle-row:last-child {
        border-bottom: none;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 42px;
        height: 24px;
        flex-shrink: 0;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        inset: 0;
        background: #3a3a3a;
        border-radius: 999px;
        transition: 0.2s;
    }

    .slider::before {
        content: "";
        position: absolute;
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background: #f2f2f2;
        border-radius: 50%;
        transition: 0.2s;
    }

    .switch input:checked + .slider {
        background: #c68c5c;
    }

    .switch input:checked + .slider::before {
        transform: translateX(18px);
        background: #1c1c1c;
    }

    @media (max-width: 720px) {
        .profile-body {
            grid-template-columns: 1fr;
        }
        .profile-tabs {
            flex-direction: row;
            overflow-x: auto;
        }
        .field-row {
            flex-direction: column;
            gap: 0;
        }
    }
`;