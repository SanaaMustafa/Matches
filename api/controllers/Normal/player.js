const mongoose = require('mongoose');
const User = require('../../models/user');
const Player = require('../../models/player');
const Team = require('../../models/team');
const toImgUrl = require('../../utils/index');

// get All Players 

exports.get_all_players = async(req , res , next)=>{
    try{
         
        let getAllPlayers = await Player.find({ team: req.params.teamId })
            .populate('team')
            .sort({ creationDate: -1 });
            console.log(req.params.teamId);
            
        return res.status(200).json(getAllPlayers);

        

    }
    catch(err){
        next(err);
    }
};


// get single player

exports.get_single_player = async(req , res , next)=>{
    try{
        let playerId = req.params.playerId;
        let getSingleplayer = await Player.findById(playerId)
            .populate('team');

        if (!getSingleplayer)
            return res.status(404).end();
        return res.status(200).json(getSingleplayer);
    }
    catch(err){
        next(err);
    }
}