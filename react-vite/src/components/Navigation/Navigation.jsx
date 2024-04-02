import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="navigation-container">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <ProfileButton />
        </li>
      </ul>

      {/* Cart sidebar */}
      <div className={`cart-sidebar ${showCart ? "open" : ""}`}>
        <button className="close-cart" onClick={toggleCart}>Close</button>
        <div className="cart-content">
          {/* Cart items */}

        </div>

      </div>

      <button className="toggle-cart" onClick={toggleCart}>
        Cart
      </button>
    </div>
  );
}

export default Navigation;
