import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadOneThunk } from '../../redux/products';
import { getAllUsersThunk } from '../../redux/session';
import { loadReviewsOnOneProductThunk } from '../../redux/reviews';
import { addToCart } from "../../redux/carts";
import './ProductDetails.css';

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(state => state.products);
  const allReviews = useSelector(state => state.reviews);
  const allUsers = useSelector(state => state.session.users);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(loadOneThunk(productId));
    dispatch(loadReviewsOnOneProductThunk(productId));
    dispatch(getAllUsersThunk());
  }, [dispatch, productId]);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product.id, quantity));
  };

  return (
    <div className="product-details-container">
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <img className='product-detail-image' src={product.image} alt={product.name} />
          <p className="product-price">Price: ${product.price}</p>
          <p>Available: {product.quantity_available}</p>
          <p>Category: {product.category}</p>
          <p className="product-description">{product.body}</p>
          <div className="quantity-container">
            <div className="quantity-inline">
              <button className="quantity-button" onClick={handleDecrement}>-</button>
              <span className="quantity">{quantity}</span>
              <button className="quantity-button" onClick={handleIncrement}>+</button>
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
          </div>
          {Object.values(allReviews).map((review, index) => {
            const user = allUsers ? allUsers.find(user => user.id === review.user_id) : null;
            return (
              <div key={index} className="review-container">
                <p className="review-rating">Rating: {review.rating}</p>
                <p className="review-body">Body: {review.body}</p>
                <p className="review-user">User: {user ? user.first_name : 'Unknown'}</p>
                <p className="review-verified-purchase">Verified Purchase: {review.verified_purchase ? 'Yes' : 'No'}</p>
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
