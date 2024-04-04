import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector, useDispatch } from "react-redux";
import { loadAllThunk } from "../../redux/products";
import CartManagement from "../CartManagement/CartManagements";
// import { FaSearch } from "react-icons/fa";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const userCart = useSelector((state) => state.cart);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [filteredProducts, setFilteredProducts] = useState([]);
  const allProducts = useSelector((state) => state.products.products)

  useEffect(() => {
    dispatch(loadAllThunk())
  }, [dispatch])

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   // Filter products by category matching the search query
  //   const filteredProducts = allProducts.filter(
  //     (product) =>
  //       product.category.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setFilteredProducts(filteredProducts);
  // };

  const categories = allProducts ? [...new Set(allProducts.map(product => product.category))] : [];

return (
    <div className="navigation-container">
      <ul>
        <li>
          <NavLink to="/">
            <img src='https://i.postimg.cc/SxyKQ0Qj/cropped-logo.png' alt='rainforest-logo' className='nav-bar-logo'></img>
          </NavLink>
        </li>
        <li>
          {/* Shop By Category */}
          <ul>
            {categories.map(category => (
              <li key={category}>
                <NavLink to={`/products/categories/${category}`}>{category}</NavLink>
              </li>
            ))}
            <li>
              <a href="https://i.postimg.cc/v81NSXnK/rainforest-videos-render.gif" target="_blank" rel="noreferrer" onClick="window.open(this.href, 'popup', 'width=600,height=600'); return false;">Recommended for You</a>
            </li>
          </ul>
        </li>
        {/* <li> */}
          {/* Search bar */}
          {/* <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </li> */}
        <li>
          <ProfileButton />
        </li>
      </ul>
      {/* Cart sidebar */}
      <div className={`cart-sidebar ${showCart ? "open" : ""}`}>
        <button className="close-cart" onClick={toggleCart}>Close</button>
        <button className="view-cart" onClick={() => window.location.href = '/carts'}>View Cart</button>
        <div className="cart-content">
          {/* Cart items */}
          <h2>Your Cart</h2>
          <CartManagement />
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
      {/* Render products based on search result */}
      {/* <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            {product.name}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default Navigation;
