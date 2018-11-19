const mongoose = require("mongoose");
const requestModel = require("../models/requests");
const donateModel = require('../models/donate');
const toImgUrl = require('../utils/index')

//create one request for donnation
exports.createRequest = async (req, res, next) => {



    console.log(req.files)
    console.log(req.files.length)
    if (req.files.length == 0)
        return res.status(422).json({ message: 'images is required' });
    req.body.img = []
    try {
        for (let i = 0; i < req.files.length; i++) {
            req.body.img.push(await toImgUrl.toImgUrl(req.files[i]));
        }
    } catch (err) {
        next(err)
    }
    req.body.user = req.userData.userId;

    let createdObj = await requestModel.create(req.body);
    let returnedObject = await requestModel.findById(createdObj.id)
        .populate('user')
    return res.status(200).json(returnedObject);
};


//create one donation 
exports.createDonation = async (req, res, next) => {
    req.body.request = req.params.reqId;
    req.body.user = req.userData.userId;
    let createdObj = await donateModel.create(req.body);

    return res.status(200).json(createdObj);

};


exports.getAllforAdmin = async (req, res, next) => {
    if (req.userData.type == 'ADMIN') {
        let details = await requestModel.find().populate('user').populate('doner');
        return res.status(200).json(details);
    } else {
        return res.status(403).json({ error: 'not admin' })
    }

};

exports.getAlldonforAdmin = async (req, res, next) => {
    if (req.userData.type == 'ADMIN') {
        let details = await donateModel.find({request:req.params.reqId}).populate('user');
        return res.status(200).json(details);
    } else {
        return res.status(403).json({ error: 'not admin' })
    }

};

//get All 

exports.getAll = async (req, res, next) => {
    let details = await requestModel.find({ status: 'Accepted' }).populate('user').populate('doner');
    let arr;
    let going = false;

    for (let i = 0; i < details.length; i++) {

        arr = details[i].doner;

        for (let j = 0; j < arr.length; j++) {
            if (arr[j].id==req.userData.userId) {
                console.log('hello')
                going = true;

            }
            else {
                going = false;

            }
        }
        details[i] = { ...details[i].toJSON(), going };


    }
    return res.status(200).json(details);

};
exports.getOneDonation = async (req, res, next) => {
    const id = req.params.donId;
    let details = await donateModel.findById(id).populate('user').populate('request');

    if (!details)
        return res.status(404).end();
    return res.status(200).json(details);

};
//getOne Request by user
exports.getOne = async (req, res, next) => {
    const id = req.params.reqId;
    let details = await requestModel.findById(id).populate('user').populate('doner');


    if (!details)
        return res.status(404).end();
    let arr;
    let going = false;
    arr = details.doner;

    for (let j = 0; j < arr; j++) {
        if (arr[j].id==req.userData.userId) {

            going = true;
        }
        else {
            going = false;
        }
    }
    details = { ...details.toJSON(), going };


    return res.status(200).json(details);

};


//Update By Admin 

exports.updateAccepted = async (req, res, next) => {

    if (req.userData.type == 'ADMIN') {
        const id = req.params.reqId;
        let old = await requestModel.findById(id);

        if (!old)
            return res.status(404).end();
        try {
            old.status = 'Accepted';
            await old.save();

            let newObject = await requestModel.findById(id).populate('user').populate('doner')
            return res.status(200).json(newObject)

        } catch (error) {
            return res.status(500).json({
                "message": "updating process not completed",
                error: err
            });
        }
    } else {
        return res.status(403).json({ error: 'not admin' })
    }

};

//update to rejected request
exports.updateRejected = async (req, res, next) => {

    if (req.userData.type == 'ADMIN') {
        const id = req.params.reqId;
        let old = await requestModel.findById(id);

        if (!old)
            return res.status(404).end();
        try {
            old.status = 'Rejected';
            await old.save();

            let newObject = await requestModel.findById(id).populate('user').populate('doner')
            return res.status(200).json(newObject)

        } catch (error) {
            return res.status(500).json({
                "message": "updating process not completed",
                error: err
            });
        }
    } else {
        return res.status(403).json({ error: 'not admin' })
    }

};


//update to donation 

exports.updateDonate = async (req, res, next) => {

    const id = req.params.donId;
    let old = await donateModel.findById(id);

    if (!old)
        return res.status(404).end();

    let orequest = await requestModel.findById(old.request);

    let allDonner = orequest.doner;
    try {
        old.status = 'Accepted';
        allDonner.push(old.user);
        orequest.doner = allDonner;
        await old.save();
        await orequest.save();


        let newObject = await requestModel.findById(old.request).populate('doner')
        let going = true;
        newObject = { ...newObject.toJSON(), going }
        return res.status(200).json(newObject)

    } catch (error) {
        return res.status(500).json({
            "message": "updating process not completed",
            error: err
        });
    }

};


exports.updaterejectDonate = async (req, res, next) => {

    const id = req.params.donId;
    let old = await donateModel.findById(id);
    let request = await requestModel.findById(old.request);

    if (!old)
        return res.status(404).end();

    let alldoners = request.doner;
    try {
        old.status = 'Rejected';
        console.log(old.user)

        for (let i = 0; i < alldoners.length; i++) {
            if (alldoners[i].equals(old.user)) {

                alldoners.splice(i--, 1);
            }
        }
        request.doner = alldoners;
        await request.save();
        await old.save();
        let newObject = await requestModel.findById(old.request).populate('doner')

        return res.status(200).json(newObject)

    } catch (error) {
        return res.status(500).json({
            "message": "updating process not completed",
            error: err
        });
    }

};

//Get History of Donation 
exports.getAllIDonate = async (req, res, next) => {
    let details = await requestModel.find({ status: 'Accepted', doner: req.userData.userId }).populate('user').populate('doner');
    let going = true;

    for (let i = 0; i < details.length; i++) {
        details[i] = { ...details[i].toJSON(), going };
    }

    return res.status(200).json(details);

};

//Get All I request to Help
exports.getAllIRequest = async (req, res, next) => {
    let details = await requestModel.find({ status: 'Accepted', user: req.userData.userId }).populate('user').populate('doner');

    return res.status(200).json(details);

};



