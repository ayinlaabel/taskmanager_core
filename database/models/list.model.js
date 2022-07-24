const mongoose = require("mongoose");

const ListSchema = mongoose.Schema({
  _userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlenght: 1,
    trim: true,
  },
  reminder: {
    type: Boolean,
    default: false,
  },
  remiderDate: {
    type: String,
  },
  reminderTime: {
    type: String,
  },
});

const List = mongoose.model("List", ListSchema);

module.exports = { List };
