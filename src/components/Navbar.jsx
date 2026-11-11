
function Navbar({ setPage }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const provider = JSON.parse(localStorage.getItem("provider"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  let loginText = "Not Logged In";

  if (user) {
    loginText = "User: " + user.email;
  } 
  else if (provider) {
    loginText = "Provider: " + provider.email;
  } 
  else if (admin) {
    loginText = "Admin: " + admin.email;
  }

  const logout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("provider");
    localStorage.removeItem("admin");

    alert("Logout successful!");

    setPage("home");
  };

  const isLoggedIn = user || provider || admin;

  return (
    <nav className="navbar">

      <h2>AppointEase</h2>

      <div className="nav-buttons">

        <button onClick={() => setPage("home")}>
          Home
        </button>

        <button onClick={() => setPage("userLogin")}>
          User
        </button>

        <button onClick={() => setPage("providerLogin")}>
          Provider
        </button>

        <button onClick={() => setPage("adminLogin")}>
          Admin
        </button>

        <button onClick={() => setPage("appointments")}>
          My Appointments
        </button>

        <span className="login-user">
          {loginText}
        </span>

        {isLoggedIn && (
          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
