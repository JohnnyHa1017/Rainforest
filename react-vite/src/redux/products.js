// Action Types
export const LOAD_ALL_PRODUCTS = 'products/LOAD_ALL'
export const LOAD_ONE_PRODUCT = 'products/LOAD_ONE'
export const LIST_NEW_PRODUCT = 'products/LIST_NEW'

// Action Creators
export const loadAllProducts = (data) => ({
  type: LOAD_ALL_PRODUCTS,
  data
});

export const loadOneProduct = (data) => ({
  type: LOAD_ONE_PRODUCT,
  data
});

export const listNewProduct = (data) => ({
  type: LIST_NEW_PRODUCT,
  data
});

// Load All Products Thunk
export const loadAllThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/api/products');

    if (!response.ok) {
      throw new Error('Failed to load products list.');
    }

    const data = await response.json();

    dispatch(loadAllProducts(data.products));
    return data.products;

  } catch (error) {
    return { error: error.message };
  }
}

// Load One Product Thunk
export const loadOneThunk = (productId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${productId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch product.');
    }

    const data = await response.json();

    dispatch(loadOneProduct(data));
    return data;

  } catch (error) {
    return { error: error.message };
  }
}

// List New Product Thunk
export const listNewThunk = (newProduct) => async (dispatch) => {
  try {
    const response = await fetch('/api/products/', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('WHAT IS DATA: LISTNEWTHUNK IN PRODUCT.JS @@@===>', data)

      dispatch(listNewProduct(data));
      return data;

    } else {
      throw new Error('Failed to list new product.');
    }

  } catch (error) {
    return { error: error.message };
  }
}

// Action Reducer
const productReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ALL_PRODUCTS: {
      return { ...state, ...action.data }
    }
    case LOAD_ONE_PRODUCT: {
      return { ...state, ...action.data }
    }
    case LIST_NEW_PRODUCT: {
      return { ...state, ...action.data }
    }
    default:
      return state;
  }
}

export default productReducer;
