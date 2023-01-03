import { create, findId, findall, update, loginFind, generateToken } from "../Services/userService.js"
import bcrypt from 'bcrypt'

export const userGetAll = async (__, res) => {
    try {
        const users = await findall()

        if (users.length === 0) {
            return res.status(400).send({ msg: "Error not found registered users" })
        }
        return res.status(200).send(users)
    }
    catch (err) {
        res.status(500).send({ msg: err.msg })
    }
}

export const userGetID = async (req, res) => {
    try {
        const id = req.params.id
        const user = await findId(id)

        if (!user) {
            return res.status(400).send({ msg: "Erro bad request" })
        }
        return res.status(200).send(user)
    }
    catch (err) {
        res.status(500).send({ msg: err.msg })
    }
}

export const userPost = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) return res.status(400).send({ msg: 'Submit all' })
        const user = await create(req.body)
        
        if (!user) {
            return res.status(400).send({ msg: "Error creating User" })
        }

        return res.status(201).send({
            msg: "User created sucess",
            sucess: {
                users: user._id,
                name,
                email,
                password
            }
        })
    }
    catch (err) {
        res.status(500).send({ msg: err.msg })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await loginFind(email)
        if(!user) return res.status(404).json({msg: "Not found"}) 

        const passwordIsValid = await bcrypt.compare(password, user.password)
        if(!passwordIsValid)  return res.status(404).json({msg: "Not found"})

        const token = generateToken(user.id, user.email)
        return res.status(200).json({userValid: passwordIsValid, token: token})


    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const userPatch = async (req, res) => {
    try { 
        const { name, email, password } = req.body
        const { id } = req.params

        await update(
            id,
            name,
            email,
            password
        )
        res.send({ msg: 'user sucess upadte!', sucess: name, email, password })
    }
    catch (err) {
        res.status(500).send({ msg: err.msg })
    }
}