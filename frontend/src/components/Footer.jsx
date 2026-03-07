import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>Veloura</h2>
          <p>Luxury fragrances crafted for unforgettable moments.</p>
        </div>

        <div className="footer-about">
          <h4>About Us</h4>
          <p>
            Veloura is a premium perfume brand dedicated to creating elegant
            fragrances that express personality and emotion. Each scent is
            designed to leave a lasting impression and elevate everyday moments
            into something unforgettable.
          </p>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: support@veloura.com</p>
          <p>Phone: +91 9876543210</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Veloura Perfumes • Designed with elegance
      </div>
    </footer>
  );
}

export default Footer;
