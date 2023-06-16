//const asyncHandler = require('express-async-handler');
//const { v4: uuidv4 } = require('uuid');
//const sharp = require('sharp');

const factory = require('./handlersFactory');
//const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const Field = require('../models/fieldModel');



// @desc    Get list of fields
// @route   GET /api/v1/fields
// @access  Public
exports.getFields = factory.getAll(Field);

// @desc    Get specific field by id
// @route   GET /api/v1/fields/:id
// @access  Public
exports.getField = factory.getOne(Field);

// @desc    Create field
// @route   POST  /api/v1/fields
// @access  Private
exports.createField = factory.createOne(Field);

// @desc    Update specific field
// @route   PUT /api/v1/fields/:id
// @access  Private
exports.updateField = factory.updateOne(Field);

// @desc    Delete specific field
// @route   DELETE /api/v1/fields/:id
// @access  Private
exports.deleteField = factory.deleteOne(Field);
