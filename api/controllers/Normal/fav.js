const mongoose = require("mongoose");
const FavModel = require("../../models/league");
const toImgUrl = require('../../utils/index')

//create one By Admin
exports.createOne = async (req, res, next) => {

    try {

        let checkExist = await FavModel.findOne({ user: req.userData.userId });
        if (checkExist)
            return res.send(checkExist);

        req.body.user = req.userData.userId;

        let createdObj = await FavModel.create(req.body);
        return res.status(200).json(createdObj);

    } catch (err) {
        next(err)
    }


};
//Add Team 

exports.addTofav = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }

};
//Update 

exports.updateOneDeleteTeamFromList = async (req, res, next) => {

    try {
        let id = req.params.favId;

        let old = await FavModel.findById(id);
        if (!old)
            return res.status(404).end();

        let newDoc = await FavModel.findByIdAndUpdate(id, req.body, { new: true });


        return res.status(200).json(newDoc);

    } catch (error) {
        next(error)

    }

};





