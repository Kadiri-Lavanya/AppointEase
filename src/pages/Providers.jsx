import { useEffect, useState } from "react";

function Providers({ categoryId, setPage, setSelectedProvider }) {

  const [providers, setProviders] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {

    if (!categoryId) {
      return;
    }

    fetch(`http://localhost:8080/api/providers/category/${categoryId}`)
      .then(response => response.json())
      .then(data => {
        setProviders(data);
      })
      .catch(error => {
        console.log("Provider error:", error);
      });

    fetch("http://localhost:8080/api/categories")
      .then(response => response.json())
      .then(data => {

        const category = data.find(
          item => item.id === Number(categoryId)
        );

        if (category) {
          setCategoryName(category.name);
        }

      });

  }, [categoryId]);

  const bookAppointment = (providerId) => {
    setSelectedProvider(providerId);
    setPage("book");
  };

  return (
    <div className="providers-page">

      <h2>{categoryName} Providers</h2>

      {providers.length === 0 ? (

        <p className="no-provider">
          No providers available for this category.
        </p>

      ) : (

        <div className="provider-container">

          {providers.map((provider) => (

            <div className="provider-card" key={provider.id}>

              <div className="provider-icon">
                👨‍💼
              </div>

              <h3>{provider.name}</h3>

              <p>{provider.email}</p>

              <button
                onClick={() => bookAppointment(provider.id)}
              >
                Book Appointment
              </button>

            </div>

          ))}

        </div>

      )}

      <button
        className="back-button"
        onClick={() => setPage("home")}
      >
        ← Back to Categories
      </button>

    </div>
  );
}

export default Providers;