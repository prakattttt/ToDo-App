import { Schema, model } from "mongoose";
import AppError from "../utils/AppError.js";
import validator from "validator";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      trim: true,
      unique: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username must be at most 20 characters"],
      validate: {
        validator: validator.isAlphanumeric,
        message: "Please provide a valid username!",
      },
    },

    email: {
      type: String,
      required: [true, "Email is required!"],
      lowercase: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address!",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [8, "Password must be at least 8 characters"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
          }),
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      },
    },
    refreshTokens: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.statics.createUser = async function (username, email, password) {
  return await this.create({ username, email, password });
};

UserSchema.statics.loginUser = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user)
    throw new AppError(`User with the email ${email} doesn't exist!`, 401);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new AppError("Invalid password!", 401);

  return user;
};

UserSchema.statics.addRefreshToken = async function (userId, token) {
  const user = await this.findById(userId);
  user.refreshTokens.push(token);
  await user.save();
};

UserSchema.statics.removeRefreshToken = async function (token) {
  const user = await this.findOne({ refreshTokens: token });
  if (!user) return null;

  user.refreshTokens = user.refreshTokens.filter(t => t !== token);
  await user.save();

  return user;
};


const Users = model("User", UserSchema);

export default Users;
