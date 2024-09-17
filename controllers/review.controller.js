import Reviews from "../models/review.model.js"

// GET ALL REVIEWS
export const getAllReviews = async (req, res) =>{
    try {
        const reviews = await Reviews.find().populate('client');
        if(!reviews){
            res.status(404).json({
                status: 'error',
                message: 'Unable to fetch reviews'
            })
            return
        }
        console.log(reviews)
        const averageRating = calculateAverageRating(reviews)
        res.status(200).json({
            status: 'success',
            message: 'Reviews fetched successfully.',
            numOfReviews: reviews.length,
            averageRating,
            reviews
        })
    } catch (error) {
        console.log(error)
    }
}

// CALCULATE AVERAGE REVIEW

export const calculateAverageRating = async (reviews) => {
    if (!reviews || reviews.length === 0) {
        return 0; 
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    return averageRating;
};


// ADD REVIEW
export const addReview = async (req, res) => {
   
    try {
        const review = await Reviews.create({...req.body, client: req.user.id})
        if(!review){
            res.status(404).json({
                status: 'error',
                message: 'Unable to add review',
            })
            return
        }
        res.status(201).json({
            status: 'success',
            message: 'Review added successfully!',
            review
        })
    } catch (error) {
        console.log(error)
    }
}