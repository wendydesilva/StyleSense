import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import "./Navbar.css";
import { useShop } from "./context/ShopContext";

function Navbar() {
  const navigate = useNavigate();
  const { wishlist, cartCount } = useShop();

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>StyleSense</h2>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/matcher">Outfit Matcher</Link></li>
        <li><Link to="/quiz">Style Quiz</Link></li>
        <li><Link to="/recommendations">Recommendations</Link></li>
      </ul>

      <div className="icons">
        <span className="icon-wrapper">
          <FaHeart />
          {wishlist.size > 0 && (
            <span className="icon-badge badge-wishlist">{wishlist.size}</span>
          )}
        </span>

        <span
          className="icon-wrapper"
          onClick={() => navigate("/checkout")}
          style={{ cursor: "pointer" }}
        >
          <FaShoppingCart />
          {cartCount > 0 && (
            <span className="icon-badge badge-cart">{cartCount}</span>
          )}
        </span>

        <FaUser className="user-icon" onClick={() => navigate("/login")} />
      </div>
    </nav>
  );
}

export default Navbar;