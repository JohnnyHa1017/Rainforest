import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadOneThunk } from '../../redux/products';
import { getAllUsersThunk } from '../../redux/session';
import { loadReviewsOnOneProductThunk } from '../../redux/reviews';

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(state => state.products);
  const allReviews = useSelector(state => state.reviews);
  const allUsers = useSelector(state => state.session.users);

  useEffect(() => {
    dispatch(loadOneThunk(productId));
    dispatch(loadReviewsOnOneProductThunk(productId));
    dispatch(getAllUsersThunk());
  }, [dispatch, productId]);

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <img className='product-detail-image' src={product.image} alt={product.name} />
          <p>Price: {product.price}</p>
          <p>Available: {product.quantity_available}</p>
          <p>Category: {product.category}</p>
          <p>{product.body}</p>
          {Object.values(allReviews).map((review, index) => {
            const user = allUsers ? allUsers.find(user => user.id === review.user_id) : null;
            return (
              <div key={index}>
                <p>Rating: {review.rating}</p>
                <p>Body: {review.body}</p>
                <p>User: {user ? user.first_name : 'Unknown'}</p>
                <p>Verified Purchase: {review.verified_purchase ? 'Yes' : 'No'}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetailsPage;
