const mongoose = require("mongoose");

const DB_connect = () => {
  try {
    mongoose.connect(process.env.MONGODB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("database id connected");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = DB_connect;
