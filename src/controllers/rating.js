const httpStatusCode = require('http-status-codes');
const Rating         = require('../models/rating');   
 
exports.addRating = async(req, res) => {
    const rating = new Rating({
        userId: req.body.userId,
        storeId: req.body.storeId,
        rating: req.body.rating,
        feedback: req.body.feedback,
        dateRate: req.body.dateRate
    });
    Rating.add(rating, (err, user) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(user);
        }
    });
};

 



 