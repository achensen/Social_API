import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb';
import { User } from '../models/index.js';

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}


export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('thoughts').populate('friends')
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: 'user not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }


        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };
//Friend add
  export const addFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId},
        { $push: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
  
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };
//Friend Delete
  export const deleteFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId},
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
  
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };
