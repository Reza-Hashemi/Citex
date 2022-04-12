const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      minlength: [3, 'invalid name'],
      maxlength: [20, 'invalid name'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: [8, 'invalid password'],
      maxlength: [80, 'invalid password'],
      validate: {
        validator: function (v) {
          const reg = new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
          );
          return reg.test(v);
        },
        message: 'password must be complex',
      },
    },

    mobile: {
      type: String,
      required: [true, 'phone is required'],
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          const reg = new RegExp('^(\\+98|0)?9\\d{9}$');
          return reg.test(v);
        },
        message: 'mobile number is not acceptable',
      },
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this._doc;
  if (this.isNew || this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } else {
    next();
  }
});

module.exports = mongoose.model('user', userSchema);
