const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  response.status(200).json(request.user)
})

userRouter.put('/', async (request, response) => {
  const user = request.user
  const body = request.body

  const existingUser = await User.findById(user.id)
  if (existingUser.userName !== user.userName)
    return response.status(400).json({ error: 'Username already exists' }).end()

  let passwordHash = null

  if (body.password) {
    const saltRounds = 10
    passwordHash = await bcrypt.hash(body.password, saltRounds)
  }

  user.saved = user.saved.map(saved => saved.id)
  body.saved = body.saved.map(saved => saved.id)

  const newUserDetails = {
    firstName: body.firstName,
    lastName: body.lastName,
    userName: body.userName,
    email: body.email,
    age: body.age,
    contactNumber: body.contactNumber,
    passwordHash: passwordHash || user.passwordHash,
    followers: body.followers || user.followers || [],
    following: body.following || user.following || [],
    owner: body.owner || user.owner || [],
    saved: body.saved || user.saved || [],
    left: body.left || user.left || []
  }

  const updatedUser = await User.findByIdAndUpdate(user.id, newUserDetails, { new: true })
  response.status(200).json(updatedUser)
})

userRouter.put('/followers/:id', async (request, response) => {
  const user = request.user
  const deletedUserID = request.params.id
  const deletedUser = await User.findById(deletedUserID)
  deletedUser.following = deletedUser.following.filter(followingUser => followingUser.toString() !== user.id.toString())

  const updatedUser = await User.findByIdAndUpdate(deletedUserID, deletedUser, { new: true })
  response.status(200).json(updatedUser)
})

userRouter.put('/following/:id', async (request, response) => {
  const user = request.user
  const deletedUserID = request.params.id
  const deletedUser = await User.findById(deletedUserID)
  deletedUser.followers = deletedUser.followers.filter(follower => follower.toString() !== user.id.toString())

  const updatedUser = await User.findByIdAndUpdate(deletedUserID, deletedUser, { new: true })
  response.status(200).json(updatedUser)
})

userRouter.post('/following/:id', async (request, response) => {
  const user = request.user
  const userId = request.params.id

  if (user.following.find(followingUser => followingUser.toString() === userId) === undefined) {
    user.following = user.following.concat(userId)
    const updatedUser = await user.save()

    const followingUser = await User.findById(userId)
    followingUser.followers = followingUser.followers.concat(user.id)
    await followingUser.save()

    response.status(201).json(updatedUser)
  } else
    response.status(400).json({ warning: 'Already following user' }).end()
})

module.exports = userRouter