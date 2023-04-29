const express = require("express");
const router = express.Router();

const { createTransaction } = require("../services/midtrans");

router.post("/midtrans-payment", async (req, res, next) => {
  try {
    const { itemName, itemPrice } = req.body;

    const transaction = await createTransaction(itemName, itemPrice);
    const transactionToken = transaction.token;

    res.status(201).json({
      statusCode: 201,
      data: {
        token: transactionToken,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/midtrans-payment-callback", async (req, res, next) => {
  try {
    // TODO: Add after payment success response
  } catch (err) {
    next(err);
  }
});

module.exports = router;
