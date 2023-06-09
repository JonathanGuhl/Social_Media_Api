const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function (v) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v)
                }
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thoughts"
        }],
        friends: [{ 
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
    }, {
        toJSON: {
            virtuals: true
        },
        id: false
});

usersSchema.virtual("friendCount").get(function () {
    return this.friends.length
});

const User = model("User", usersSchema);

module.exports = User;