const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
   lowercase: true, // Convert email to lowercase
    validate: {
      validator: function(v) {
        // Email validation regex
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
    
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum password length
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"], // Gender enum
  },
  phoneNumber: {
    type: String, // Assuming phone number as string
    required: true,
    
    validate: {
      validator: function(v) {
        // Phone number validation regex
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
    
  },
  dateOfBirth: {
    type: String,
    required: true,

  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) return next();
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});



const User = mongoose.model("User", userSchema);

module.exports = User;
