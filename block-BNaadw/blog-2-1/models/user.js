const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
  },
  { timestamps: true }
);

// hashing a password using bcrypt
userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    console.log(this, 'before hashing');
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;
      console.log(this, 'after hashing');
      return next();
    });
  } else {
    next();
  }
});

userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
