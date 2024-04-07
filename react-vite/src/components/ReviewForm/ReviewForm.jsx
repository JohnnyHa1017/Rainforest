import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createNewReviewThunk, loadReviewsOnOneProductThunk, updateReviewThunk } from '../../redux/reviews';

const CreateNewReview = ({ buttonName, updatingReview }) => {

  const nav = useNavigate();
  const dispatch = useDispatch();
  const { productId, reviewId } = useParams();
  const user = useSelector((state) => state.session.user);
  const review = useSelector((state) => state.reviews);
  const [body, setBody] = useState('');
  const [rating, setRating] = useState(null);
  const [imageUrl, setImage] = useState(review?.image);
  const [verified_purchase, setVerified] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [validations, setValidations] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    dispatch(loadReviewsOnOneProductThunk(productId))
    if (updatingReview) {
      setBody(updatingReview?.body);
      setRating(updatingReview?.rating);
      setImage(updatingReview?.imageUrl);
      setVerified(updatingReview?.verified_purchase);
    }
  }, [updatingReview, dispatch, productId]);

  useEffect(() => {
    if(!user) nav('/')
  }, [user, submitted])

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', imageUrl)
    formData.append('rating', rating)
    formData.append('body', body)
    formData.append('verified_purchase', verified_purchase)

    setImageLoading(true);
    setSubmitted(true);

    if (body.length <= 10 || rating < 1) {
      setValidations({ ...validations });
      return;
    }

    if(!reviewId){
        await dispatch(createNewReviewThunk(productId, formData))
    }
    else{
        await dispatch(updateReviewThunk(reviewId, formData))
    }
    window.location.href = `/products/${productId ? productId : review?.product_id}`;
}

return (
  <>
  <form onSubmit={handleSubmit} encType='multipart/form-data' className='create-update-review-form'>
      {submitted && validations && validations.message &&
        <p>
          {validations.message}
        </p>
      }
      <div className='star-rating-field'>
        {[1, 2, 3, 4, 5].map((star, i) => {
          const starRating = i + 1;
          return (
            <label key={i}>
              <span
                className='star-rating'
                onClick={() => setRating(starRating)}
                onMouseEnter={() => setHover(starRating)}
                onMouseLeave={() => setHover(starRating)}
              >
                {starRating <= (hover || star) ? '★' : '☆'}
              </span>
            </label>
          );
        })}
      </div>
      <textarea
        className='body-textarea'
        type='text'
        name='body'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder='Leave a review message here...'
        rows={7}
        cols={70}
      />
      {(submitted && body.length <= 10) && (
        <p style={{ color: 'red' }}>Your review must be greater than 10 characters.</p>
      )}
      {(submitted && rating < 1) && (
        <p style={{ color: 'red' }}>Please select a star rating along with your review.</p>
      )}
      <div className='image-file-field'>
        <label htmlFor='image'>
          <input
            type='file'
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            placeholder='Post an image with your review!'
          />
        </label>
        {submitted && validations.image &&
          <p style={{ color: 'red' }}>{validations.image}</p>}
      </div>
      <div className='Review-Btn-container'>
    <button
      type='submit'
      className='Review-Submit-btn'
      onClick={() => window.location.href = `/products/${productId || review?.product_id}`}
        >{buttonName}
    </button>
      {imageLoading && <p>Loading...</p>}
      </div>
    </form>
  </>
  )
}

export default CreateNewReview;
