import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";

import ProviderLogin from "./pages/ProviderLogin";
import ProviderSignup from "./pages/ProviderSignup";

import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";

import AdminHome from "./pages/AdminHome";

import Providers from "./pages/Providers";
import BookAppointment from "./pages/BookAppointment";

import MyAppointments from "./pages/MyAppointments";
import ProviderAppointments from "./pages/ProviderAppointments";

import "./App.css";


function App() {

  // Current page
  const [page, setPage] = useState("home");

  // Selected category
  const [selectedCategory, setSelectedCategory] = useState("");

  // Selected provider
  const [selectedProvider, setSelectedProvider] = useState("");


  return (
    <div>

      {/* =========================
          NAVBAR
      ========================= */}

      <Navbar setPage={setPage} />


      {/* =========================
          HOME
      ========================= */}

      {page === "home" && (
        <Home
          setPage={setPage}
          setSelectedCategory={setSelectedCategory}
        />
      )}


      {/* =========================
          USER LOGIN
      ========================= */}

      {page === "userLogin" && (
        <UserLogin
          setPage={setPage}
        />
      )}


      {/* =========================
          USER SIGNUP
      ========================= */}

      {page === "userSignup" && (
        <UserSignup
          setPage={setPage}
        />
      )}


      {/* =========================
          PROVIDER LOGIN
      ========================= */}

      {page === "providerLogin" && (
        <ProviderLogin
          setPage={setPage}
        />
      )}


      {/* =========================
          PROVIDER SIGNUP
      ========================= */}

      {page === "providerSignup" && (
        <ProviderSignup
          setPage={setPage}
        />
      )}


      {/* =========================
          ADMIN LOGIN
      ========================= */}

      {page === "adminLogin" && (
        <AdminLogin
          setPage={setPage}
        />
      )}


      {/* =========================
          ADMIN SIGNUP
      ========================= */}

      {page === "adminSignup" && (
        <AdminSignup
          setPage={setPage}
        />
      )}


      {/* =========================
          ADMIN HOME
          PROVIDER APPROVAL
      ========================= */}

      {page === "adminHome" && (
        <AdminHome />
      )}


      {/* =========================
          PROVIDERS
      ========================= */}

      {page === "providers" && (
        <Providers
          categoryId={selectedCategory}
          setPage={setPage}
          setSelectedProvider={setSelectedProvider}
        />
      )}


      {/* =========================
          BOOK APPOINTMENT
      ========================= */}

      {page === "book" && (
        <BookAppointment
          selectedCategory={selectedCategory}
          selectedProvider={selectedProvider}
        />
      )}


      {/* =========================
          USER APPOINTMENTS
      ========================= */}

      {page === "appointments" && (
        <MyAppointments />
      )}


      {/* =========================
          PROVIDER APPOINTMENTS
      ========================= */}

      {page === "providerAppointments" && (
        <ProviderAppointments />
      )}

    </div>
  );
}


export default App;