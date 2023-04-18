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
            default: Date.now,
            get: function() {
                // Format the createdAt date using dayjs
                return dayjs(this.get('createdAt')).format('YYYY-MM-DD [at] HH:mm:ss');
            }
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
            get: function() {
                // Format the createdAt date using dayjs
                return dayjs(this.get('createdAt')).format('YYYY-MM-DD [at] HH:mm:ss');
            }
        },
        username: { 
            type: String,
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

thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts; 