const mongoose = require("mongoose");
let validator = require("validator");
let bcrypt = require("bcryptjs");

// model step: 1
const userModel = new mongoose.Schema(
  {
    displayName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String, 
      validate: [validator.isEmail, "Provided email is not valid."],
      required: [true, "Email address is require"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minUppercase: 1,
          }),
        message: "Password is not strong enough",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password not match",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin" ],
      default: "user",
    },
    avatar: {
      type: String
    },
    friends: {
      type: Array,
    },
    points: {
      type: Number,
    },
    award: {
      type: Number,
    },
    scan_product_list: {},
    scanned_products: {
      type: Array,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    passwordChangeAt: Date,
    passwordRestToken: String,
    passwordTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Password hash by bcrypt
userModel.pre("save", function (next) {
  const password = this.password;

  const hashPassword = bcrypt.hashSync(password);

  this.password = hashPassword;
  this.confirmPassword = undefined;

  next();
});

module.exports = mongoose.model("users", userModel);
