const mongoose = require('mongoose');
// 1- Create Schema
const fieldSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'field required'],
      unique: [true, 'field must be unique'],
     
    },
    slug: {
      type: String,
      lowercase: true,
    },
    
  },
  { timestamps: true }
);


// 2- Create model
module.exports = mongoose.model('field', fieldSchema);
