const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    owner: { 
        type: String,
        required: true
    },
    owner_image: { 
        type: String,
        required: true
    },
    answer: { 
        type: String,
        required: true
    },
    upvotes: { 
        type: Number,
        default: 0
    }
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;