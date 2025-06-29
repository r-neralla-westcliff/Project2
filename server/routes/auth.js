const express = require('express');
const passport = require('passport');
const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.login(user, err => {
      if (err) return next(err);
      return res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
});

// GET /api/auth/logout
router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax'
      });
      res.status(200).json({ message: 'Logged out' });
    });
  });
});


// GET /api/auth/user
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

module.exports = router;
