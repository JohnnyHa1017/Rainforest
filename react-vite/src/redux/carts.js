// Action Types
export const GET_ALL_USERS_CARTS = 'carts/GET_ALL_USERS_CARTS'
export const CREATE_NEW_CART = 'carts/CREATE_NEW_CART'
export const ADD_TO_CART = 'carts/ADD_TO_CART'

// Action Creators
export const getAllUsersCarts = (payload) => ({
  type: GET_ALL_USERS_CARTS,
  payload
});

export const createNewCart = (payload) => ({
  type: CREATE_NEW_CART,
  payload
});

export const addToCart = (payload) => ({
  type: ADD_TO_CART,
  payload
});

// Get All Carts of Current User
export const getAllUsersCartsThunk = () => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/carts`);

    if (!response.ok) {
      throw new Error('Failed to fetch the cart history for the current user.');
    }

    const data = await response.json();
    dispatch(getAllUsersCarts(data));
  } catch (error) {
    console.error('Error fetching carts:', error);
  }
};


// Creating a New Cart Instance
export const createNewCartThunk = () => async (dispatch) => {
  const response = await fetch(`/api/`, {
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
export const addToCartThunk = (product_id, quantity_added, image) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/carts/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id,
        quantity_added,
        image
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


// Cart Reducer
const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_USERS_CARTS:
      return action.payload;
    case CREATE_NEW_CART:
      return action.payload;
    case ADD_TO_CART:
      return { ...state, ...action.payload }
    default:
      return state;
  }
};

export default cartReducer;

