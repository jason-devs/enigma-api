import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please give us your name!"],
  },

  email: {
    type: String,
    validate: [validator.isEmail, "Please enter a valid email address!"],
    required: [true, "Please give us your email!"],
    unique: true,
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
    validate: {
      validator: function () {
        return this.password === this.passwordConfirm;
      },
      message: "Passwords do not match. Please check and try again!",
    },
  },

  createdAt: {
    type: Date,
  },

  role: {
    type: String,
    default: "user",
    select: false,
  },
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

userSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
