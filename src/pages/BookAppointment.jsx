
import { useState } from "react";

function BookAppointment({ selectedProvider }) {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const bookAppointment = async () => {

    if (!selectedProvider) {
      alert("Please select a provider");
      return;
    }

    if (!date) {
      alert("Please select date");
      return;
    }

    if (!time) {
      alert("Please select time");
      return;
    }

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please login first");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:8080/api/appointments",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            date: date,
            time: time,

            status: "PENDING",

            user: {
              id: user.id
            },

            provider: {
              id: Number(selectedProvider)
            }
          })
        }
      );

      if (response.ok) {

        const data = await response.json();

        alert(
          "Appointment booked successfully!\nStatus: " +
          data.status
        );

        setDate("");
        setTime("");

      } else {

        alert("Appointment booking failed");
      }

    } catch (error) {

      console.log("Booking error:", error);

      alert("Server error. Please check Spring Boot.");
    }
  };

  return (
    <div className="booking-page">

      <h2>Book Appointment</h2>

      <div className="booking-form">

        <label>Select Date</label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Select Time</label>

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <label>Confirm Appointment</label>

        <button onClick={bookAppointment}>
          Confirm Appointment
        </button>

      </div>

    </div>
  );
}

export default BookAppointment;