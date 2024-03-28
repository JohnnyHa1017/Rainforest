import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { updateReviewThunk } from "../../redux/reviews";
import CreateNewReview from "../ReviewForm/ReviewForm";

const UpdateReview = () => {
  const dispatch = useDispatch();
  const { reviewId, productId } = useParams();

  const review = useSelector((state) => console.log('What is: STATE in UpdateReview.jsx @@@==>', state));
  const buttonName = 'Update a Review';

  let updatingReview;
  if (review && review.Review) {
    updatingReview = review.Review.find((one) => one.id == reviewId)
  }

  useEffect(() => {
    dispatch(updateReviewThunk(productId))
  }, [productId, dispatch])

  if (!review || review.Review) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <h1>Update your Review</h1>
      <div className='update-review-container'>
        <CreateNewReview updatingReview={updatingReview} buttonName={buttonName} />
      </div>
    </>
  )
}

export default UpdateReview;
