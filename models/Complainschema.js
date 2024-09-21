const mongoose = require("mongoose");
const { Schema } = mongoose;

const ComplainSchema = new Schema(
  {
    lname: { type: String, required: true },
    service: { type: String, required: true, index: true },
    name: { type: String, required: true },
    img: { type: Schema.Types.Mixed},
    status: { type: String, default:'panding'},
    // buy_price: { type: Number, required: true },
    mobilenumber: { type: Number, required: true },
    email: { type: String },
    problemstatement: { type: String },
  },
  { timestamps: true }
);

const Complainschema = mongoose.model("Complainschema", ComplainSchema);
module.exports = Complainschema;
