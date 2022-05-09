const User = require("../models/user_model");
const { removePasswordFromUserRes } = require("../helpers");

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json("User deleted");
  } catch (err) {
    res.status(500).json({ err, msg: "Error while deleting." });
  }
};

const findUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const filteredUser = removePasswordFromUserRes(user);

    res.status(200).json(filteredUser);
  } catch (err) {
    res.status(500).json({ err, msg: "can't find user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const latestUsers = await User.find().sort({ id: -1 }).limit(10);

    res.status(200).json(latestUsers);
  } catch (err) {
    res.status(500).json({ err, msg: "can't fetch users" });
  }
};

module.exports = { deleteUser, findUser, getAllUsers };