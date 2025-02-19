import { Thought, User } from "../models/index.js";
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
export const getThoughtById = async (req, res) => {
    // const { thoughtId } = req.params;
    const thoughtId = req.params.thoughtId;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({
                message: "Volunteer not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
export const createThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        await User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: newThought._id } }, { runValidators: true, new: true });
        res.status(201).json(newThought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({
            _id: req.params.thoughtId,
        });
        if (!thought) {
            res.status(404).json({
                message: "No thought with that ID",
            });
        }
        res.status(200).json({
            message: "Deleted Thought",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
export const createReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
export const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.body.reactionId } } }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
