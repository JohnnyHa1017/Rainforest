import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shopCategoriesThunk } from "../../redux/products";
import { addToCartThunk } from "../../redux/addtocart";
import { NavLink, useParams } from 'react-router-dom';

// Loading Spinner component
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

const ShopByCategory = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const userCart = useSelector((state) => state.carts.cart_items);
  const categorizedProducts = useSelector((state) => state.products.categories?.products);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    dispatch(shopCategoriesThunk(category))
    .then(() => setIsLoading(false))
    .catch(() => setIsLoading(false));
  }, [dispatch, category, shouldReload]);


  const handleAddToCart = (productId) => {
    const quantity = 1;
    dispatch(addToCartThunk(userCart.id, productId, quantity));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!categorizedProducts || !userCart) {
    return <p>Loading, one moment please...</p>;
  }

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
        categorizedProducts && categorizedProducts.length > 0 ? (
          categorizedProducts.map(product => (
            <div className='product-container' key={product.id}>
              <div className="available">Available: {product.quantity_available}</div>
              <h3>{product.name}</h3>
              <NavLink to={`/products/${product.id}`}>
                <img className='product-image' src={product.image} alt={product.name} />
              </NavLink>
              <div className="quantity-container">
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

export default ShopByCategory;
