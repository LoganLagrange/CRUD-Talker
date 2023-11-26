const router = require('express').Router();
const { User } = require('../models'); // Imports the User model

// GET all users for homepage
router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      // any additional queries options go here
    });

    const users = dbUserData.map((user) =>
      user.get({ plain: true })
    );
    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('homepage', {
      users,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one user by ID
router.get('/user/:id', async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id);
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    const user = dbUserData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'user' template   TODO MAKE SURE THE USER TEMPLATE HAS A loggedIn variable
    res.render('user', { user, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST route for user login
router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        where: {
          username: req.body.username, // username is used for login is ASSUMED
      }});
  
      if (!dbUserData) {
        res.status(400).json({ message: 'Incorrect username or password!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password); // TODO MAKE SURE WE HAVE  CHECKPASSWORD METHOD IN USER MODEL
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect username or password!' });
        return;
      }
  
      // Express-Session for handling sessions
      req.session.save(() => {
        req.session.userId = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // POST route for user logout
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;