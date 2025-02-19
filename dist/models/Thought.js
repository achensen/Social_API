import { Schema, Types, model } from 'mongoose';
import { formatDate } from '../utils/formatDate.js';
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //getter timestamp
        get: (timestamp) => formatDate(timestamp)
    },
    username: {
        type: String,
        required: true,
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    }
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    timestamps: true
});
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //getter timestamp
        get: (timestamp) => formatDate(timestamp)
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    timestamps: true
});
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length;
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
