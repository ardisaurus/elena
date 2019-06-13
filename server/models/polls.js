const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subjectSchema = new Schema({
  subjectName: String,
  images: String,
  description: String
});
let pollSchema = new Schema(
  {
    pollName: { type: String },
    subject: [subjectSchema]
  },
  {
    collection: "myPoll"
  }
);
module.exports = mongoose.model("Poll", pollSchema);
