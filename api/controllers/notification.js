const mongoose = require("mongoose");
const requestModel = require("../models/requests");
const NotifModel = require('../models/notification');
const User = require('../models/user');
const toImgUrl = require('../utils/index')

//create one 

exports.sendNotification = async (req, res, next) => {

    let users = await User.find();
    let len = users.length;

 for(let i=0;i<len;i++)
 {
    let createdObj = await NotifModel.create({
        targetUser:users[i]._id,
        subject:req.params.reqId,
        text: `مرحبا ${users[i].name} يوجد حالة طارئة يمكنك الاطلاع عليها للتبرع`,
    });
 }

    return res.status(200).json({message:'send Messages is Done'});

};

//get all notification of one user

exports.getAll = async (req, res, next) => {
  
        let details = await NotifModel.find({targetUser:req.userData.userId}).populate('targetUser').populate('subject');
        return res.status(200).json(details);

};










