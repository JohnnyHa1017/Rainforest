// Action Types
export const ADDING_TO_CART = 'carts/ADDING_TO_CART'
export const UPDATING_CART = 'carts/UPDATING_CART'


// Action Creators
export const addingToCart = (data) => ({
  type: ADDING_TO_CART,
  data
});

export const updatingCart = (data) => ({
  type: UPDATING_CART,
  data
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
export const updateCartThunk = (cart_id, product_id, quantity_added) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/cart/${product_id}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cart_id, product_id, quantity_added })
    });

    if (!response.ok) {
      throw new Error('Failed to update cart.');
    }
    const data = await response.json()
    dispatch(updatingCart(data));
  } catch (error) {
    throw new Error('Failed to update cart.');
  }
};


// AddToCart Reducer
const addToCartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDING_TO_CART:
      return { ...state, ...action.data }
    case UPDATING_CART:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export default addToCartReducer;
