const express = require('express');
const router = express.Router();

const {
  getCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita,
} = require('../controllers/cita.controller');

router.get('/', getCitas);
router.get('/:id', getCitaById);
router.post('/', createCita);
router.put('/:id', updateCita);
router.delete('/:id', deleteCita);

module.exports = router;