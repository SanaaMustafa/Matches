const mongoose = require("mongoose");
const MatchModel = require("../../models/league");
const toImgUrl = require('../../utils/index')

exports.getAll = async (req, res, next) => {
    try {

        let Matches = await MatchModel.find({league:req.params.leagueId});
        return res.status(200).json(Matches);


    } catch (error) {
        next(error)
    }
};

exports.getOne = async (req, res, next) => {
    try {
        let id = req.params.matchId;

        let match = await MatchModel.findById(id);
        if (!match)
            return res.status(404).end();
        return res.status(200).json(match);


    } catch (error) {
        next(error)
    }
};