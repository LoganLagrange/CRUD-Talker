const express = require(`express`);
const router = express.Router();

const userRoutes = require(`./userRoutes`)
router.use(`/api/users`,userRoutes);

const messageRoutes = require(`./messageRoutes`)
router.use(`/api/messages`,messageRoutes);


module.exports = router;