import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/apiService";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const fetchCartCount = async () => {
    try {
      const res = await API.get("/cart");

      setCartCount(res.data.items.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCartCount();

    window.addEventListener("cartUpdated", fetchCartCount);

    return () => {
      window.removeEventListener("cartUpdated", fetchCartCount);
    };
  }, []);

  const placeholders = [
    "Discover your signature scent...",
    "Pick your aura...",
    "Find your fragrance mood...",
    "Explore timeless fragrances...",
    "Reveal your scent identity...",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) =>
        prev === placeholders.length - 1 ? 0 : prev + 1,
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Veloura
      </Link>

      <div className="nav-links">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder={placeholders[placeholderIndex]}
          className="nav-search"
          onChange={(e) => navigate(`/?search=${e.target.value}`)}
        />
        <Link to="/">Home</Link>

        <Link to="/orders">Orders</Link>

        <Link to="/cart" className="cart-link">
          🛒
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        <Link to="/login">Login</Link>

        <Link to="/register" className="register-btn">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
