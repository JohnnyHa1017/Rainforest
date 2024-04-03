import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadOneThunk } from '../../redux/products';
import { getAllUsersThunk } from '../../redux/session';
import { loadReviewsOnOneProductThunk } from '../../redux/reviews';
import { addToCartThunk } from "../../redux/addtocart";
import './ProductDetails.css';

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(state => state.products);
  const allReviews = useSelector(state => state.reviews);
  const allUsers = useSelector(state => state.session.users);
  const userCart = useSelector((state) => state.carts.cart_items);

  useEffect(() => {
    dispatch(loadOneThunk(productId));
    dispatch(loadReviewsOnOneProductThunk(productId));
    dispatch(getAllUsersThunk());
  }, [dispatch, productId]);

  const handleAddToCart = (productId) => {
    const quantity = 1;
    dispatch(addToCartThunk(userCart.id, productId, quantity));
  };

  return (
    <div className="product-details-container">
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <img className='product-detail-image' src={product.image} alt={product.name} />
          <p className="product-detail-price">Price: ${product.price}</p>
          <p>Available: {product.quantity_available}</p>
          <p>Category: {product.category}</p>
          <p className="product-detail-description">{product.body}</p>
          <div className="product-detail-quantity-container">
          <button className="add-to-cart-button" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
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
