import { Router } from 'express'
import authMiddleWares from '../middlewares/auth'
import UserController from '../controllers/user'
import CategoryController from '../controllers/categories'
import AuthorController from '../controllers/author'
import BookController from '../controllers/book'

const routes = new Router()

// ---------- unauthenticated ----------
routes.post("/user", (req, res) =>{
    return UserController.create(req, res)
})
routes.post("/login", (req, res) =>{
    return UserController.login(req, res)
})

routes.post("/forgot-password", (req, res) =>{
    return UserController.forgotPassword(req, res)
})

routes.post("/reset-password", (req, res) =>{
    return UserController.resetPassword(req, res)
})

// ---------- authenticated ----------
routes.use(authMiddleWares)
routes.get("/user", UserController.get)
routes.get("/category", CategoryController.getAll)
routes.post("/author",AuthorController.create)
routes.get("/author", AuthorController.getAll)
routes.post("/book", BookController.create)
routes.get("/book", BookController.findAll)

export default routes;