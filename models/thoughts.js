const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema =  new Schema(
    {
        reactionId: { 
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: { 
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: { 
            type: Date,
            default: Date.now()
        }
    }, {
        toJSON: {
            virtuals: true
        },
        id: false
});

const thoughtsSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: { 
            type: Date,
            default: Date.now,
        },
        username: { 
            type: String,
            ref: 'User',
            required: true
        },
        reactions: [reactionSchema]
    }, {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

reactionSchema.virtual("formatDate").get(function () {
    return this.createdAt.toLocaleTimeString("en-us", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'America/Chicago'
    })
}) 

thoughtsSchema.virtual("formatDate").get(function () {
    return this.createdAt.toLocaleTimeString("en-us", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'America/Chicago'
    })
})


thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts; 