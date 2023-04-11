import db from './src/models'
import express from 'express'
import UserController from './src/controllers/user'
const app = express()

app.post("/", (req, res) =>{
    return UserController.create(req, res)
})

app.listen(3333, async () => {
    try {
        await db.sequelize.authenticate()
        console.log("App running and db connected")
    } catch (error) {
        console.log("Error running app: ", error)
    }
})