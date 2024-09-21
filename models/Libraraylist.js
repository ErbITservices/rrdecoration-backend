const mongoose = require("mongoose");
const { Schema } = mongoose;

const LibraraylistSchema = new Schema(
  {
    lname: { type: String, required: true },
    startdate: { type: String, required: true },
    enddate: { type: String, required: true },
    amount: { type: String, required: true },
    service: { type: String, require: true },
  },
  { timestamps: true }
);


const Libraraylist = mongoose.model("Libraraylist", LibraraylistSchema);
module.exports = Libraraylist;
