const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const urlinfo_controller = require('../controllers/urlinfo.controller');

router.post('/', urlinfo_controller.urlinfo_create);
router.get('/:id', urlinfo_controller.urlinfo_get);
router.put('/:id', urlinfo_controller.urlinfo_update);
router.delete('/:id', urlinfo_controller.urlinfo_delete);
router.get('/', urlinfo_controller.ulrinfo_index);
// a simple test url to check that all of our files are communicating correctly.
router.get('/test', urlinfo_controller.test);

module.exports = router;
