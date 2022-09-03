const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Users
const User = new Schema(
  {
    UserName: {
        type: String,
      },
    Password:{
        type: String,
    },
    DOJ:{
        type: String,
    },
    Role:{
      type: String,
  },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("Users", User);
