import { useEffect, useState } from "react";

function Home({ setPage, setSelectedCategory }) {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log("Category error:", error);
      });
  }, []);

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setPage("providers");
  };

  return (
    <div className="home">

      {/* HERO SECTION */}

      <div className="hero">

        <h1>
          Welcome to <span>AppointEase</span>
        </h1>

        <p>
          Book appointments easily by selecting a category,
          choosing a provider and selecting your preferred time.
        </p>

      </div>


      {/* CATEGORY SECTION */}

      <h2 className="category-title">
        Select a Category
      </h2>


      <div className="category-container">

        {categories.map((category) => (

          <div
            className="category-card"
            key={category.id}
            onClick={() => selectCategory(category)}
          >

            <div className="category-icon">

              {category.name === "Healthcare" && "🏥"}

              {category.name === "Education" && "🎓"}

              {category.name === "Beauty & Salon" && "💇"}

              {category.name === "Legal Services" && "⚖️"}

              {category.name === "Banking" && "🏦"}

              {category.name === "Fitness" && "🏋️"}

            </div>


            <h3>
              {category.name}
            </h3>


            <p>
              Select {category.name}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Home;