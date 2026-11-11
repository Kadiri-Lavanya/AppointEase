import { useState } from "react";

function UserSignup({ setPage }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:8080/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        }
      );

      if (response.ok) {

        alert("User signup successful!");

        setPage("userLogin");

      } else {

        alert("Signup failed");

      }

    } catch (error) {

      console.log("Signup error:", error);
      alert("Server error");

    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h2>User Signup</h2>

        <label>Name</label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={signup}>
          Create Account
        </button>

        <p className="signup-text">
          Already have an account?
        </p>

        <button
          className="secondary-button"
          onClick={() => setPage("userLogin")}
        >
          Back to User Login
        </button>

      </div>

    </div>
  );
}

export default UserSignup;