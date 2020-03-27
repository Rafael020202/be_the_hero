const express = require('express');
const OngController = require('./controller/OngController');
const IncidentController = require('./controller/IncidentController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');


const router = express.Router();

//ongs
router.post('/ongs', OngController.Create);
router.get('/ongs', OngController.Show);

//profile
router.get('/profile', ProfileController.index);

//incidents
router.get('/incident', IncidentController.index);
router.post('/incident', IncidentController.create);
router.delete('/incident/:id', IncidentController.delete);

//session
router.post('/session', SessionController.create);

module.exports = router;
