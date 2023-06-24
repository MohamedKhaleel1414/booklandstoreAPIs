const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },//
    authorName: {
      type: String,
      required: true,
      trim: true,
    },//
    aboutAuthor: {
      type: String,
      required: true,
    },//
    isCourseOrBook: {
      type: String,
      enum: ["Course", "Book"], // when a value provided to this property, it must be equal to one of the array of enum
      required: true,
    },//
    publisher: {
      type: String,
      required: true,
      trim: true,
    },//
    dateOfPublished: {
      type: Date,
      required: true,
      trim: true,
    },//
    language: {
      type: String,
      required: true,
      trim: true,
    },//
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },//
    productDescription: {
      type: String,
      required: [true, "Product description is required"],
    },//
    sold: {
      type: Number,
      default: 0,
    },//
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
    },//
    pages: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
    },//
    tableOfContent: [{
      type: String,
      required: [true],
    }],//
    sampleOfChapter: {
      type: String,
      required: [true],
    },//
    imageCover: {
      type: String,
      required: [true, "Product Image cover is required"],
    },//
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to category"],
    },//
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    field: {
      type: mongoose.Schema.ObjectId,
      ref: "field",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
      // set: (val) => Math.round(val * 10) / 10, // 3.3333 * 10 => 33.333 => 33 => 3.3
    },//
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    // to enable virtual populate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

// Mongoose query middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name -_id",
  });
  next();
});

const setImageURL = (doc) => {
  if (doc.imageCover) {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((image) => {
      const imageUrl = `${process.env.BASE_URL}/products/${image}`;
      imagesList.push(imageUrl);
    });
    doc.images = imagesList;
  }
};
// findOne, findAll and update
productSchema.post("init", (doc) => {
  setImageURL(doc);
});

// create
productSchema.post("save", (doc) => {
  setImageURL(doc);
});

module.exports = mongoose.model("Product", productSchema);
