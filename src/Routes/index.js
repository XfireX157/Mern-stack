import express from 'express'
import user from './user.route.js' 
import news from './news.route.js'

const routes = (app) => {
    app.use(
        express.json(),
        user,
        news
    )
}

export default routes