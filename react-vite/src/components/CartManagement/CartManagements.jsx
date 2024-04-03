import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as CartActions from '../../redux/carts';
import * as ProductActions from '../../redux/products';
import { updateCartThunk } from "../../redux/addtocart";
import './CartManagements.css';

// Loading Spinner component
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

const CartManagement = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const userCart = useSelector((state) => state.carts.cart_items);
  const allProducts = useSelector((state) => state.products.products);
  const [quantities, setQuantities] = useState({});
  const [shouldReload, setShouldReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user's cart items and available products when component mounts
    dispatch(ProductActions.loadAllThunk())
    dispatch(CartActions.getAllUsersCartsThunk())
      .then(() => {
        setIsLoading(false);
        const initialQuantities = {};
        userCart.forEach(item => {
          initialQuantities[item.product_id] = item.quantity_added;
        })
        setQuantities(initialQuantities)
      })
      .catch(() => setIsLoading(false))
  }, [dispatch, shouldReload]);

  // Function to handle incrementing quantity for a specific product
  const handleIncrement = (productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || userCart.find(item => item.product_id === productId)?.quantity_added || 0) + 1
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

  // Function to calculate subtotal for a specific product
  const calculateSubtotal = (productId) => {
    const quantity = quantities[productId] || 1;
    const price = allProducts?.find((product) => product.id == productId)?.price || 0;
    return quantity * price;
  };

  // Function to update quantity and subtotal in the cart
  const handleUpdateCart = () => {
    const updatedCart = userCart.map(item => ({
      cart_id: item.cart_id,
      product_id: item.product_id,
      quantity: quantities[item.product_id] || item.quantity_added
    }));
    dispatch(updateCartThunk(updatedCart));
  };

  // Function to checkout current cart of items
  const handleCheckout = () => {
    console.log(handleCheckout)
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!currentUser || !userCart || !allProducts) {
    return <p>Loading, one moment please...</p>;
  }

  return (
    <div>
      <div>Welcome, {currentUser.first_name}</div>
      <div>
        {userCart?.length > 0 ? (
          <h2>Your Rainforest Cart is Waiting...</h2>
        ) : (
          <div>
            <h2>Your Rainforest Cart is Empty...</h2>
            <h3>
              Check your Saved for Later items below or{' '}
              <NavLink to='/'>Continue Shopping...</NavLink>
            </h3>
          </div>
        )}
        <ul>
          {userCart && userCart.map((item) => (
            <li key={item.product_id}>
              <div className="flex items-center">
                <img src={allProducts?.find((product) => product.id == item.product_id)?.image} alt="Product Image" className="thumbnail" />
                <div>
                  <p>{allProducts?.find((product) => product.id == item.product_id)?.name}</p>
                  <div>
                    <button onClick={() => handleDecrement(item.product_id)}>-</button>
                      <span>{quantities[item.product_id] || item.quantity_added}</span>
                    <button onClick={() => handleIncrement(item.product_id)}>+</button>
                  </div>
                </div>
                  <p>Price: {calculateSubtotal(item.product_id).toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <p>Total: {userCart.reduce((total, item) => total + calculateSubtotal(item.product_id), 0).toFixed(2)}</p>
          <button onClick={handleUpdateCart}>Save for Later</button>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartManagement;
