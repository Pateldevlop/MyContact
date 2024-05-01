const asyncHandler = require("express-async-handler");


// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({message : "Get all Contacts"});
});


// @desc Create contacts
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
    console.log("This request body is :", req.body);
    const {name, email, mobile } = req.body;
    if(!name || !email || !mobile){
        res.status(400);
        throw new Error("All fields are mendatory");
    }
    res.status(201).json({message : "Create contacts"});
});

// @desc Create contacts
// @route GET /api/contacts/:id
// @access public
const getContactId = asyncHandler(async (req, res) => {
    res.status(200).json({message : `Get contact for ${req.params.id}`});
});

// @desc Create contacts
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({message : `Update contact for ${req.params.id}`});
});

// @desc Create contacts
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({message : `Delete contacts for ${req.params.id}`});
});

module.exports = { getContact,  createContact, getContactId, updateContact, deleteContact};