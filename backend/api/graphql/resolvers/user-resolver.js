const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const User = require('../../models/user');

const db = require("../../lib/db");
const { getNewUserId } = db;

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await db
        .get("users")
        .find({ email: args.userInput.email.trim() })
        .value();
      if (existingUser) {
        // if (false) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(
        args.userInput.password.trim(),
        10
      );

      const userObj = {
        id: await getNewUserId(),
        email: args.userInput.email,
        username: args.userInput.username,
        password: hashedPassword
      };

      const user = await db
        .get("users")
        .push(userObj)
        .last()
        .write();

      //   const result = await user.save();
      const returnobj = { ...user, password: null };

      return returnobj;
      //   return { ...user, password: null, };
    } catch (err) {
      throw err;
    }
  },

  login: async ({ email, password }) => {
    const user = await db
      .get("users")
      .find({ email: email.trim().toLowerCase() })
      .value();
    if (!user) {
      throw new Error("User does not exist!");
    }
    const isEqual = await bcrypt.compare(password, user.password.trim());
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }
    setTimeout(() => {
      console.log(
        `TOKEN TO USER ${user.id +
          " - " +
          user.username} Expired! at ${Date().toString()}`
      );
      // }, 10000)
    }, 1000 * 60 * 60);
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username
      },
      process.env.JWT_KEY,
      {
        // expiresIn: '10s'
        expiresIn: "1h"
      }
    );
    return {
      userId: user.id,
      username: user.username,
      token: token,
      tokenExpiration: 1
    };
  },

  validateCreds: (args, req) => {
    //   console.log('validation')
    if (req.isAuth) {
      return { authentication: true };
    }
    return { authentication: false };
  }
};
