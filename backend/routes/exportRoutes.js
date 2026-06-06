const express = require("express");
const { exportAsDocument } = require("../controllers/exportController");
const router = express.Router();
const {exportAsPDF}=require("../controllers/exportController");
const {protect}=require("../middlewares/authMiddleware");

router.get("/:id/pdf", protect,exportAsPDF);
router.get("/:id/doc", protect, exportAsDocument); 

module.exports = router;
