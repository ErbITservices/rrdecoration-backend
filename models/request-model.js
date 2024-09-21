const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = new Schema(
  {
    lname: { type: String, required: true },
    service: { type: String, required: true },
    name: { type: String, required: true },

    // buy_price: { type: Number, required: true },
    mobilenumber: { type: Number, required: true },
    email: { type: String },
    problemstatement: { type: String },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
