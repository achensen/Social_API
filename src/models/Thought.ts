import { Schema, Types, model, type Document } from 'mongoose';
import { formatDate } from '../utils/formatDate.js';

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date | undefined,
    username: string,
    reactions: [typeof reactionSchema],
}

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date | undefined
}

//What makes up a Thought
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=>new Types.ObjectId(),
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter timestamp
            get: (timestamp: any)=> formatDate(timestamp)
        },
        username: {
            type: String,
            required: true,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength:280,
        } 
    },

    
    {
        toJSON: {
            virtuals: true,
            getters:true,
        },
        timestamps: true
    },
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength:280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter timestamp
            get: (timestamp: any)=> formatDate(timestamp)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },

    
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        timestamps: true
    },
);

//uses virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length;
  });

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
