const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  instagramId: {
    type: String,
    sparse: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    sparse: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    sparse: true,
    unique: true,
    trim: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  authMethod: {
    type: String,
    enum: ['instagram', 'email', 'phone'],
    required: true,
  },
  lastLoginAt: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
