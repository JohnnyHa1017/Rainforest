import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllReviewsThunk } from '../../redux/reviews'

const AllReviews = () => {
  const dispatch = useDispatch()
  const reviews = useSelector((state) => console.log('What is : in AllReviews.jsx CLG FOR reviews @@@==>', state))
  console.log('What is : in AllReviews.jsx CLG FOR reviews @@@==>', reviews)

  useEffect(() => {
    dispatch(loadAllReviewsThunk())
  }, [dispatch])

  return (
      <>
          <h1>Viewing all Reviews</h1>
      </>
  )
}

export default AllReviews
