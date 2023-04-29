const express = require("express");
const router = express.Router();

const midtransRouter = require("./midtrans");
const xenditRouter = require("./xendit");

router.use("/midtrans", midtransRouter);
router.use("/xendit", xenditRouter);

module.exports = router;
