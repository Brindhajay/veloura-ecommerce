import { useEffect, useState } from "react";
import API from "../services/apiService";
import "../styles/cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");

      setCartItems(res.data.items);
      setLoading(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      await API.delete(`/cart/remove/${productId}`);

      fetchCart();

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);

  const placeOrder = async () => {
    try {
      await API.post("/orders/place");

      alert("Order placed successfully 💜");

      fetchCart();

      window.dispatchEvent(new Event("cartUpdated"));

      window.location.href = "/orders";
    } catch (err) {
      console.error(err);

      alert("Order failed");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {loading && <p className="loading">Loading...</p>}

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.productId} className="cart-item">
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="cart-image"
              />

              <div className="cart-details">
                <h3>{item.productName}</h3>

                <p className="price">₹{item.price}</p>

                <p className="qty">Qty: {item.quantity}</p>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.productId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ₹{totalPrice}</h3>

            <button className="checkout-btn" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
