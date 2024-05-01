const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});


// @desc Create contacts
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
    console.log("This request body is :", req.body);
    const {name, email, mobile } = req.body;
    if(!name || !email || !mobile){
        res.status(400);
        throw new Error("All fields are mendatory");
    }
    const contact = await Contact.create({
        name,
        email,
        mobile,
        user_id: req.user.id, 
    });
    res.status(201).json(contact);
});

// @desc Create contacts
// @route GET /api/contacts/:id
// @access private
const getContactId = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// @desc Create contacts
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update another user Contact.");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
});

// @desc Create contacts
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete another user Contact.");
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = { getContact,  createContact, getContactId, updateContact, deleteContact};
