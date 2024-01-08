
const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideo);
router.delete('/', videoController.deleteVideo);
router.delete('/:id', videoController.deleteVideo);
router.post('/', videoController.addVideo);

module.exports = router;

