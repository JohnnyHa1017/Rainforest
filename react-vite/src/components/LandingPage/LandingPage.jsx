import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllThunk } from "../../redux/products";
import { addToCart } from "../../redux/carts";
import { NavLink } from 'react-router-dom';
import './LandingPage.css'

const AllProducts = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(loadAllThunk());
  }, [dispatch]);

  const [quantities, setQuantities] = useState({});

  // Function to handle incrementing quantity for a specific product
  const handleIncrement = (productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1
    }));
  };

  // Function to handle decrementing quantity for a specific product
  const handleDecrement = (productId) => {
    if (quantities[productId] && quantities[productId] > 1) {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1
      }));
    }
  };

  // Function to handle adding product to cart with specified quantity
  const handleAddToCart = (productId) => {
    const quantity = quantities[productId] || 1;
    dispatch(addToCart(productId, quantity));
  };

  return (
    <div className='products-container'>
      {allProducts && allProducts.length > 0 ? (
        allProducts.map(product => (
          <div className='product-container' key={product.id}>
            <div className="available">Available: {product.quantity_available}</div>
            <h3>{product.name}</h3>
            <NavLink to={`/products/${product.id}`}>
              <img className='product-image' src={product.image} alt={product.name} />
            </NavLink>
            <div className="quantity-container">
              <div className="quantity-inline">
                <button className="quantity-button" onClick={() => handleDecrement(product.id)}>-</button>
                <span className="quantity">
                  {quantities[product.id] || 1}
                </span>
                <button className="quantity-button" onClick={() => handleIncrement(product.id)}>+</button>
              </div>
              <button className="add-to-cart-button" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
            </div>
          </div>
        ))
      ) : (
        <div>No products available</div>
      )}
    </div>
  );
}

export default AllProducts;
