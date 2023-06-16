const express = require("express");
const {
  getFieldValidator,
  createFieldValidator,
  updateFieldValidator,
  deleteFieldValidator,
} = require("../utils/validators/fieldValidator");

const authService = require("../services/authService");

const {
  getFields,
  getField,
  createField,
  updateField,
  deleteField,
} = require("../services/fieldService");

const router = express.Router();

router
  .route("/")
  .get(getFields)
  .post(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    createFieldValidator,
    createField
  );
router
  .route("/:id")
  .get(getFieldValidator, getField)
  .put(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    updateFieldValidator,
    updateField
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteFieldValidator,
    deleteField
  );

module.exports = router;
