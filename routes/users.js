/*
    * Path *
    /api/users/
*/

const { Router } = require('express');
const { getAllUsers } = require('../controllers/users');

const validateJWT = require('../middlewares/validate_jwt');

const router = Router();

router.get('/', validateJWT, getAllUsers);

// Exporting the router
module.exports = router;
