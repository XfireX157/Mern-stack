import  jwt  from "jsonwebtoken";
import { findId } from "../Services/userService.js";

const tokenLogin = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.SECRET_JWT, async (err, decode) => {
            if(err) {
                return res.status(401).send({message: 'Token Invalid'})
            }
            
            const user = await findId(decode.id)

            if(!user || !user._id) return res.status(401).send({message: "Invalid Token!"})
            
            req.userId = user._id
            next()
        })
    
    }catch(err) {
        return res.status(500).send({msg: err.msg})
    }
}

export default tokenLogin