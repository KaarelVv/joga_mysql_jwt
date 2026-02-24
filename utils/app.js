const express = require('express')
const methodOverride = require('method-override')

class App {
    constructor() {
        this.app = express()
        this.configureMiddleware()
    }

    configureMiddleware() {
        this.app.use(express.static('public'))
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(methodOverride('_method'))
    }

    registerRoutes(routers) {
        routers.forEach((router) => {
            this.app.use('/', router)
        })
    }

    listen(port, callback) {
        this.app.listen(port, callback)
    }
}

module.exports = App
