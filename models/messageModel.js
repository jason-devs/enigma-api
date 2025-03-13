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

const Message = mongoose.model("Message", messageSchema);

export default Message;
