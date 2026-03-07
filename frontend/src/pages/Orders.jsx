import { useEffect, useState } from "react";
import API from "../services/apiService";
import "../styles/orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my-orders");

      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const payOrder = async (orderId) => {
    try {
      await API.post(`/payments/${orderId}`);

      alert("Payment Successful 💜");

      fetchOrders();
    } catch (err) {
      console.error(err);

      alert("Payment failed");
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await API.put(`/orders/${orderId}/cancel`);

      alert("Order Cancelled ❌");

      fetchOrders();
    } catch (err) {
      console.error(err);

      alert("Cannot cancel this order");
    }
  };

  const deliverOrder = async (orderId) => {
    try {
      await API.put(`/orders/${orderId}/deliver`);

      alert("Order Delivered 🎉");

      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const renderTracker = (status) => {
    const steps = ["PENDING", "SHIPPED", "DELIVERED"];

    return (
      <div className="tracker">
        {steps.map((step, index) => {
          const active = steps.indexOf(status) >= index;

          return (
            <div key={step} className="tracker-step">
              <div className={`circle ${active ? "active" : ""}`}>
                {active ? "✔" : ""}
              </div>

              <p>{step}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders yet</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span>Order #{order.id}</span>

                <span className="status">{order.status}</span>
              </div>

              <p className="order-date">
                {new Date(order.orderDate).toLocaleString()}
              </p>

              {renderTracker(order.status)}

              <div className="delivery-message">
                {order.status === "PENDING" && (
                  <p>🧾 Order placed. Waiting for payment.</p>
                )}

                {order.status === "SHIPPED" && (
                  <p>🚚 Your order is on the way!</p>
                )}

                {order.status === "DELIVERED" && (
                  <p className="delivered-msg">
                    🎉 Your order has been delivered
                  </p>
                )}

                {order.status === "CANCELLED" && (
                  <p className="cancelled-msg">❌ This order was cancelled</p>
                )}
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <span>{item.product.name}</span>

                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>

              <h3 className="order-total">Total: ₹{order.totalAmount}</h3>

              <div className="order-actions">
                {order.status === "PENDING" && (
                  <button
                    className="pay-btn"
                    onClick={() => payOrder(order.id)}
                  >
                    Pay Now
                  </button>
                )}

                {order.status !== "DELIVERED" &&
                  order.status !== "CANCELLED" && (
                    <button
                      className="cancel-btn"
                      onClick={() => cancelOrder(order.id)}
                    >
                      Cancel
                    </button>
                  )}

                {order.status === "SHIPPED" && (
                  <button
                    className="deliver-btn"
                    onClick={() => deliverOrder(order.id)}
                  >
                    Mark Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
