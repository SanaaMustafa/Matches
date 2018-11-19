const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const mime = require('mime');
const multer = require('multer');
const LeagueADMINController = require('../controllers/Admin/league');
const leagueNORMALController = require('../controllers/Normal/league');
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

router.post("/admin/league", checkAuth, upload.single('img'), LeagueADMINController.createOne);
router.put("/admin/league/:leagueId", checkAuth, upload.single('img'), LeagueADMINController.updateOne);

//Normal Reagion
router.get("/league", checkAuth, leagueNORMALController.getAll);
router.get("/league/:leagueId", checkAuth, leagueNORMALController.getAll);



module.exports = router;