const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    _userId:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlenght: 1,
        trim: true

    }
});

const List = mongoose.model('List', ListSchema);

module.exports = { List }