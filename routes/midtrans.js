const express = require("express");
const router = express.Router();

const { createTransaction } = require("../services/midtrans");

router.post("/payment", async (req, res, next) => {
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

router.post("/payment-callback", async (req, res, next) => {
  try {
    const { transactionId } = req.body;

    // TODO: If you have a database, save the transaction here
    // ...

    res.status(200).json({
      statusCode: 200,
      data: {
        message: `Success, Transaction with id ${transactionId} paid successfully`,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
