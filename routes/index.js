const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc    Login
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', { layout: 'login' })
})

// @desc    Dashboard
// @route   GET /
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const exercises = await Exercise.find({ user: req.user.id }).lean()

    res.render('dashboard', {
      name: req.user.firstName,
      exercises,
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
