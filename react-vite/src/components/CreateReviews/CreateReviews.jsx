import CreateNewReview from "../ReviewForm/ReviewForm";

const CreateReview = () => {
    const buttonName = 'Create Review'

    const review = {
        body: '',
        rating:'',
        image: '',
        verified_purchase: ''
    }

    return (
        <>
            <h1>Creating a Review</h1>
            <div>
            <CreateNewReview updatingReview={review} buttonName={buttonName}/>
            </div>
        </>
    )
}

export default CreateReview;
