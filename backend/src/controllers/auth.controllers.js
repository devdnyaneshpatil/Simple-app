const CustomError = require("../utils/customError");
const validator = require("../utils/validator");
const authContext = require("../db/context/auth.context");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/constants");
const { HASH_SALT } = require("../config/constants");
const bcrypt = require("bcrypt");

const registerController = async (req, res, next) => {
  const { name, email, password, phoneNo, profession } = req.body;
  try {
    const isValidData = validator(req.body, [
      "email",
      "name",
      "password",
      "phoneNo",
      "profession",
    ]);
    if (isValidData !== true) {
      const err = new CustomError(isValidData, 400);
      return next(err);
    }
    const isUserExist = await authContext.getUserByEmail(email);
    if (isUserExist) {
      const err = new CustomError(
        `User Already Exist With Email:-${email}`,
        404
      );
      return next(err);
    }
    const hashedPassword = await bcrypt.hash(password, HASH_SALT);
    const userObj = {
      name,
      email,
      password: hashedPassword,
      phoneNo,
      profession,
    };
    const newUser = await authContext.createNewUser(userObj);
    console.log(newUser);
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
    return res
      .status(201)
      .json({ msg: "User registered  successfully", token });
  } catch (error) {
    return next(error);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isValidData = validator(req.body, ["email", "password"]);
    if (isValidData !== true) {
      const err = new CustomError(isValidData, 400);
      return next(err);
    }
    const isUserExist = await authContext.getUserByEmail(email);
    if (!isUserExist) {
      const err = new CustomError(
        `User Doesn't Exist With Email:-${email}`,
        404
      );
      return next(err);
    }
    const checkPassword = await bcrypt.compare(password, isUserExist.password);
    if (!checkPassword) {
      const err = new CustomError("Please check your password", 400);
      return next(err);
    }
    const token = jwt.sign({ userId: isUserExist._id }, JWT_SECRET);
    return res.status(201).json({ msg: "User login  successfully", token });
  } catch (error) {
    return next(error);
  }
};

module.exports = { registerController, loginController };
