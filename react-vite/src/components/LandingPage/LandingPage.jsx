import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllThunk } from "../../redux/products";
import { NavLink } from 'react-router-dom';
import './LandingPage.css'

const AllProducts = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.products);

  const allProducts = Object.values(state);

  useEffect(() => {
    dispatch(loadAllThunk());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
      // TODO: Need to Implement Add To Cart Dispatch Logic
    console.log(`Product added to cart: ${productId}`);
  };

  return (
    <div className='products-container'>
      {allProducts && allProducts.map(product => (
        <div className='product-container' key={product.id}>
          <div className="available">Available: {product.quantity_available}</div>
        <h3>{product.name}</h3>
        <NavLink to={`/products/${product.id}`}>
          <img className='product-image' src={product.image} alt={product.name}/>
        </NavLink>
        <button className="add-to-cart-button" onClick={() => handleAddToCart(product.id)}>Add to Cart</button></div>
      ))}
    </div>
  );
};

export default AllProducts;
