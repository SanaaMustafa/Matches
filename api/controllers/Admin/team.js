const mongoose = require('mongoose');
const User = require('../../models/user');
const League = require('../../models/league');
const Team = require('../../models/team');
const toImgUrl = require('../../utils/index');

// create Team by Admin

exports.create_team = async (req, res, next) => {
    try {

        if (req.userData.type != "ADMIN")
            return res.status(403).json({ message: "you are not ADMIN" });

        let leagueId = req.params.leagueId;

        if (!req.file)
            return res.status(422).json({ message: 'image is required' });

        req.body.img = await toImgUrl.toImgUrl(req.file);
        req.body.league = leagueId;
        let teamDetail = await Team.create(req.body);
        return res.status(201).json(teamDetail);

    }
    catch (err) {
        next(err);
    }
};

// update team 

exports.update_team = async (req, res, next) => {

    if (req.userData.type != 'ADMIN')
        return res.status(403).json({ message: 'not Admin' });
    try {
        let teamId = req.params.teamId;
        let oldTeam = await Team.findById(teamId);
        if (!oldTeam) {
            return res.status(404).end();
        }
        if (req.file) {
            req.body.img = await toImgUrl.toImgUrl(req.file);
        }
        let updatedTeam = await Team.findByIdAndUpdate(teamId, req.body, { new: true });

        return res.status(200).json(updatedTeam);
    }
    catch (err) {
        next(err);
    }
}