import { create, getAlls, countNews, findId, searchByTitles } from "../Services/newsService.js"

export const getAll = async (req, res) => {
    try{
        let {limit, offset} = req.query
        limit = Number(limit)
        offset = Number(offset)
        //Default de limite da paginação
        if(!limit)  limit = 5
        if(!offset)  offset = 0
      
        const news = await getAlls(offset, limit)
        const total = await countNews()
        const currentUrl = req.baseUrl
      
        const next = offset + limit
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit < 0 ? null : offset - limit
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

        if (news.length === 0) {
            return res.status(400).send({ msg: "Error not found registered news" })
        }
        return res.status(200).json({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: news.map((item) => ({
                id: item._id,
                img: item.img,
                title: item.title,
                description: item.description,
                price: item.price,
                name: item.user.name
            }))
        })
    }catch(err) {
        return res.status(500).send({msg: err.msg})
    }
}

export const getId = async (req, res) => {
    try{
        const id = req.params.id
        const news = await findId(id)

        if (!news) {
            return res.status(400).send({ msg: "Erro bad request" })
        }
        return res.status(200).json(news)
    }catch(err) {
        console.log({message: err.message})
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
            user: req.userId
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

export const searchByTitle = async (req, res) => {
    try{
        const {title} = req.query 
        const news = await searchByTitles(title)

        if(news.length === 0) {
            return res.status(400).send({message: 'There are no posts with this title'})
        }

        return res.status(200).json({results: news})

    }catch(err) {
        res.status(500).send({message: err.message})
    }
}