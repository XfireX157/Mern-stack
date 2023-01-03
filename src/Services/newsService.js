import { News } from '../Models/News.js'

export const create = (body) => News.create(body)
export const getAlls = () => News.find()