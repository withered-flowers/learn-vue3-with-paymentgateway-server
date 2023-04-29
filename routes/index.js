const express = require("express");
const router = express.Router();

const midtransRouter = require("./midtrans");

router.use("/midtrans", midtransRouter);

module.exports = router;
