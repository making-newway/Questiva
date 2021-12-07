const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String, 
        required: true 
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

UserSchema.methods.generateAuthToken = async function() {
    try {
        const newToken = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
        this.tokens = this.tokens.concat({token: newToken});
        await this.save();

        return newToken;
    } catch (error) {
        console.log(error);
    }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;