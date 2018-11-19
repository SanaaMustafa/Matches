const mongoose = require("mongoose");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const toImgUrl = require('../utils/index');

var phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

exports.user_signup = async (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(async user => {

      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      }
      else {
        if (req.file)
          req.body.img = await toImgUrl.toImgUrl(req.file);

        if (!req.body.phone.match(phoneno))
          return res.status(400).json({ message: "unValid Phone Number" });

        if (req.body.password.length < 6)
          return res.status(400).json({ message: 'Sorry this password less than 6 characters' })


        const newuser = new User({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          img: req.body.img,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password,
          type:req.body.type
        });
        newuser
          .save()
          .then(result => {
            //create token 
            let token = jwt.sign(
              {
                phone: result.phone,
                email: result.email,
                userId: result._id,
                type: result.type,
              },
              'secret',
              {
                expiresIn: "4380h"

              }
            );

            console.log(result);
            res.status(201).send({
              message: "User created",
              user: newuser,
              token: token
            });
          })
          .catch(err => {
            next(err);
          });


      }
    });
};


//login

exports.user_login = (req, res, next) => {
  console.log(req.body.phone)
  User.findOne({ phone: req.body.phone, password: req.body.password })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).send({
          message: "Auth failed"
        });
      }
      else {
        const token = jwt.sign(
          {
            phone: user.phone,
            email: user.email,
            userId: user._id,
            type: user.type,
          },
          'secret',
          {
            expiresIn: "4380h"
          }
        );
        return res.status(200).send({
          message: "Auth successful",
          token: token,
          user: user
        });
      }
      res.status(401).send({
        message: "Auth failed"
      });

    })
    .catch(err => {
      next(err);
    });
};

//get profile 
exports.user_get_profile = async (req, res, next) => {
  try {
    let userId = req.userData.userId;
    let getUser = await User.findById(userId)
    if (!getUser)
      return res.status(404).end();

    return res.status(200).json(getUser);

  }
  catch (err) {
    next(err);
  }
};

//put profile 
exports.user_update_profile = async (req, res, next) => {
  try {
    let userId = req.userData.userId;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).end();
    }
    if (req.file) {
      req.body.img = req.file.path;
    }
    let userUpdated = await User.findByIdAndUpdate(userId, req.body, { new: true });
    return res.status(200).json(userUpdated)


  }
  catch (err) {
    next(err);
  }
}