const mongoose = require("mongoose");
const leagueModel = require("../../models/league");
const toImgUrl = require('../../utils/index')

//create one By Admin
exports.createOne = async (req, res, next) => {

    if (req.userData.type != 'ADMIN')
        return res.status(403).json({ message: 'not Admin' });
    try {

        if (!req.file)
            return res.status(422).json({ message: 'image is required' });

        req.body.img = await toImgUrl.toImgUrl(req.file);
        let createdObj = await leagueModel.create(req.body);
        return res.status(200).json(createdObj);

    } catch (err) {
        next(err)
    }


};

//Update 

exports.updateOne = async (req, res, next) => {

    if (req.userData.type != 'ADMIN')
        return res.status(403).json({ message: 'not Admin' });
    try {
        let id = req.params.leagueId;

        let old = await leagueModel.findById(id);
        if (!old)
            return res.status(404).end();
        if (req.file)
            req.body.img = await toImgUrl.toImgUrl(req.file);

        let newDoc = await leagueModel.findByIdAndUpdate(id, req.body, { new: true });


        return res.status(200).json(newDoc);

    } catch (error) {
        next(error)

    }

};





