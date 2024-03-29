const dotenv = require("dotenv");
dotenv.config();

/**
 * @desc - This  file will handle's the connection of the database
 */

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("connected to mongoDB successfully..."))
  .catch((err) => console.log(err));

/**
 * @desc - This middleware prevent  deprectation warning (from MongoDB Drive)
 */

// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

module.exports = {
  mongoose,
};
