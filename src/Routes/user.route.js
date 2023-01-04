import express from 'express'
import { validID, validUser, validInputs } from '../Middlewares/global.middlewares.js'
import { userGetAll, userPost, userGetID, userPatch, login } from '../Controllers/user.controller.js'

const user = express.Router()

user
    .get('/userGet' ,userGetAll)
    .get('/userGet/:id' ,validID, validUser , userGetID)
    .post('/userPost', validInputs, userPost)
    .post('/login', login)
    .patch('/userPatch/:id', validInputs ,validID, validUser ,userPatch)

export default user