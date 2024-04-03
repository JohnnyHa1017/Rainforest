import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import "./Navigation.css";

function Navigation() {
  const [showCart, setShowCart] = useState(false);
  const userCart = useSelector((state) => state.cart);

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
          <h2>Your Cart</h2>
          <ul>
            {userCart && userCart.length > 0 && userCart.map((item) => (
              <li key={item.id}>
                {item.productName} - Quantity: {item.quantity}
              </li>
            ))}
            {(!userCart || userCart.length === 0) && <li>Your cart is empty</li>}
          </ul>
        </div>
      </div>
      <button className="toggle-cart" onClick={toggleCart}>
        Cart
      </button>
    </div>
  );
}

export default Navigation;
