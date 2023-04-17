import { Router } from 'express'
import authMiddleWares from '../middlewares/auth'
import UserController from '../controllers/user'

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
routes.get("/user", (req, res) =>{
    return UserController.get(req, res)
})

export default routes;