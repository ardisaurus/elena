const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subjectSchema = new Schema({
  subjectName: String,
  images: String,
  description: String
});
const rankSchema = new Schema({
  subjectName: String,
  images: String,
  subjectRank: Number,
  description: String
});
let pollSchema = new Schema(
  {
    pollName: { type: String },
    subject: [subjectSchema],
    rank: [rankSchema]
  },
  {
    collection: "myPoll"
  }
);
module.exports = mongoose.model("Poll", pollSchema);
