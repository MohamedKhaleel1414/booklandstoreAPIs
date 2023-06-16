const express = require('express');
const reviewServices = require('../services/reviewService')
const router = express.Router()

router.get('/getcomments',reviewServices.showComments)
router.get('/getreplies',reviewServices.showReplies)
router.post('/addcomment',reviewServices.addComment)
router.post('/addreply',reviewServices.addReply)
router.patch('/updatecomment',reviewServices.updateComment)
router.patch('/updatereply',reviewServices.updateReply)
router.delete('/deletecomment',reviewServices.deleteComment)
router.delete('/deletereply',reviewServices.deleteReply)

// const {
//   createReviewValidator,
//   updateReviewValidator,
//   getReviewValidator,
//   deleteReviewValidator,
// } = require('../utils/validators/reviewValidator');

// const {
//   getReview,
//   getReviews,
//   createReview,
//   updateReview,
//   deleteReview,
//   createFilterObj,
//   setProductIdAndUserIdToBody,
// } = require('../services/reviewService');

// const authService = require('../services/authService');

// const router = express.Router({ mergeParams: true });

// router
//   .route('/')
//   .get(createFilterObj, getReviews)
//   .post(
//     authService.protect,
//     authService.allowedTo('user'),
//     setProductIdAndUserIdToBody,
//     createReviewValidator,
//     createReview
//   );
// router
//   .route('/:id')
//   .get(getReviewValidator, getReview)
//   .put(
//     authService.protect,
//     authService.allowedTo('user'),
//     updateReviewValidator,
//     updateReview
//   )
//   .delete(
//     authService.protect,
//     authService.allowedTo('user', 'manager', 'admin'),
//     deleteReviewValidator,
//     deleteReview
//   );

module.exports = router;
