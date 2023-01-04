import mongoose from 'mongoose'
import {findId} from '../Services/userService.js'

export const validInputs = (req, res, next) => {
    const { name, email, password } = req.body
    if (!name && !email && !password) return res.status(400).send({ msg: 'Submit all' })
    next()
}

export const validID = (req, res, next) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ msg: 'Invalid Id' })
    next()
}

export const validUser = (req, res, next) => {
    const { id } = req.params
    const user = findId(id)
    if (!user) return res.status(400).send({ msg: 'user not found' })
    next()
}