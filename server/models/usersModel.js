import { Schema, model } from "mongoose";
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
          }),
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      },
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

const Users = model("User", UserSchema);

export default Users;
