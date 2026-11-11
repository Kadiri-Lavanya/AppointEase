
import { useEffect, useState } from "react";

function MyAppointments() {

  const [appointments, setAppointments] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const loadAppointments = async () => {

    if (!user) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8080/api/appointments/user/${user.id}`
      );

      if (response.ok) {

        const data = await response.json();

        setAppointments(data);
      }

    } catch (error) {

      console.log("Appointment error:", error);

    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div className="appointments-page">

      <h2>My Appointments</h2>

      {!user && (
        <p>Please login first.</p>
      )}

      {user && appointments.length === 0 && (
        <p>No appointments found.</p>
      )}

      {appointments.map((appointment) => (

        <div
          className="appointment-card"
          key={appointment.id}
        >

          <h3>
            Appointment #{appointment.id}
          </h3>

          <p>
            Date: {appointment.date}
          </p>

          <p>
            Time: {appointment.time}
          </p>

          <p>
            Status:
            <strong> {appointment.status}</strong>
          </p>

          <p>
            Provider:
            {" "}
            {appointment.provider
              ? appointment.provider.name
              : "Provider"}
          </p>

        </div>

      ))}

    </div>
  );
}

export default MyAppointments;