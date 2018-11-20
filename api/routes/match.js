const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const mime = require('mime');
const multer = require('multer');
const MatchADMINController = require('../controllers/Admin/match');
const MatchNORMALController = require('../controllers/Normal/match');
const checkAuth = require('../middelware/check-auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
        });//
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    //fileFilter: fileFilter
});

//ADMIN region

router.post("/admin/league/:leagueId/match", checkAuth, upload.single('img'), MatchADMINController.createOne);
router.put("/admin/league/:leagueId//match/:matchId", checkAuth, upload.single('img'), MatchADMINController.updateOne);

//Normal Reagion
router.get("/league/:leagueId/matches", checkAuth, MatchNORMALController.getAll);
router.get("/league/:leagueId/match/:matchId", checkAuth, MatchNORMALController.getAll);



module.exports = router;