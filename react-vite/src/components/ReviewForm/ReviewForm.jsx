import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createNewReviewThunk } from '../../redux/reviews';
import { updateReviewThunk } from '../../redux/reviews';

const CreateNewReview = ({ buttonName, updatingReview }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { productId, reviewId } = useParams();
  const user = useSelector((state) => state.session.user);
  const [body, setBody] = useState(updatingReview?.body);
  const [rating, setRating] = useState(updatingReview?.rating ?? null);
  const [image, setImage] = useState(updatingReview?.image ?? null);
  const [verified_purchase, setVerified] = useState(updatingReview?.verified_purchase ?? false);
  const [imageLoading, setImageLoading] = useState(false);
  const [validations, setValidations] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if(!user) nav('/')
  }, [user, submitted])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("image", image);
    setImageLoading(true);
    setSubmitted(true)

    if (body.length <= 10 || rating < 1) {
      setValidations({ ...validations })
      return
    }

    await Promise.resolve(formData);

    const reviewObject = { body, image, rating, verified_purchase }

    if (!reviewId) {
      try {
          await dispatch(createNewReviewThunk(productId, reviewObject))
          nav(`/products/${productId}`)
        } catch (e) {
          setValidations({ ...validations, message: 'Review posting has failed.' })
        }
      } else {
          const updatedReview = await dispatch(updateReviewThunk(reviewObject, reviewId))
          nav(`/products/${productId}`)
    }
  }


}

export default CreateNewReview;
