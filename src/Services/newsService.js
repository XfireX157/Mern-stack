import { News } from '../Models/News.js'

export const create = (body) => News.create(body)
export const findId = (id) => News.findById(id)
export const getAlls = (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate('user')
export const countNews = () => News.countDocuments()
export const searchByTitles = (title) => News.find({
    title: { $regex: `${title || ""}`, $options: "i" } 
}).sort({ _id: -1 }).populate('user')