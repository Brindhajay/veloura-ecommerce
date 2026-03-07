import API from "../services/apiService";
import "../styles/productCard.css";

function ProductCard({ product }) {
  const addToCart = async () => {
    try {
      // ensure correct productId
      const productId = product.id || product.productId;

      if (!productId) {
        console.error("Product ID missing", product);
        alert("Product ID missing");
        return;
      }

      await API.post("/cart/add", {
        productId: productId,
        quantity: 1,
      });

      alert("Added to cart 💜");

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error(err);
      alert("Error adding to cart");
    }
  };

  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />

      <h3 className="product-name">{product.name}</h3>

      <p className="product-price">₹{product.price}</p>

      <button className="add-btn" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
