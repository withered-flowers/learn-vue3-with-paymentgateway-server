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

// This will be the webhooks from Xendit to the server
// must be configured via Xendit dashboard
// Cannot use localhost as the webhook URL
// (Try using ngrok / localtunnel)
router.post("/payment/success", async (req, res, next) => {
  try {
    // If you wanna see the data from Xendit and check the webhooks response
    // Uncomment this line
    // console.log(req.body);

    // TODO: Via Database, update the invoice status to paid
    // Since this is just a demo, we will just return a 501
    res.status(501).json({ "not implemented": true });
  } catch (err) {
    next(err);
  }
});

router.post("/payment/failure", async (req, res, next) => {
  try {
    res.status(501).json({ "not implemented": true });
  } catch (err) {
    next(err);
  }
});

router.get("/invoice/:id", async (req, res, next) => {
  try {
    // TODO: Via Database, check invoice status
    const { id } = req.params;

    res.status(200).json({
      statusCode: 200,
      data: {
        message: `Success, Transaction with id ${id} paid successfully`,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
