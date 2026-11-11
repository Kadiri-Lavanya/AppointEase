
import { useState } from "react";

function UserLogin({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const login = async () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:8080/api/users/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email.trim(),
            password: password
          })
        }
      );

      if (response.ok) {

        const data = await response.json();

        if (data && data.id) {

          localStorage.setItem(
            "user",
            JSON.stringify(data)
          );

          alert("User login successful!");

          setPage("appointments");

        } else {

          alert("Invalid email or password");
        }

      } else {

        alert("Invalid email or password");
      }

    } catch (error) {

      console.log("Login error:", error);

      alert("Server error. Please check Spring Boot.");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h2>User Login</h2>

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>
          Login
        </button>

        <p className="signup-text">
          Don't have an account?
        </p>

        <button
          className="secondary-button"
          onClick={() => setPage("userSignup")}
        >
          Create User Account
        </button>

      </div>

    </div>
  );
}

export default UserLogin;