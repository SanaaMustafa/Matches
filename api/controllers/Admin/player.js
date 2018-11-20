const mongoose = require('mongoose');
const User = require('../../models/user');
const Player = require('../../models/player');
const Team = require('../../models/team');
const toImgUrl = require('../../utils/index');

// Create player By Admin

exports.create_player = async (req, res, next) => {

    if (!req.userData.type === "ADMIN") {
        return res.status(403).json({
            message: "You Are Not Admin"
        });
    }

    try {
        let teamId = req.params.teamId;

        if (!req.file) {
            return res.status(422).json({ message: 'image is required' });
        }
        req.body.team = teamId;
        req.body.img = await toImgUrl.toImgUrl(req.file);
        let playerDetail = await Player.create(req.body);
        return res.status(201).json(playerDetail);
    }
    catch (err) {
        next(err);
    }
};

// update player by Admin

exports.update_player = async (req, res, next) => {
    if (req.userData.type != "ADMIN") {
        return res.status(403).json({
            message: "You Are Not Admin"
        });
    }
    try {
        let playerId = req.params.playerId;
        let oldPlayer = await Player.findById(playerId);
        if (!oldPlayer) {
            return res.status(404).end();
        }
        if (req.file) {
            req.body.img = await toImgUrl.toImgUrl(req.file);
        }
        let updatedPlayer = await Player.findByIdAndUpdate(playerId, req.body, { new: true });
        return res.status(200).json(updatedPlayer);
    }
    catch (err) {
        next(err);
    }
}