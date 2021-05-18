const express = require('express');
const {
    allSheltersGet,
    createShelterPost,
    addPetPut,
    shelterByIdGet,
    deleteShelterByIdPost,
} = require('../controllers/shelters.controller');

const router = express.Router();
// PUT http://localhost:3000/pepito <-- --> /add-pet

router.get('/', allSheltersGet);

router.post('/create', createShelterPost);

router.put('/add-pet', addPetPut);

router.get('/:id', shelterByIdGet);
router.post('/:id', deleteShelterByIdPost);

module.exports = router;