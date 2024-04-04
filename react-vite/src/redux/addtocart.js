// Action Types
export const ADDING_TO_CART = 'carts/ADDING_TO_CART'
export const UPDATING_CART = 'carts/UPDATING_CART'
export const REMOVE_FROM_CART = 'carts/REMOVE_FROM_CART'

// Action Creators
export const addingToCart = (data) => ({
  type: ADDING_TO_CART,
  data
});

export const updatingCart = (data) => ({
  type: UPDATING_CART,
  data
});

export const removeFromCart = (item) => ({
  type: REMOVE_FROM_CART,
  item
});

// Adding Products to Users Cart Thunk
export const addToCartThunk = (cart_id, product_id, quantity) => async (dispatch) => {

  try {
    const response = await fetch('/api/products/cart/add_product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cart_id, product_id, quantity })
    });

    if (!response.ok) {
      throw new Error('Failed to add product to cart.');
    }
    const data = await response.json()
    dispatch(addingToCart(data));
  } catch (error) {
    throw new Error('Failed to add product to cart.');
  }
};

// Updating Quantity and Subtotal Thunk
export const updateCartThunk = (cartItems) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/cart/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cart_items: cartItems })
    });

    if (!response.ok) {
      throw new Error('Failed to update cart.');
    }
    const data = await response.json();
    dispatch(updatingCart(cartItems, data));
  } catch (error) {
    throw new Error('Failed to update cart.');
  }
};

// Remove from Cart Thunk
export const removeFromCartThunk = (cartItemId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/cart/remove/${cartItemId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to remove product from your cart');
    }
    const data = await response.json()
    console.log(data)
    dispatch(removeFromCart(data));
  } catch (error) {
    return { error: error.message };
  }
};


// AddToCart Reducer
const addToCartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDING_TO_CART:
      return { ...state, ...action.data }
    case UPDATING_CART:
      return { ...state, ...action.data }
    case REMOVE_FROM_CART:
      {
        const newState = { ...state };
        delete newState[action.item];
        return newState;
      }
    default:
      return state;
  }
};

export default addToCartReducer;
