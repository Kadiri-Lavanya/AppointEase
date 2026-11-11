import { useState } from "react";

function ProviderSignup({ setPage }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");


  const signup = async () => {

    if (!name || !email || !password || !category) {

      alert("Please fill all fields");

      return;
    }


    try {

      const response = await fetch(
        "http://localhost:8080/api/providers/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            category: category
          })
        }
      );


      if (response.ok) {

        alert(
          "Signup successful! Wait for Admin approval."
        );

        setPage("providerLogin");

      } else {

        alert("Provider signup failed");
      }

    } catch (error) {

      console.log(error);

      alert("Server error");
    }
  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <h2>Provider Signup</h2>


        <label>Name</label>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />


        <label>Email</label>

        <input
          type="email"
          placeholder="Enter email"
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


        <label>Select Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >

          <option value="">
            Select Category
          </option>

          <option value="Healthcare">
            Healthcare
          </option>

          <option value="Education">
            Education
          </option>

          <option value="Beauty & Salon">
            Beauty & Salon
          </option>

          <option value="Legal Services">
            Legal Services
          </option>

          <option value="Banking">
            Banking
          </option>

          <option value="Fitness">
            Fitness
          </option>

        </select>


        <button onClick={signup}>
          Create Provider Account
        </button>


        <button
          className="secondary-button"
          onClick={() => setPage("providerLogin")}
        >
          Already have an account? Login
        </button>

      </div>

    </div>
  );
}

export default ProviderSignup;