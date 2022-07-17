/*
    * Path *
    /api/messages/
*/

const { Router } = require('express');
const { getMessagesFrom } = require('../controllers/messages');
const validateJWT = require('../middlewares/validate_jwt');

const router = Router();

router.get('/:from', validateJWT, getMessagesFrom);

// Exporting the router
module.exports = router;
