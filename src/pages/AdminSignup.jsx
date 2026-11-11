
import React, { useState } from "react";

function AdminSignup({ setPage }) {
    const [adminName, setAdminName] = useState("");
    const [adminId, setAdminId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage("");

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:8080/api/admin/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        adminName,
                        adminId,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.message || "Admin registration failed."
                );
                return;
            }

            setMessage("Registration successful! Please log in.");

            setAdminName("");
            setAdminId("");
            setPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                setPage("adminLogin");
            }, 1000);

        } catch (error) {
            setMessage(
                "Cannot connect to server. Check your backend."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-auth-page">
            <form className="admin-auth-card" onSubmit={handleSignup}>
                <h2>Admin Registration</h2>
                <p>Create your own AppointEase admin account.</p>

                <input
                    type="text"
                    placeholder="Admin Name"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Admin ID"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                />

                {message && <p className="admin-auth-message">{message}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>

                <p>
                    Already have an account?{" "}
                    <span onClick={() => setPage("adminLogin")}>
                        Login
                    </span>
                </p>

                <p>
                    <span onClick={() => setPage("home")}>
                        Back to Home
                    </span>
                </p>
            </form>
        </div>
    );
}

export default AdminSignup;