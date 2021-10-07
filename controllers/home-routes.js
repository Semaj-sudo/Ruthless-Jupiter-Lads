const router = require('express').Router();
const Player = require('../models/player');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('welcome');
  });

router.get('/game', async (req, res) => {
  res.render('game');
  });

router.get('/login', async (req, res) => {
 res.render('login');
  });  
  
router.get('/register', async (req, res) => {
 res.render('register');
  });  

  
router.get('/', withAuth, async (req, res) => {
  try {
   const userData = await Player.findAll({
    attributes: { exclude: ['password'] },
    order: [['username', 'score']],
   });

   const users = userData.map((project) => project.get({ plain: true }));

  res.render('highscore', {
    users,
    // Pass the logged in flag to the template
    logged_in: req.session.logged_in,
  });
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
  res.redirect('/');
  return;
  }

  res.render('login');
 });

 module.exports = router;
