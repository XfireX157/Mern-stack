import  {User} from "../Models/User.js"
import jwt from "jsonwebtoken"

export const create = (body) => User.create(body)
export const findall = () => User.find()
export const findId = (id) => User.findById(id)
export const loginFind = (email) => User.findOne({email: email}).select("+password")
export const generateToken = (id, email) => jwt.sign({id: id, email: email}, process.env.SECRET_JWT, {expiresIn: 86400})
export const update = (
    id,
    name,
    email,
    password) => User.findOneAndUpdate({ _id: id }, {name, email, password})