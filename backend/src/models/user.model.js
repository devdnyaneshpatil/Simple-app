const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
      required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
});

userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema);

module.exports = User;
