import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  plaintext: {
    type: String,
  },

  cyphertext: {
    type: String,
  },

  settings: {
    type: Object,
    required: [true, "Please provide the machine settings!"],
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

messageSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
