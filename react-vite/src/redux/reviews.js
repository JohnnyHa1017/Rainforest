// Action Types
export const LOAD_ALL_REVIEWS = 'reviews/LOAD_ALL'
export const CREATE_NEW_REVIEW = 'reviews/CREATE_NEW'
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW'
export const ALL_REVIEWS_FOR_ONE = 'reviews/ALL_REVIEWS_FOR_ONE'
export const LOAD_ONE_FOR_UPDATE = 'reviews/LOAD_ONE_FOR_UPDATE'

// Action Creators
export const loadAllReviews = (data) => ({
  type: LOAD_ALL_REVIEWS,
  data
});

export const createNewReview = (data) => ({
  type: CREATE_NEW_REVIEW,
  data
});

export const updateReview = (data) => ({
  type: UPDATE_REVIEW,
  data
});

export const deleteReview = (data) => ({
  type: DELETE_REVIEW,
  data
});

export const allReviewsForOne = (data) => ({
  type: ALL_REVIEWS_FOR_ONE,
  data
});

export const loadReviewByIdSuccess = (data) => ({
  type: LOAD_ONE_FOR_UPDATE,
  data
});

// Load a Single Review by ID
export const loadReviewByIdThunk = (reviewId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/reviews/${reviewId}`);

    if (!response.ok) {
      throw new Error('Failed to load the review.');
    }

    const review = await response.json();
    dispatch(loadReviewByIdSuccess(review));
    return review;

  } catch (error) {
    return { error: error.message };
  }
};


// Load All Reviews Thunk
export const loadAllReviewsThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/api/reviews/all');

    if (!response.ok) {
      throw new Error('Failed to load reviews.');
    }

    const data = await response.json();
    dispatch(loadAllReviews(data));
    return data;

  } catch (error) {
    return { error: error.message };
  }
}

// Create New Review Thunk
export const createNewReviewThunk = (productId, newReview) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${productId}/reviews`, {
      method: "POST",
      body: newReview
    });

    if (response.ok) {
      const data = await response.json();

      dispatch(createNewReview(data));
      return data;

    } else {
      throw new Error('Failed to create new review.');
    }

  } catch (error) {
    return { error: error.message };
  }
}

// Update a Review Thunk
export const updateReviewThunk = (reviewId, updatingReview) => async (dispatch) => {
  try {
    const response = await fetch (`/api/reviews/${reviewId}/edit`, {
      method: 'PUT',
      body: updatingReview
  })
  if(!response.ok){
      throw new Error('Failed to update review')
  }
  const data = await response.json()
    dispatch(updateReview(data))
    return data

    } catch (error) {
    return { error: error.message };
  }
}

// Delete a Review Thunk
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE"
    });

    if (response.ok) {
      dispatch(deleteReview(reviewId));
      return { success: true };

    } else {
      throw new Error('Failed to delete review.');
    }

  } catch (error) {
    return { error: error.message };
  }
}

// Load all Reviews on One Product Thunk
export const loadReviewsOnOneProductThunk = (productId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${productId}/reviews/all`);

    if (!response.ok) {
      throw new Error('Failed to load reviews for the product.');
    }

    const data = await response.json();
    dispatch(allReviewsForOne(data.reviews));
    return data.reviews;

  } catch (error) {
    return { error: error.message };
  }
}

// Action Reducer
const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ALL_REVIEWS: {
      return { ...state, ...action.data }
    }
    case LOAD_ONE_FOR_UPDATE: {
      return { ...state, ...action.data }
    }
    case CREATE_NEW_REVIEW: {
      return { ...state, ...action.data }
    }
    case UPDATE_REVIEW: {
      return { ...state, ...action.data }
    }
    case DELETE_REVIEW: {
      const newState = { ...state }
      delete newState[action.data]
      return newState
    }
    case ALL_REVIEWS_FOR_ONE: {
      return { ...state, ...action.data }
    }
    default:
      return state;
  }
}

export default reviewReducer;
