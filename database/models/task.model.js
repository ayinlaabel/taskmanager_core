const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minleght: 1,
        trim: true
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    isComplete:{
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task }