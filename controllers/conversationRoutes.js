const express = require('express');
const router = express.Router();
const { Message, Conversation, User } = require('../models'); // Imports the Message and Conversation model
const userAuth = require(`../middleware/userAuth`); //Imports user authentication middlewear

// GET all conversations
router.get(`/`,(req,res) => {
    Conversation.findAll().then(dbConversation => {
        res.json(dbConversation);
    }).catch(err => {
        res.status(500).json({msg:`Server Error!`, err});
    })
})

// GET all conversations user owns
router.get(`/owner/`, (req,res) => {
    Conversation.findAll({
        where: {
            ownerId: req.session.user.id
        }
    }).then(dbConversation => {
        res.json(dbConversation);
    }).catch(err => {
        res.status(500).json({msg:`Server Error!`, err});
    })
})

// GET all conversations user is in
router.get(`/isin/`, (req,res) => {
    Conversation.findAll({
        where: {
            userId: req.session.user.id
        }
    }).then(dbConversation => {
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
router.post(`/`, userAuth, (req,res) => {
    Conversation.create({
        ownerId:req.session.user.id,
        conversation_name:req.body.conversationName
    }).then(dbConversations => {
        res.json(dbConversations)
    }).catch(err => {
        res.status(500).json({msg:`Server error!`,err});
    })
});

// DELETE conversation
router.delete(`/:id`, userAuth, (req,res) => {
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