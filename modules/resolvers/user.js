const User = require('../../models/user');
const config = require('config');
const bcrypt = require("bcryptjs");
const { createAccessToken, createRefreshToken } = require('../authHelpers/auth');

module.exports = {
  Query: {
    user: (_, __, { req }) => {
      if (!req.userId) {
        return null;
      }
      return User.findOne({_id:req.userId});
    }
  },

  Mutation: {
    register: async (_, {name, email, password}) => {
      const userAlreadyExists= await User.findOne({email});
      if (userAlreadyExists) {
        return [
          {
            path: "email",
            message: "User already exists"
          }
        ];
      }
      if(!name || !email || !password){
        return [
          {
            path: "Empty",
            message: "Please enter all fields"
          }
        ];
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword
      });
      await newUser.save(); 
      return [
        {
          path: "user",
          message: "New user registered"
        }
      ];
    
    },
    login: async (parent, { email, password }, { res }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        return [
          {
            path: "user",
            message: "Invalid user"
          }
        ];
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return [
          {
            path: "password",
            message: "Invalid pasword"
          }
        ];
      }

      const refreshToken = createRefreshToken(user);
      const accessToken = createAccessToken(user);

      res.cookie("refresh-token", refreshToken);
      res.cookie("access-token", accessToken);

      return [
        {
          path: "user",
          message: "Login successfull"
        }
      ];
    },
    logout: async (parent, args, { res }) => {
      res.clearCookie("refresh-token");
      res.clearCookie("access-token");
      return true
    }
  }
};