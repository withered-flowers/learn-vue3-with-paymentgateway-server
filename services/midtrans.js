// Midtrans Configuration
const { v4: uuidv4 } = require("uuid");
const midtransClient = require("midtrans-client");

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

const createDummyTransaction = () => {
  let dummySnapParameter = {
    transaction_details: {
      order_id: uuidv4(),
      gross_amount: 10000,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: "john",
      last_name: "doe",
      email: "john.doe@unknown.com",
      phone: "08111222333",
    },
  };

  return snap.createTransaction(dummySnapParameter);
};

const createTransaction = (itemName, itemPrice) => {
  let snapParameter = {
    transaction_details: {
      order_id: `${itemName.toLowerCase().split(" ").join("-")}-${uuidv4()}`,
      gross_amount: itemPrice,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: "john",
      last_name: "doe",
      email: "john.doe@unknown.com",
      phone: "08111222333",
    },
  };

  return snap.createTransaction(snapParameter);
};

module.exports = {
  createDummyTransaction,
  createTransaction,
};
