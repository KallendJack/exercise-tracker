const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Exercise = require('../models/Exercise')

// @desc    Show add page
// @route   GET /exercises/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('exercises/add')
})

// @desc    Show everyones exercises
// @route   GET /exercises
router.get('/', ensureAuth, async (req, res) => {
  try {
    const exercises = await Exercise.find({})
      .populate('user')
      .sort({ date: 'desc' })
      .lean()

    res.render('exercises', {
      exercises,
    })
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
})

// @desc    Process add form
// @route   POST /exercises
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Exercise.create(req.body)
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router
