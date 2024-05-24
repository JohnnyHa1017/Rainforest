import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllThunk } from "../../redux/products";
import { addToCartThunk } from "../../redux/addtocart";
import { NavLink } from 'react-router-dom';
import './LandingPage.css';

const AllProducts = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);
  const userCart = useSelector((state) => state.carts.cart_items);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    dispatch(loadAllThunk())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch, shouldReload]);

  // Function to handle adding product to cart
  const handleAddToCart = (productId) => {
    const quantity = 1;
    dispatch(addToCartThunk(userCart.id, productId, quantity))
      .then(() => setShouldReload(!shouldReload));
      window.location.href = '/carts';
  };

  return (
    <div className='products-container'>
      {/* Display loading bar if isLoading is true */}
      {isLoading && (
        <div className="w-full h-4 bg-gray-200 rounded overflow-hidden mb-4">
          <div id="loading-bar" className="h-full bg-blue-500"></div>
        </div>
      )}
      {/* Render products when loading is complete */}
      {!isLoading && (
        allProducts && allProducts.length > 0 ? (
          allProducts.map(product => (
            <div className='product-container' key={product.id}>
              <div className="available">Available: {product.quantity_available}</div>
              <h3>{product.name}</h3>
              <NavLink to={`/products/${product.id}`}>
                <img className='product-image' src={product.image} alt={product.name} />
              </NavLink>
              <div>
                <h5>Price: ${product.price}</h5>
              {!userCart && (
                <h6>Please Login or Sign Up to begin shopping!</h6>
              )}
              <button className="add-to-cart-button" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <div>No products found</div>
        )
      )}
    </div>
  );
}

export default AllProducts;
