const express = require('express');
const { getAllContacts, getContact, createContact, updateContact, deleteContact, deleteAllContacts, getContactsByQuery } = require('../controllers/contactController');
const verifyJWT = require('../middleware/verifyJWT');
const router = express.Router();

router.use(verifyJWT);
router.route('/').get(getAllContacts).post(createContact).delete(deleteAllContacts);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);
router.route('/search/:query').get(getContactsByQuery);

module.exports = router;