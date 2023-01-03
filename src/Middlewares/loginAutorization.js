import  jwt  from "jsonwebtoken";

const tokenLogin = (req, res, next) => {
    try{
        const token = req.headers.authorization
        console.log(token)
        next()
    }catch(err) {
        return res.status(500).send({msg: err.msg})
    }
}

export default tokenLogin