import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please give us your name!"],
  },

  email: {
    type: String,
    validate: validator.isEmail,
    required: [true, "Please give us your email!"],
  },

  password: {
    type: String,
    minlength: 8,
    required: [true, "Please enter a password!"],
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password!"],
  },

  createdAt: {
    type: Date,
  },

  role: {
    type: String,
    default: "user",
  },

  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  this.createdAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
