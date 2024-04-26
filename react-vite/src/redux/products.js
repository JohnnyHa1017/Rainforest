// Action Types
export const LOAD_ALL_PRODUCTS = 'products/LOAD_ALL'
export const LOAD_ONE_PRODUCT = 'products/LOAD_ONE'
export const LIST_NEW_PRODUCT = 'products/LIST_NEW'
export const EDIT_A_PRODUCT = 'products/EDIT'
export const DELETE_A_PRODUCT = 'products/DELETE'
export const SHOP_BY_CATEGORY = 'products/SHOP_BY_CATEGORY'

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

export const editAProduct = (data) => ({
  type: EDIT_A_PRODUCT,
  data
});

export const deleteAProduct = (data) => ({
  type: DELETE_A_PRODUCT,
  data
});

export const shopByCategory = (data) => ({
  type: SHOP_BY_CATEGORY,
  data
});

// Load All Products Thunk
export const loadAllThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/api/products', {
			method: "GET",
		});

    if (!response.ok) {
      throw new Error('Failed to load products list.');
    }

    const data = await response.json();

    dispatch(loadAllProducts(data))
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

      dispatch(listNewProduct(data));
    } else {
      throw new Error('Failed to list new product.');
    }

  } catch (error) {
    return { error: error.message };
  }
}

// Edit a Product Thunk
export const editAProductThunk = (productId, productToEdit) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${productId}/edit`, {
      methods: 'PUT',
      body: productToEdit
    });

    if (!response.ok) {
      throw new Error('Failed to update product')
    }
    dispatch(editAProduct(productToEdit))
  } catch (error) {
    return { error: error.message };
  }
}

// Delete a Product Thunk
export const deleteAProductThunk = (productId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE"
    });

    if (response.ok) {
      dispatch(deleteAProduct(productId));
      return { success: true };

    } else {
      throw new Error('Failed to delete product.');
    }

  } catch (error) {
    return { error: error.message };
  }
}

// Shop by Category Thunk
export const shopCategoriesThunk = (category) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/categories/${category}`, {
			method: "GET",
		});

    if (!response.ok) {
      throw new Error('Failed to load products list.');
    }

    const data = await response.json();
    dispatch(shopByCategory(data))

  } catch (error) {
    return { error: error.message };
  }
}

// Action Reducer
const productReducer = (state = { }, action) => {
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
    case EDIT_A_PRODUCT: {
      return action.data
    }
    case DELETE_A_PRODUCT: {
      const newState = { ...state }
      delete newState[action.data]
      return newState
    }
    case SHOP_BY_CATEGORY: {
      return { ...state, categories: action.data }
    }
    default:
      return state;
  }
}

export default productReducer;
