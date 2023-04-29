const express = require("express");
const router = express.Router();

const { createInvoice } = require("../services/xendit");

router.post("/payment", async (req, res, next) => {
  try {
    const { itemName, itemPrice } = req.body;

    const invoice = await createInvoice(itemName, itemPrice);

    res.status(201).json({
      statusCode: 201,
      data: {
        id: invoice.id,
        external_id: invoice.external_id,
        user_id: invoice.user_id,
        invoice_url: invoice.invoice_url,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/payment/success", async (req, res, next) => {
  try {
    console.log("success");
    console.log(req.body);

    res.status(501).json({ "not implemented": true });
  } catch (err) {
    next(err);
  }
});

router.get("/payment/failure", async (req, res, next) => {
  try {
    console.log("error");
    console.log(req.body);

    res.status(501).json({ "not implemented": true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
