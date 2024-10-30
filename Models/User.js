const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    min: 10,
    required: true,
  },
  abcId: {
    type: String,
    required: true,
  },
  // eduYear: {
  //   type: String,
  //   required: true,
  // },
  highestQualification: {
    type: String,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  motherTongue: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const options = {
  usernameField: "email",
};

userSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model("User", userSchema);
