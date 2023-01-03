import { Router } from "express";
import {created, getAll} from '../Controllers/news.controllers.js'
import tokenLogin from "../Middlewares/loginAutorization.js";
const news = Router()

news
    .get('/newsGet', getAll)
    .post('/newsPost', tokenLogin ,created)

export default news