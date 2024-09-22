const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },

    mobilenumber: { type: Number, required: true },
    email: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
