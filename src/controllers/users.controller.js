const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_Secret = ".*#$=1sMl*!$%&($DF";

const createUser = async (req, res) => {
  try {
    const data = req.body;
    const newStudent = new User(data);
    const userNameExist = await User.findOne({ username: req.body.username });

    if (userNameExist) {
      return res.status(400).json({
        ok: false,
        message: "Username already exist",
        data: null,
      });
    }

    const saveUser = await newStudent.save();
    return res.status(201).json({
      ok: true,
      message: "User saved succesfully",
      data: saveUser,
    });
  } catch (error) {
    console.log("Error creating an user ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      ok: true,
      message: "Users found",
      data: users,
    });
  } catch (error) {
    console.log("Error getting all users ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userFound = await User.findById(req.params.id);

    if (!userFound) {
      return res.status(404).json({
        ok: false,
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      ok: true,
      message: "User found succesfully",
      data: userFound,
    });
  } catch (error) {
    console.log("Error gettin an user by id ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userFound = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!userFound) {
      return res.status(404).json({
        ok: false,
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      ok: true,
      message: "User update succesfully",
      data: userFound,
    });
  } catch (error) {
    console.log("Error updatting an user ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userFound = await User.findByIdAndDelete(req.params.id);

    if (!userFound) {
      return res.status(404).json({
        ok: false,
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      ok: true,
      message: "User deleted succesfully",
      data: userFound,
    });
  } catch (error) {
    console.log("Error deleting an user ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usernameExist = await User.findOne({ username: username });

    if (usernameExist) {
      return res.status(400).json({
        ok: false,
        message: "Username already exist",
        data: null,
      });
    }

    const userData = {
      username: username,
      password: await bcrypt.hash(password, 10), //encriptar
    };

    newUser = new User(userData);
    const savedUser = await newUser.save();
    res.status(200).json({
      ok: true,
      message: "User registered",
      data: savedUser,
    });
  } catch (error) {
    console.log("Error at register form ", error);
    res.status(500).json({
      ok: false,
      messgae: "Error Internal Server",
      data: null,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userFound = await User.findOne({ username: username });

    if (!userFound) {
      return res.status(400).json({
        ok: false,
        message: "User not found",
        data: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userFound.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        ok: false,
        message: "Username or password incorrect",
        data: null,
      });
    }

    const token = jwt.sign({ _id: userFound._id }, jwt_Secret, {
      expiresIn: "1h",
    });

    res.status(200).json({
      ok: true,
      message: "User login succesfully",
      token: token,
      data: userFound,
    });
  } catch (error) {
    console.log("Error at login form ", error);
    res.status(500).json({
      ok: false,
      messgae: "Error Internal Server",
      data: null,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  register,
  login,
};
