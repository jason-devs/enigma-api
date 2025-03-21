import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please provide some text!"],
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
