import { useEffect, useState } from "react";

function ProviderApproval() {

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

      console.log(error);
    }
  };


  useEffect(() => {

    loadProviders();

  }, []);


  const approveProvider = async (id) => {

    try {

      const response = await fetch(
        `http://localhost:8080/api/providers/approve/${id}`,
        {
          method: "PUT"
        }
      );


      if (response.ok) {

        alert("Provider approved!");

        loadProviders();
      }

    } catch (error) {

      console.log(error);
    }
  };


  const rejectProvider = async (id) => {

    try {

      const response = await fetch(
        `http://localhost:8080/api/providers/reject/${id}`,
        {
          method: "PUT"
        }
      );


      if (response.ok) {

        alert("Provider rejected!");

        loadProviders();
      }

    } catch (error) {

      console.log(error);
    }
  };


  return (
    <div className="providers-page">

      <h2>
        Provider Approval
      </h2>


      {providers.length === 0 && (
        <p>No providers found.</p>
      )}


      <div className="provider-container">

        {providers.map((provider) => (

          <div
            className="provider-card"
            key={provider.id}
          >

            <div className="provider-icon">
              👨‍⚕️
            </div>


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

              <>

                <button
                  onClick={() =>
                    approveProvider(provider.id)
                  }
                >
                  Approve
                </button>


                <button
                  onClick={() =>
                    rejectProvider(provider.id)
                  }
                >
                  Reject
                </button>

              </>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default ProviderApproval;