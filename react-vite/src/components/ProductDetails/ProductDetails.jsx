import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadOneThunk } from '../../redux/products';
import { getAllUsersThunk } from '../../redux/session';
import { loadReviewsOnOneProductThunk } from '../../redux/reviews';
import { addToCartThunk } from '../../redux/addtocart';
import './ProductDetails.css';

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(state => state.products);
  const allReviews = useSelector(state => state.reviews);
  const allUsers = useSelector(state => state.session.users);
  const userCart = useSelector(state => state.carts.cart_items);
  const currentUser = useSelector(state => state.session.user);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    dispatch(loadOneThunk(productId));
    dispatch(loadReviewsOnOneProductThunk(productId));
    dispatch(getAllUsersThunk());
  }, [dispatch, productId]);

  useEffect(() => {
    if (Object.keys(allReviews).length > 0) {
      const totalRating = Object.values(allReviews)?.reduce((acc, curr) => acc + curr.rating, 0);
      const avgRating = totalRating / Object.keys(allReviews).length;
      setAverageRating(avgRating);
    }
  }, [allReviews]);

  const handleAddToCart = productId => {
    const quantity = 1;
    dispatch(addToCartThunk(userCart.id, productId, quantity));
  };

  const handleAddReview = () => {
    window.location.href = `/products/${productId}/reviews/new`;
  };

  const handleUpdateReview = () => {
    if (userReview) {
      window.location.href = `/reviews/${userReview.id}/edit`;
    }
  };

  const handleDeleteReview = () => {
    window.location.href = `/reviews/${userReview.id}/delete`;
  };

  // Check if user has already reviewed the product
  const userReview = Object.values(allReviews).find(review => review?.user_id == currentUser?.id);

  return (
    <div className="product-details-container">
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <img className="product-detail-image" src={product.image} alt={product.name} />
          <p className="product-detail-price">Price: ${product.price}</p>
          <p>Available: {product.quantity_available}</p>
          <p>Category: {product.category}</p>
          <p className="product-detail-description">{product.body}</p>
          <div className="product-detail-quantity-container">
            <button className="add-to-cart-button" onClick={() => handleAddToCart(product.id)}>
              Add to Cart
            </button>
          </div>
          <div className="average-rating-container">
            {[1, 2, 3, 4, 5].map(star => (
              <span key={star} className={star <= Math.round(averageRating) ? 'star-filled' : 'star-empty'}>
                {star <= Math.round(averageRating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          {userReview ? (
            <>
              <button className='edit-review' onClick={() => handleUpdateReview()}>Edit your Review</button>
              <button className='delete-review' onClick={() => handleDeleteReview()}>Delete your Review</button>
            </>
          ) : (
            <button className='create-review' onClick={() => handleAddReview()}>Add a Review</button>
          )}
          {Object.values(allReviews)?.map((review, index) => {
            const user = allUsers ? allUsers?.find(user => user.id == review?.user_id) : null;
            return (
              <div key={index} className="review-container">
                <p className="review-user">{user ? user.first_name : 'Unknown'} reviewed:</p>
                <p className="review-rating">Rating: {review?.rating}</p>
                <p className="review-body">{review?.body}</p>
                <p className="review-verified-purchase">
                  Verified Purchase: {review?.verified_purchase ? 'Yes' : 'No'}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;
