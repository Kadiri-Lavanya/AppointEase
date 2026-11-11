import { useEffect, useState } from "react";

function AdminHome() {

  const [providers, setProviders] = useState([]);

  const loadProviders = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/api/providers"
      );

      if (response.ok) {

        const data = await response.json();

        setProviders(data);
      }

    } catch (error) {

      console.log("Provider error:", error);
    }
  };


  useEffect(() => {
    loadProviders();
  }, []);


  const approveProvider = async (id) => {

    const response = await fetch(
      `http://localhost:8080/api/providers/approve/${id}`,
      {
        method: "PUT"
      }
    );

    if (response.ok) {

      alert("Provider Approved!");

      loadProviders();
    }
  };


  const rejectProvider = async (id) => {

    const response = await fetch(
      `http://localhost:8080/api/providers/reject/${id}`,
      {
        method: "PUT"
      }
    );

    if (response.ok) {

      alert("Provider Rejected!");

      loadProviders();
    }
  };


  return (
    <div className="admin-dashboard">

      <h1>Admin Panel</h1>

      <p>Manage Provider Approvals</p>


      <h2>Provider Requests</h2>


      {providers.length === 0 && (
        <p>No providers found.</p>
      )}


      <div className="provider-container">

        {providers.map((provider) => (

          <div
            className="provider-card"
            key={provider.id}
          >

            <h3>
              {provider.name}
            </h3>

            <p>
              Email: {provider.email}
            </p>

            <p>
              Category: {provider.category}
            </p>

            <p>
              Status: <strong>
                {provider.status}
              </strong>
            </p>


            {provider.status === "PENDING" && (

              <div>

                <button
                  onClick={() =>
                    approveProvider(provider.id)
                  }
                >
                  APPROVE
                </button>


                <button
                  onClick={() =>
                    rejectProvider(provider.id)
                  }
                >
                  REJECT
                </button>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminHome;