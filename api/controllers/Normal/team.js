const mongoose = require('mongoose');
const User = require('../../models/user');
const League = require('../../models/league');
const Team = require('../../models/team');
const toImgUrl = require('../../utils/index');

// get all Teams 

exports.get_all_teams = async (req, res, next) => {
    try {

        let getAllTeams = await Team.find({ league: req.params.leagueId }).populate('league').sort({ creationDate: -1 });
        console.log(getAllTeams);
        return res.status(200).json(getAllTeams);


    }
    catch (err) {
        next(err);
    }
};

// update team 

exports.get_single_team = async (req, res, next) => {
    try {
        let teamId = req.params.teamId;
        let getSingleTeam = await Team.findById(teamId).populate('league');
        return res.status(200).json(getSingleTeam);
    }
    catch (err) {
        next(err);
    }
}