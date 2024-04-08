import { useParams, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadReviewsOnOneProductThunk } from "../../redux/reviews";

const ProductReviews = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state?.Review);
  const user = useSelector((state) => state?.session?.user);
  const users = useSelector((state) => state?.products?.Users)

  console.log(state, 'PRODUCT REVIEWS STATE @HERE')

  useEffect(() => {
    dispatch(loadReviewsOnOneProductThunk(productId))
  }, [productId, dispatch])

  function ownReview(user_id) {
    return user && user.id == user_id
  }

  function dateFormatter(date) {
    const newDate = new Date(date)
    const options = { month: 'long', day: 'numeric', year: 'numeric' }
    return newDate.toLocaleDateString(undefined, options)
  }

  function renderStars(starRating) {
    const stars = [1, 2, 3, 4, 5];

    return stars.map((i) => (
      <span key={i} className={i <= starRating ? "star-filled" : "star-empty"}>
        {i <= starRating ? "★" : "☆"}
      </span>
    ));
  }

  return (
    <>
      {reviews ? (
        reviews.slice().reverse().map((review, index) => (
          <div className='review-container' key={index}>
            <div className="name-and-buttons">
              <h3>{users[review.user_id - 1].first_name} {users[review.user_id - 1].last_name.charAt(0)}</h3>
              {ownReview(review.user_id) && (
                <div className="buttons-container">
                  <button className='Product-review-btns'> <NavLink to={`/product/${productId}/${review.id}/update`} className='review-CRUD-btn'>Edit Review</NavLink></button>
                  <button className='Product-review-del-btns'> <NavLink to={`/product/${productId}/${review.id}/delete`} className='review-CRUD-del-btn'>Delete Review</NavLink></button>
                </div>
              )}
            </div>
            <div className="PR-Rating_Date">
              <p>{renderStars(review.star)}</p> <p>{dateFormatter(review.created_at)}</p>
            </div>
            <p className="PR-Review_desc">{review.review}</p>
          </div>
        ))
      ) : (
        <div className='PR-No_review'>Be the first to review</div>
      )}
    </>
  );
}

export default ProductReviews;
