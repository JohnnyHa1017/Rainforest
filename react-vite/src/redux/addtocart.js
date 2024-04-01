// Action Types
export const ADDING_TO_CART = 'carts/ADDING_TO_CART'
export const UPDATING_CART = 'carts/UPDATING_CART'

// Action Creators
export const addingToCart = () => ({
  type: ADDING_TO_CART,
});

export const updatingCart = () => ({
  type: UPDATING_CART,
});

// Adding Products to Users Cart Thunk
export const addToCartThunk = (cart_id, product_id, quantity) => async (dispatch) => {
  dispatch(addingToCart());

  try {
    const response = await fetch('/api/cart/add_product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cart_id, product_id, quantity })
    });

    if (!response.ok) {
      throw new Error('Failed to add product to cart.');
    }

    dispatch(addingToCartSuccess());
  } catch (error) {
    dispatch(addingToCartFailure(error.message));
  }
};

// Updating Quantity and Subtotal Thunk
export const updateCartThunk = (cart_id, product_id, quantity_added, subtotal) => async (dispatch) => {
  dispatch(updatingCart());

  try {
    const response = await fetch('/api/cart/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cart_id, product_id, quantity_added, subtotal })
    });

    if (!response.ok) {
      throw new Error('Failed to update cart.');
    }

    dispatch(updateCartSuccess());
  } catch (error) {
    dispatch(updateCartFailure(error.message));
  }
};


// AddToCart Reducer
const initialState = {
  loading: false,
  error: null,
};

const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDING_TO_CART:
    case UPDATING_CART:
      return { ...state, loading: true, error: null };
    case ADDING_TO_CART_SUCCESS:
    case UPDATING_CART_SUCCESS:
      return { ...state, loading: false };
    case ADDING_TO_CART_FAILURE:
    case UPDATING_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default addToCartReducer;
