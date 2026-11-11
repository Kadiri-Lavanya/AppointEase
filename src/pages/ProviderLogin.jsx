import { useState } from "react";

function ProviderLogin({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const login = async () => {

    if (!email || !password) {

      alert("Please enter email and password");

      return;
    }


    try {

      const response = await fetch(
        "http://localhost:8080/api/providers/login",
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


        localStorage.removeItem("user");
        localStorage.removeItem("admin");

        localStorage.setItem(
          "provider",
          JSON.stringify(data)
        );


        alert("Provider login successful!");

        setPage("providerAppointments");

      } else {

        const message = await response.text();

        alert(
          message ||
          "Provider is waiting for Admin approval"
        );
      }

    } catch (error) {

      console.log(error);

      alert("Server error. Please check Spring Boot.");
    }
  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <h2>Provider Login</h2>


        <label>Email</label>

        <input
          type="email"
          placeholder="Enter provider email"
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
          Don't have a provider account?
        </p>


        <button
          className="secondary-button"
          onClick={() => setPage("providerSignup")}
        >
          Create Provider Account
        </button>

      </div>

    </div>
  );
}

export default ProviderLogin;