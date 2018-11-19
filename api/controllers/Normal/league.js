const mongoose = require("mongoose");
const leagueModel = require("../../models/league");
const toImgUrl = require('../../utils/index')

exports.getAll = async (req, res, next) => {
    try {

        let leagues = await leagueModel.find();
        return res.status(200).json(leagues);


    } catch (error) {
        next(error)
    }
};

exports.getOne = async (req, res, next) => {
    try {
        let id = req.params.leagueId;

        let league = await leagueModel.findById(id);
        if (!league)
            return res.status(404).end();
        return res.status(200).json(league);


    } catch (error) {
        next(error)
    }
};