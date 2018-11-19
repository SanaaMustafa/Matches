const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const mime = require('mime');
const checkAuth = require('../middelware/check-auth');
const AdminTeamController = require('../controllers/Admin/team');
const NormalTeamController = require('../controllers/Normal/team')
const multer = require('multer');
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

router.post('/admin/league/:leagueId/team', checkAuth, upload.single('img') , AdminTeamController.create_team);

router.put('/admin/league/:leagueId/team/:teamId' , checkAuth , upload.single('img'), AdminTeamController.update_team);

router.get('/league/:leagueId/teams',NormalTeamController.get_all_teams );

router.get('/league/:leagueId/team/:teamId', NormalTeamController.get_single_team);
module.exports = router;