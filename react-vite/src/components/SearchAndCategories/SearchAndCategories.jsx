import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shopCategoriesThunk } from "../../redux/products";
import { addToCartThunk } from "../../redux/addtocart";
import { NavLink, useParams } from 'react-router-dom';

// Loading Spinner component
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div>
    </div>
  );
};

const ShopByCategory = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const userCart = useSelector((state) => state.carts?.cart_items);
  const categorizedProducts = useSelector((state) => state.products.categories?.products);
  const [shouldReload, setShouldReload] = useState(false);
  const isLoading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(shopCategoriesThunk(category))
      .then(() => {})
      .catch(() => {});
  }, [dispatch, category]);

  const handleAddToCart = (productId) => {
    const quantity = 1;
    dispatch(addToCartThunk(userCart.id, productId, quantity))
      .then(() => {
        setShouldReload(!shouldReload);
        window.location.href = '/carts';
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
      });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!categorizedProducts) {
    return <p>Loading, one moment please...</p>;
  }

  return (
    <div className="products-container">
      {categorizedProducts.length > 0 ? (
        categorizedProducts.map((product) => (
          <div className="product-container" key={product.id}>
            <div className="available">Available: {product.quantity_available}</div>
            <h3>{product.name}</h3>
            <NavLink to={`/products/${product.id}`}>
              <img className="product-image" src={product.image} alt={product.name} />
            </NavLink>
            <div className="quantity-container">
              <button className="add-to-cart-button" onClick={() => handleAddToCart(product.id)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
};

export default ShopByCategory;
