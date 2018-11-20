const express = require('express');
const router = express.Router();
const checkAuth = require('../middelware/check-auth');
const crypto = require('crypto');
const mime = require('mime');
const playerAdminController = require('../controllers/Admin/player');
const playerNormalController = require('../controllers/Normal/player');
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

// Admin Region

router.post('/admin/team/:teamId/player', checkAuth , upload.single('img'),playerAdminController.create_player);

router.put('/admin/team/:teamId/player/:playerId', checkAuth , upload.single('img'), playerAdminController.update_player);

// Normal Region

router.get('/team/:teamId/players' , playerNormalController.get_all_players);

router.get('/team/:teamId/player/:playerId' , playerNormalController.get_single_player);

module.exports = router;
