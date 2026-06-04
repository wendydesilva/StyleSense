import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import './Navbar.css';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>StyleSense</h2>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/shop">Shop</Link>
        </li>

        <li>
          <Link to="/matcher">Outfit Matcher</Link>
        </li>

        <li>
          <Link to="/quiz">Style Quiz</Link>
        </li>

        <li>
          <Link to="/recommendations">Recommendations</Link>
        </li>
      </ul>

     <div className="icons">
        <FaHeart />
        <FaShoppingCart />

        <FaUser
        className="user-icon"
        onClick={() => navigate("/login")}
         />
      </div>
    </nav>
  );
}

export default Navbar;