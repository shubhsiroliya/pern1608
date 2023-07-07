const express = require("express");
const {
  uploadxltodb,
  masterdata,
  tabledata,
  deletetable,
  addrow,
  deleterow,
  updaterow,
  getrow,
} = require("../controllers/xlControllers");

// router object
const router = express.Router();

router.route("/upload").post(uploadxltodb);
router.route("/master").get(masterdata);
router.route("/table/:id").get(tabledata).delete(deletetable);
router.route("/row/:id").put(updaterow).post(addrow).delete(deleterow);
// routes

module.exports = router;
