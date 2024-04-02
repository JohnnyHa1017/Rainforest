import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import * as CartActions from '../../redux/carts'
import * as AddToCartActions from '../../redux/addtocart'
import * as ProductActions from '../../redux/products'

const CartManagement = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const allProducts = useSelector((state) => state.products);
  const userCart = useSelector((state) => state.cart);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Fetch user's cart items and available products when component mounts
    dispatch(CartActions.getAllUsersCarts());
    dispatch(ProductActions.loadAllProducts());
  }, [dispatch]);

  // Function to handle incrementing quantity for a specific product
  const handleIncrement = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  // Function to handle decrementing quantity for a specific product
  const handleDecrement = (productId) => {
    if (quantities[productId] && quantities[productId] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
    }
  };

  // Function to handle adding product to cart with specified quantity
  const handleAddToCart = (productId) => {
    const quantity = quantities[productId] || 1;
    dispatch(AddToCartActions.addingToCart(productId, quantity));
  };

  return (
    <div>
      {/* Display the current user's information */}
      <div>Welcome, {currentUser.username}</div>

      {/* Render available products */}
      <div>
        {allProducts.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} />
            <p>Price: ${product.price}</p>
            <button onClick={() => handleAddToCart(product.id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Display user's cart */}
      <div>
        <h2>Your Cart</h2>
        <ul>
          {userCart.map((item) => (
            <li key={item.id}>
              {item.productName} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>

      {/* Cart buttons */}
      <div>
        {Object.keys(quantities).map((productId) => (
          <div key={productId}>
            <h3>{allProducts.find((product) => product.id === productId)?.name}</h3>
            <button onClick={() => handleDecrement(productId)}>-</button>
            <span>{quantities[productId]}</span>
            <button onClick={() => handleIncrement(productId)}>+</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartManagement;
