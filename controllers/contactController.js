const asyncHandler = require('express-async-handler'); 
// handle all exceptions and send to errorHandler middleware (no need to write try catch block)
const Contact = require('../models/contactModel.js');

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getAllContacts = asyncHandler(async (req, res) => {
    const allContacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(allContacts);
})

//@desc Get contact by id
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User is not authorized to access that contact")
    }
    else{
        res.status(200).json(contact);
    }
})

//@desc Create contact 
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body;
    if(!req.body.name || !req.body.email || !req.body.phone) {
        res.status(400);
        throw new Error("All fields are required");
    }
    else {
        const newContact = await Contact.create({user_id: req.user.id, ...req.body})
        res.status(201).json(newContact);
    }
})

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User is not authorized to update that contact")
    }
    const upContact = await Contact.findByIdAndUpdate(req.params.id, {...req.body})
    res.status(200).json(await Contact.findById(req.params.id));
})

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User is not authorized to delete that contact")
    }
    const delContact = await Contact.findByIdAndDelete(req.params.id);
    res.status(204).json(delContact);
})

// @desc Delete all contacts
// @route DELETE /api/contacts/
// @access private
const deleteAllContacts = asyncHandler(async (req, res) => {
    await Contact.deleteMany({user_id : req.user.id});
    res.status(204).send();
});

// @desc Seacrch contacts by query
// @route GET /api/contacts/:q
// @access private
const getContactsByQuery = asyncHandler(async (req, res) => {
    const queryString = req.params.query;

    const searchResults = await Contact.find({
        $and: [
            {
                $or: [
                    { name: { $regex: queryString, $options: 'i' } },
                    { email: { $regex: queryString, $options: 'i' } },
                    { phone: { $regex: queryString, $options: 'i' } },
                ],
            },
            { user_id: req.user.id },
        ],
    });

    if (searchResults.length === 0) {
        res.status(404);
        throw new Error(`No results for "${queryString}"`);
    } else {
        res.status(200).json(searchResults);
    }
});



module.exports = {getAllContacts, getContact, createContact, updateContact, deleteContact, deleteAllContacts, getContactsByQuery};