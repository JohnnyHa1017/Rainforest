import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector, useDispatch } from "react-redux";
import { loadAllThunk } from "../../redux/products";
import CartManagement from "../CartManagement/CartManagements";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const allProducts = useSelector((state) => state?.products?.products)

  useEffect(() => {
    dispatch(loadAllThunk())
  }, [dispatch])

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const categories = allProducts ? [...new Set(allProducts?.map(product => product.category))] : [];

return (
  <nav>
    <div className="navigation-logo-container">
      {/* Logo */}
          <NavLink to="/">
            <img src='https://i.postimg.cc/SxyKQ0Qj/cropped-logo.png' alt='rainforest-logo' className='nav-bar-logo'></img>
          </NavLink>
        </div>

      {/* Categories */}
      <div className="category-section">
        <ul>
          {categories.map(category => (
            <li key={category}>
              <NavLink to={`/products/categories/${category}`}>{category}</NavLink>
            </li>
          ))}
          {/* Recommended for You */}
          <li>
            <a href="https://i.postimg.cc/v81NSXnK/rainforest-videos-render.gif" target="_blank" rel="noreferrer" onClick="window.open(this.href, 'popup', 'width=600,height=600'); return false;">Recommended for You</a>
          </li>
        </ul>
    </div>

      {/* Additional Links */}
      <div className="additional-links">
        {/* Profile button */}
        <div className="profile-button">
          <ProfileButton />
        </div>
        {/* Cart button */}
        <div className="cart-button">
          <button className="toggle-cart" onClick={toggleCart}>
            Cart
          </button>
        </div>
      </div>

      {/* Cart sidebar */}
      <div className={`cart-sidebar ${showCart ? "open" : ""}`}>
        <button className="close-cart" onClick={toggleCart}>Close</button>
        <button className="view-cart" onClick={() => window.location.href = '/carts'}>View Cart</button>
        <div className="cart-content">
          {/* Cart items */}
          <CartManagement />
        </div>
      </div>

  </nav>
  );
}

export default Navigation;
