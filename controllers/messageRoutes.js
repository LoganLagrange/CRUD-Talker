const express = require('express');
const router = express.Router();
const { Message, User } = require('../models'); // Imports the Message model

// GET all messages
router.get(`/`,(req,res) => {
    Message.findAll().then(dbMessage => {
        res.json(dbMessage);
    }).catch(err => {
        res.status(500).json({msg:`Server Error!`, err});
    })
})

// GET one message
router.get(`/:id`,(req,res) => {
    Message.findByPk(req.params.id,{
        include:[User]
    }).then(dbMessage => {
       if(!dbMessage) {
        return res.status(404).json(`No message exists!`)
       }
       res.json(dbMessage)
    }).catch(err => {
        res.status(500).json({msg:`Server Error!`, err});
        console.log(err);
    })
})

// CREATE new message
router.post(`/`,(req,res) => {
    Message.create({
        content:req.body.content,
        userId:req.session.user.id,
        conversationId:req.body.conversation_id
    }).then(dbMessages => {
        res.json(dbMessages)
    }).catch(err => {
        res.status(500).json({msg:`Server error!`,err});
    })
});

module.exports = router;