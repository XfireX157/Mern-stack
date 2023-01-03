import { create, getAlls } from "../Services/newsService.js"

export const getAll = async (__, res) => {
    try{
        const news = await getAlls()

        if (news.length === 0) {
            return res.status(400).send({ msg: "Error not found registered news" })
        }
        return res.status(200).json({ sucess: news })
    }catch(err) {
        return res.status(500).send({msg: err.msg})
    }
}

export const created = async (req, res) => {
    try {
        const { img, title, description, price } = req.body
        const news = await create({
            img,
            title,
            description,
            price,
            user: { _id: "63b48019a138c9ad755ad4ae" }
        })

        if (!news) {
            return res.status(400).send({ msg: "Error creating User" })
        }

        return res.status(201).json({
            msg: 'news created sucess'
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}