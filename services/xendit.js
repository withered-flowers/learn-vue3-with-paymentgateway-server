// Xendit configuration
const { v4: uuidv4 } = require("uuid");
const Xendit = require("xendit-node");

const xenditClient = new Xendit({
  secretKey: process.env.XENDIT_SERVER_KEY,
});

const { Invoice } = xenditClient;

const createInvoice = async (itemName, itemPrice) => {
  const invoiceSpecificOptions = {};
  const invoice = new Invoice(invoiceSpecificOptions);

  // TODO: Need to Fix this
  let invoiceParameter = {
    externalID: `${itemName.toLowerCase().split(" ").join("-")}-${uuidv4()}`,
    amount: itemPrice,
    description: "Invoice Demo #123",
    currency: "IDR",
    invoiceDuration: 86400,
    customer: {
      givenNames: "John Doe",
      email: "john.doe@unknown.com",
      mobileNumber: "+6281234567890",
    },
    successRedirectURL:
      "http://localhost:3000/v1/payment/xendit/payment/success",
    failureRedirectURL:
      "http://localhost:3000/v1/payment/xendit/payment/failure",
  };

  return invoice.createInvoice(invoiceParameter);
};

module.exports = {
  createInvoice,
};
