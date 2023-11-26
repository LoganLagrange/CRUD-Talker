const express = require('express');
const router = express.Router();
const { Message, Conversation, User } = require('../models'); // Imports the Message and Conversation model

// GET all messages
router.get(`/`,(req,res) => {
    Conversation.findAll().then(dbConversation => {
        res.json(dbConversation);
    }).catch(err => {
        res.status(500).json({msg:`Server Error!`, err});
    })
})

// GET one Conversation
router.get(`/:id`,(req,res) => {
    Conversation.findByPk(req.params.id,{
        include:[User]
    }).then(dbConversation => {
       if(!dbConversation) {
        return res.status(404).json(`No Conversation exists!`)
       }
       res.json(dbConversation)
    }).catch(err => {
        res.status(500).json({msg:`Server Error!`, err});
        console.log(err);
    })
})

// CREATE new Conversation
router.post(`/`,(req,res) => {
    Conversation.create({
        userId:req.session.user.id,
        conversationName:req.body.conversationName
    }).then(dbConversations => {
        res.json(dbConversations)
    }).catch(err => {
        res.status(500).json({msg:`Server error!`,err});
    })
});

// DELETE conversation
router.delete(`/:id`,(req,res) => {
    Conversation.destroy({
        where: {
            id:req.params.id
        }
    }).then(dbConversation => {
        res.json(dbConversation)
    }).catch(err => {
        res.status(500).json({msg:`Server error!`,err})
    })
});

module.exports = router;