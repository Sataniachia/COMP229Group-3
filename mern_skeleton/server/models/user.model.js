import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  name: {
    type: String,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

// Virtual for password
UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
UserSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.hashed_password;
    delete ret.salt;
    delete ret._password;
    return ret;
  }
});

// Methods
UserSchema.methods = {
  authenticate: function(plainText) {
    // Try legacy sha1 first
    if (this.encryptPassword(plainText) === this.hashed_password) return true;
    // If stored hash looks like bcrypt (starts with $2a/$2b) attempt bcrypt compare
    if (this.hashed_password && this.hashed_password.startsWith('$2')) {
      try {
        return bcrypt.compareSync(plainText, this.hashed_password);
      } catch (e) {
        return false;
      }
    }
    return false;
  },
  
  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
  
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  }
};

// Pre-save middleware
UserSchema.pre('save', function(next) {
  this.updated = Date.now();
  if (this.firstName && this.lastName) {
    this.name = `${this.firstName} ${this.lastName}`;
  }
  next();
});

// Password validation
UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);

export default mongoose.model('User', UserSchema);
