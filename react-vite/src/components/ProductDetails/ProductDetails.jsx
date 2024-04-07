import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadOneThunk } from '../../redux/products';
import { getAllUsersThunk } from '../../redux/session';
import { loadReviewsOnOneProductThunk } from '../../redux/reviews';
import { addToCartThunk } from '../../redux/addtocart';
import './ProductDetails.css';

// Loading Spinner component
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(state => state?.products);
  const allReviews = useSelector(state => state?.reviews);
  const allUsers = useSelector(state => state?.session?.users);
  const userCart = useSelector(state => state?.carts?.cart_items);
  const currentUser = useSelector(state => state?.session?.user);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(getAllUsersThunk());
    dispatch(loadOneThunk(productId));
    dispatch(loadReviewsOnOneProductThunk(productId))
      .then(() => {
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [dispatch, productId, reload]);


  useEffect(() => {
    if (Object.keys(allReviews)?.length > 0) {
      const totalRating = Object.values(allReviews)?.reduce((acc, curr) => acc + curr.rating, 0);
      const avgRating = totalRating / Object.keys(allReviews)?.length;
      setAverageRating(avgRating);
    }
  }, [allReviews, reload]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleAddToCart = productId => {
    const quantity = 1;
    dispatch(addToCartThunk(userCart.id, productId, quantity));
  };

  const handleAddReview = () => {
    setReload(true);
    window.location.href = `/products/${productId}/reviews/new`;
  };

  const handleUpdateReview = () => {
    if (userReview) {
      setReload(true);
      window.location.href = `/reviews/${userReview.id}/edit`;
    }
  };

  const handleDeleteReview = () => {
    setReload(true);
    window.location.href = `/reviews/${userReview.id}/delete`;
  };

  // Check if user has already reviewed the product
  const userReview = Object.values(allReviews)?.find(review => review?.user_id == currentUser?.id);
  const relatedReviews = Object.values(allReviews)?.filter(review => review?.product_id == productId)


  if (!product || !allReviews || !allUsers) {
    return <h2>Loading...</h2>;
  }

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
          {relatedReviews?.map((review, index) => {
              const user = allUsers ? allUsers.find(user => user.id == review?.user_id) : null;
              return (
                <div key={index} className="review-container">
                  <p className="review-user">{user ? user.first_name : 'Unknown'} reviewed:</p>
                  <p className="review-rating">Rating: {review?.rating}</p>
                  <p className="review-body">{review?.body}</p>
                  {review?.image && <img src={review?.image} alt='Review Image' className='review-image' />}
                  <p className="review-verified-purchase">
                    Verified Purchase: {review?.verified_purchase ? 'Yes' : 'No'}
                  </p>
                  <p className='review-post-date'>{review?.created_at}</p>
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
