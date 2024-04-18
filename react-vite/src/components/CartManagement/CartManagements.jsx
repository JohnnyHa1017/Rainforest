import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as CartActions from '../../redux/carts';
import * as ProductActions from '../../redux/products';
import { updateCartThunk } from "../../redux/addtocart";
import { useModal } from "../../context/Modal";
import { addToCartThunk, removeFromCartThunk } from '../../redux/addtocart';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import './CartManagements.css';

// Loading Spinner component
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

const CheckoutMessage = ({ message }) => {
  return <h4>{message}</h4>;
};

const CartManagement = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const allProducts = useSelector((state) => state.products.products);
  const userCart = useSelector((state) => state.carts.cart_items);
  const [quantities, setQuantities] = useState({});
  const [shouldReload, setShouldReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { closeModal } = useModal();


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
      [productId]: (prevQuantities[productId] || userCart.find(item => item.product_id == productId)?.quantity_added) + 1
    }));
  };


  // Function to handle decrementing quantity for a specific product
  const handleDecrement = (productId) => {
    if (quantities[productId] > 1) {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1
      }));
    }
  };


  // Function to handle adding product to cart
  const handleAddToCart = (productId) => {
    const quantity = 1;
    dispatch(addToCartThunk(userCart.id, productId, quantity))
      .then(() => setShouldReload(!shouldReload));
  };


  // Function to update quantity and subtotal in the cart
  const handleUpdateCart = () => {
    const updatedCart = userCart.map(item => ({
      cart_id: item.cart_id,
      product_id: item.product_id,
      quantity: quantities[item.product_id] || item.quantity_added
    }));
    dispatch(updateCartThunk(updatedCart))
    .then(() => setShouldReload(!shouldReload));
  };


  // Function to handle deletion of one item from cart
  const handleDeleteItem = async (cartItemId) => {
    await dispatch(removeFromCartThunk(cartItemId))
      .then(() => setShouldReload(!shouldReload));
  };


  // Function to checkout current cart of items
  const handleCheckout = async () => {
    for (let item of userCart) {
      await dispatch(removeFromCartThunk(item.id));
    }
    setTimeout(() => {
      closeModal();
    }, 3000);
    setShouldReload(!shouldReload);
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
            <li key={item.product_id} className="cart-item">
              <NavLink to={`/products/${item.product_id}`}>
                <img src={allProducts?.find((product) => product.id === item.product_id)?.image} alt="Product Image" className="thumbnail" />
              </NavLink>
              <div className="cart-item-details">
                <p className="cart-item-name">{allProducts?.find((product) => product.id == item.product_id)?.name}</p>
                <div className="cart-item-quantity">
                  <button onClick={() => handleDecrement(item.product_id)}>-</button>
                  <span>{quantities[item.product_id] ?? item.quantity_added}</span>
                  <button onClick={() => handleIncrement(item.product_id)}>+</button>
                </div>
                <p className="cart-item-price">Price: {((quantities[item.product_id] || item.quantity_added) * (allProducts?.find((product) => product.id == item.product_id)?.price || 0)).toFixed(2)}</p>
              </div>
              <button onClick={() => handleDeleteItem(item.id)} className="cart-item-delete">Remove from Cart</button>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <p>
            Total: {
              userCart.reduce((total, item) =>
                total + ((quantities[item.product_id] || item.quantity_added) *
                  (allProducts?.find((product) => product.id == item.product_id)?.price || 0)), 0)
                .toFixed(2)}
          </p>
          <div className="cart-action-buttons">
          <button onClick={() => {
              handleUpdateCart();
              window.location.href = '/';
            }}>Save for Later</button>
          {/* Conditionally render checkout button */}
          {userCart.length > 0 && (
            <OpenModalButton
              buttonText="Checkout"
              modalComponent={<CheckoutMessage message={`Thank you ${currentUser.first_name} for shopping with Rainforest, One moment as we finalize your order...`} />}
              onButtonClick={handleCheckout}
            />
          )}
        </div>
      </div>
    </div>
  </div>
);
}

export default CartManagement;
