
import React, { useState } from "react";

function AdminLogin({ setPage }) {
    const [adminId, setAdminId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:8080/api/admin/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        adminId,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.message || "Invalid Admin ID or password."
                );
                return;
            }

            // Store the authenticated admin's details.
            localStorage.setItem(
                "admin",
                JSON.stringify({
                    id: data.id,
                    adminId: data.adminId,
                    adminName: data.adminName,
                })
            );

            // Open the admin dashboard.
            setPage("adminDashboard");

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
            <form className="admin-auth-card" onSubmit={handleLogin}>
                <h2>Admin Login</h2>
                <p>Login using your registered admin account.</p>

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
                />

                {message && <p className="admin-auth-message">{message}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Logging In..." : "Login"}
                </button>

                <p>
                    Don't have an account?{" "}
                    <span onClick={() => setPage("adminSignup")}>
                        Create Admin Account
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

export default AdminLogin;