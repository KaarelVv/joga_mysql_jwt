const express = require('express')
const { requireAuth, requireRole } = require('../utils/auth')

class ArticlesRoutes {
    constructor(articlesController) {
        this.router = express.Router()
        this.articlesController = articlesController
        this.registerRoutes()
        this.requireAuth = requireAuth
        this.requireRole = requireRole
    }

    registerRoutes() {
        this.router.get('/', (req, res) => {
            res.status(200).json({ message: 'OK' })
        })

        this.router.get('/articles', this.articlesController.getAllArticles.bind(this.articlesController))

        this.router.get('/article/:slug', requireAuth, requireRole('user'), this.articlesController.getArticleBySlug.bind(this.articlesController))

        this.router.post('/article/create', requireAuth, requireRole('admin'), this.articlesController.createNewArticle.bind(this.articlesController))

        this.router.put('/article/:slug/edit', requireAuth, requireRole('admin'), this.articlesController.updateArticle.bind(this.articlesController))

        this.router.delete('/article/:slug/delete', requireAuth, requireRole('admin'), this.articlesController.deleteArticle.bind(this.articlesController))
    }
}

module.exports = ArticlesRoutes
