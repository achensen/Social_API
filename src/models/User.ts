import { Schema, model, type Document } from 'mongoose';


interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[]
    friends: Schema.Types.ObjectId[]
}

//what makes up a User
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
        // uses regex to insure proper email formatting 

    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
},
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        timestamps: true
    }
);
//use of virtual for friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends?.length;
  });

const User = model('User', userSchema);

export default User;
