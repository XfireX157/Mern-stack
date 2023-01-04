import { Router } from "express";
import { created, getAll, getId, searchByTitle } from '../Controllers/news.controllers.js'
import tokenLogin from "../Middlewares/loginAutorization.js";
const news = Router()

news
    .get('/newsGet', getAll)
    .get('/newsGet/:id', tokenLogin, getId)
    .post('/newsPost', tokenLogin, created)
    .get('/search', searchByTitle)

export default news