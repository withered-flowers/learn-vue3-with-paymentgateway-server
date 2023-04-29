if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const routes = require("./routes/index");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/v1/payment", routes);

app.use((err, req, res, next) => {
  console.log(err);

  res.status(501).json({
    statusCode: 501,
    error: "Error Not Implemented for Client, see Logs on server",
  });
});

app.listen(port, (_) => console.log(`apps is working at ${port}`));
