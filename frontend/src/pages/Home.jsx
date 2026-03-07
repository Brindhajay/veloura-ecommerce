import { useState, useEffect } from "react";
import API from "../services/apiService";
import "../styles/home.css";

import femaleModel from "../assets/hero-female.jpg";
import maleModel from "../assets/hero-male.jpg";

import perfumeCollection from "../assets/perfume-collection.png";
import perfumeCollection2 from "../assets/perfume-collection2.jpg";

import floral from "../assets/floral.jpg";
import woody from "../assets/woody.jpg";
import citrus from "../assets/citrus.jpg";
import fresh from "../assets/fresh.jpg";
import sweet from "../assets/sweet.jpg";
import fruity from "../assets/fruity.jpg";
import aquatic from "../assets/aquatic.jpg";
import oriental from "../assets/oriental.jpg";
import logo from "../assets/veloura-logo.png";
import { useLocation } from "react-router-dom";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const searchTerm = searchParams.get("search") || "";
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products?size=100");

      setProducts(res.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setTimeout(() => {
        document
          .getElementById("category-perfumes")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [searchTerm]);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory
      ? p.category &&
        p.category.name &&
        p.category.name.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const scrollToCategories = () => {
    document
      .getElementById("categories")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    setTimeout(() => {
      document
        .getElementById("category-perfumes")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const addToCart = async (product) => {
    try {
      await API.post("/cart/add", {
        productId: product.id,
        quantity: 1,
      });
      window.dispatchEvent(new Event("cartUpdated"));

      alert("Added to cart 💜");
    } catch (err) {
      console.error(err);

      alert("Please login first");
    }
  };

  const categoryImages = {
    floral,
    woody,
    citrus,
    fresh,
    sweet,
    fruity,
    aquatic,
    oriental,
  };

  return (
    <div className="home-container">
      <div className="perfume-banner">
        <img src={perfumeCollection} alt="collection" />
      </div>

      <div className="hero">
        <img src={femaleModel} className="hero-model" alt="female" />

        <div className="hero-text">
          <img src={logo} alt="Veloura Logo" className="hero-logo" />

          <p>
            Discover luxury fragrances crafted with elegance, passion and
            timeless sophistication.
          </p>

          <button className="hero-btn" onClick={scrollToCategories}>
            Explore Categories
          </button>
        </div>

        <img src={maleModel} className="hero-model" alt="male" />
      </div>

      <h2 className="section-title">Fragrance Categories</h2>

      <div id="categories" className="categories-grid">
        {Object.keys(categoryImages).map((cat) => (
          <div className="category-card" key={cat}>
            <img src={categoryImages[cat]} alt={cat} />

            <p>{cat}</p>

            <button
              className="explore-btn"
              onClick={() => handleCategoryClick(cat)}
            >
              Explore Perfumes
            </button>
          </div>
        ))}
      </div>

      <h2 className="section-title">Our Classic Perfumes</h2>

      <div className="perfume-banner2">
        <img src={perfumeCollection2} alt="collection2" />
      </div>

      {(selectedCategory || searchTerm) && (
        <div id="category-perfumes">
          <h2 className="section-title">
            {selectedCategory?.toUpperCase()} Perfumes
          </h2>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.imageUrl} alt={product.name} />

                <p className="perfume-name">{product.name}</p>

                <button className="add-btn" onClick={() => addToCart(product)}>
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
