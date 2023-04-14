import * as dotenv from 'dotenv' 
dotenv.config()
import db from './src/models'
import express from 'express'
import routes from './src/routes'
const app = express()
app.use(express.json())
app.use(routes)

app.post("/", (req, res) =>{
    return UserController.create(req, res)
})

app.post("/login", (req, res) =>{
    return UserController.login(req, res)
})


app.listen(3333, async () => {
    try {
        await db.sequelize.authenticate()
        console.log("App running and db connected")
    } catch (error) {
        console.log("Error running app: ", error)
    }
})