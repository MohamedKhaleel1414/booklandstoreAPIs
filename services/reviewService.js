const factory = require('./handlersFactory');
const Review = require('../models/reviewModel');

// Show comments of a product: // Send in body(productId,type)
// The type sent in body should be "Reply" or "Comment"
const showComments = async (req,res) => {
  let comments = await Review.find({product:req.body.productId,isCommentOrReply:req.body.type},{}).sort({posting_date:1})
  if(comments){
    res.status(200).send(comments)
  }else{
    res.status(404).send("No comments to show")
  }
}

// Show replies of a comment: // Send in body(commentId,type)
// The type sent in body should be "Reply" or "Comment"
const showReplies = async (req,res) => {
  let comment = await Review.findById(req.body.commentId)
  if(comment){
    let replies = []
    await Promise.all(
      comment.reply.map(async(reply,index)=>{
        Review.findById(reply).then((data)=>{
          replies.push(data)
        }).catch((err)=>{
          console.log(err)
        })
      })
    )
    if(replies.length>0){
      res.status(200).send(replies)
    } else {
      res.status(404).send("No replies here")
    }
  }
}

// Create Comment: // Send in body(user,product,cooment)
const addComment = (req,res) => {
  let newComment = new Review(req.body)
  newComment.save().then((data)=>{
    if(data){
      res.status(200).send("Comment added successfully")
    }
  }).catch((err)=>{
    console.log(err)
    res.status(400).send("An error occured while posting comment")
  })
} 

// Add Reply on a comment: // Send in body(commentId,reply_description,reply_user,reply_product)
// The three reply properties are similar to the comment properties because reply is a comment nested in another comment
const addReply = async (req,res) => {
  let comment = await Review.findById(req.body.commentId)
  if(comment){
    let reply = {
      cooment:reply_description,
      user:reply_user,
      product:reply_product,
    }
    comment.reply.push(reply)
    comment.save()
    res.status(200).send("Reply added successfully")
  }else{
    res.status(404).send("Comment not found")
  }
}

// Update Comment: // Send in body(commentId,comment_description)
// The only property will be updated here is "cooment" which is comment description
const updateComment = async (req,res) => {
  let comment = await Review.findByIdAndUpdate(req.body.commentId,{"cooment":req.body.comment_description})
  if(comment){
    res.status(201).send("Comment updated successfully")
  }else{
    res.status(404).send("Comment not found")
  }
}

// Update Comment: // Send in body(replyId,reply_description)
// The only property will be updated here is "cooment" which is reply description
const updateReply = async (req,res) => {
  let reply = await Review.findByIdAndUpdate(req.body.replyId,{"cooment":req.body.reply_description})
  if(reply){
    res.status(201).send("Reply updated successfully")
  }else{
    res.status(404).send("Reply not found")
  }
}

// Delete comment: // Send in body(commentId)
const deleteComment = async (req,res) => {
  let comment = await Review.findOneAndDelete(req.body.commentId)
  if(comment){
    res.status(201).send("Comment deleted successfully")
  }else{
    res.status(404).send("Comment not found")
  }
}

// Delete reply: // Send in body(replyId)
const deleteReply = async (req,res) => {
  let reply = await Review.findOneAndDelete(req.body.replyId)
  if(reply){
    res.status(201).send("Reply deleted successfully")
  }else{
    res.status(404).send("Reply not found")
  }
}

module.exports = {addComment,addReply,updateComment,updateReply,deleteComment,deleteReply,showComments,showReplies}

// // Nested route
// // GET /api/v1/products/:productId/reviews
// exports.createFilterObj = (req, res, next) => {
//   let filterObject = {};
//   if (req.params.productId) filterObject = { product: req.params.productId };
//   req.filterObj = filterObject;
//   next();
// };

// // @desc    Get list of reviews
// // @route   GET /api/v1/reviews
// // @access  Public
// exports.getReviews = factory.getAll(Review);

// // @desc    Get specific review by id
// // @route   GET /api/v1/reviews/:id
// // @access  Public
// exports.getReview = factory.getOne(Review);

// // Nested route (Create)
// exports.setProductIdAndUserIdToBody = (req, res, next) => {
//   if (!req.body.product) req.body.product = req.params.productId;
//   if (!req.body.user) req.body.user = req.user._id;
//   next();
// };
// // @desc    Create review
// // @route   POST  /api/v1/reviews
// // @access  Private/Protect/User
// exports.createReview = factory.createOne(Review);

// // @desc    Update specific review
// // @route   PUT /api/v1/reviews/:id
// // @access  Private/Protect/User
// exports.updateReview = factory.updateOne(Review);

// // @desc    Delete specific review
// // @route   DELETE /api/v1/reviews/:id
// // @access  Private/Protect/User-Admin-Manager
// exports.deleteReview = factory.deleteOne(Review);
