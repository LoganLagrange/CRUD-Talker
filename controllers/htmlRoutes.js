const express = require('express');
const router = express.Router();
const { Conversation, Message, User, Friend } = require("../models");

router.get("/",  (req,res)=>{
    if(!req.session.user) {
        console.log(req.session.user)
        const imageUrl = `../img/logo.png`
        res.render("landing_page", {imageUrl});
    } else {
        res.render("chat_room_page");
    }
})

router.get("/login",(req,res)=>{
    res.render("login_page")
})

router.get('/conversations',(req,res)=>{
    res.render("chat_room_page")
})

router.get('/registration',(req,res)=>{
    res.render("registration_page")
})

module.exports = router;
