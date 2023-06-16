const mongoose = require("mongoose");

const user_group_schema = new mongoose.Schema(
  {
    group_name: {
      type: String,
      required: true,
    },
    users_id: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    group_by: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    field:{
      type:mongoose.Types.ObjectId,
      ref:"field",
      required:true,
    }
  },
  {
    versionKey: false,
    strict: false,
  }
);

module.exports = mongoose.model("user_group_schema", user_group_schema);
