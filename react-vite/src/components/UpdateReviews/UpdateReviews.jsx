import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { loadReviewByIdThunk } from "../../redux/reviews";
import CreateNewReview from "../ReviewForm/ReviewForm";
import './UpdateReviews.css'

const UpdateReview = () => {
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const review = useSelector(state => state?.reviews);

  useEffect(() => {
    dispatch(loadReviewByIdThunk(reviewId))
  }, [reviewId, dispatch]);

  const buttonName = 'Update Review';

  if (!review) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Update your Review</h1>
      <div className='update-review-container'>
      <CreateNewReview updatingReview={review} buttonName={buttonName} />
      </div>
    </>
  );
};

export default UpdateReview;
