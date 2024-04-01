// Action Types
export const GET_ALL_USERS_CARTS = 'carts/GET_ALL_USERS_CARTS'
export const CREATE_NEW_CART = 'carts/CREATE_NEW_CART'
export const ADD_TO_CART = 'carts/ADD_TO_CART'
export const REMOVE_FROM_CART = 'carts/REMOVE_FROM_CART'
export const CLEAR_CART = 'carts/CLEAR_CART'

// Action Creators
export const getAllUsersCarts = (data) => ({
  type: GET_ALL_USERS_CARTS,
  data
})

export const createNewCart = (data) => ({
  type: CREATE_NEW_CART,
  data
});

export const addToCart = (product_id, quantity_added) => ({
  type: ADD_TO_CART,
  payload: { product_id, quantity_added }
});

export const removeFromCart = (data) => ({
  type: REMOVE_FROM_CART,
  data
});

export const clearCart = () => ({
  type: CLEAR_CART
});


// Get All Carts of Current User
export const getAllUsersCartsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/carts/current`)

  if (!response.ok) {
    throw new Error('Failed to fetch the cart history on current user.')
  }

  const data = await response.json()
  dispatch(getAllUsersCarts(data))
  return data
}

// Creating a New Cart Instance
export const createNewCartThunk = () => async (dispatch) => {
  const response = await fetch(`/api/carts/new`, {
    method: 'POST'
  })

  if (!response.ok) {
    throw new Error('Failed to create a new instance of "Cart".')
  }

  const data = await response.json()
  dispatch(createNewCart(data))
  return data
}


// Add to Cart Thunk
export const addToCartThunk = (product_id, quantity_added, image_url) => async (dispatch) => {
  try {
    const response = await fetch(`/api/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id,
        quantity_added,
        image_url
      })
    });

    if (!response.ok) {
      throw new Error('Failed to add products to your cart');
    }

    const data = await response.json();
    dispatch(addToCart(data));
  } catch (error) {
    return { error: error.message };
  }
};


// Remove from Cart Thunk
export const removeFromCartThunk = (cartItemId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/cart/remove/${cartItemId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to remove product from your cart');
    }

    dispatch(removeFromCart(cartItemId));
  } catch (error) {
    return { error: error.message };
  }
};


// Cart Reducer
const initialState = {
  items: [],
  totalItems: 0
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_CART:
      return { ...state, ...action.data }
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
        totalItems: state.totalItems + action.payload.quantity_added
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.cartItemId !== action.payload.cartItemId),
        totalItems: state.totalItems - 1
      };
    case CLEAR_CART:
      return {
        ...state,
        items: [],
        totalItems: 0
      };
    default:
      return state;
  }
};

export default cartReducer;
