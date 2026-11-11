
import { useEffect, useState } from "react";

function ProviderAppointments() {

  const [appointments, setAppointments] = useState([]);

  const provider = JSON.parse(
    localStorage.getItem("provider")
  );

  const loadAppointments = async () => {

    if (!provider) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8080/api/appointments/provider/${provider.id}`
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

  const updateStatus = async (id, status) => {

    try {

      const response = await fetch(
        `http://localhost:8080/api/appointments/${id}/${status}`,
        {
          method: "PUT"
        }
      );

      if (response.ok) {

        alert(
          "Appointment " +
          status.toLowerCase()
        );

        loadAppointments();

      } else {

        alert("Status update failed");

      }

    } catch (error) {

      console.log(error);

      alert("Server error");

    }
  };

  return (
    <div className="appointments-page">

      <h2>Provider Appointments</h2>

      {!provider && (
        <p>Please login as provider.</p>
      )}

      {provider && appointments.length === 0 && (
        <p>No appointments available.</p>
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
            User:{" "}
            {appointment.user
              ? appointment.user.name
              : "User"}
          </p>

          <p>
            Email:{" "}
            {appointment.user
              ? appointment.user.email
              : ""}
          </p>

          <p>
            Date: {appointment.date}
          </p>

          <p>
            Time: {appointment.time}
          </p>

          <p>
            Status: <strong>{appointment.status}</strong>
          </p>

          {appointment.status === "PENDING" && (

            <div>

              <button
                onClick={() =>
                  updateStatus(
                    appointment.id,
                    "ACCEPTED"
                  )
                }
              >
                Accept
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    appointment.id,
                    "REJECTED"
                  )
                }
              >
                Reject
              </button>

            </div>

          )}

        </div>

      ))}

    </div>
  );
}

export default ProviderAppointments;