const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/', videoController.getAllVideos);

router.get('/:id', videoController.getVideo);

<<<<<<< HEAD
router.delete('/', videoController.deleteVideo);

router.delete('/:id', videoController.deleteVideo);

router.post('/', videoController.addVideo);

=======
>>>>>>> 8da15362de3b5fefc9861ad0e5a7f814bddf5625
module.exports = router;



