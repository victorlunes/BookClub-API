import {User} from '../models'
import * as Yup from 'yup'
import jwt, { sign } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class UserController {
    async login(req, res){
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email("Email invalido").required("Email é obigatório"),
                password: Yup.string().required("Senha é obigatório")
            })

            await schema.validate(req.body)

            const user = await User.findOne({ where: { email: req.body.email}})

            if(!user){
                return res.status(401).json({ error: "E-mail ou senha não conferem"})
            }

            const checkPassword = await bcrypt.compare(req.body.password, user.password_hash)

            if(!checkPassword){
                return res.status(401).json({ error: "E-mail ou senha não conferem"})
            }

            console.log({ hash: process.env.JWT_HASH})

            const token = jwt.sign({id: user.id}, process.env.JWT_HASH, {
                expiresIn: "30d"
            })

            const { id, name, email, avatar_url, createdAt } = user
            return res.json({
                id,
                name, 
                email, 
                avatar_url, 
                createdAt,
                token,
            })
        } catch (error) {
            return res.status(400).json({ error: error?.message})
        }
    }

    async create(req, res){
       try {
        const schema = Yup.object().shape({
            name: Yup.string().required("Nome é obigatório").min(3, "Nome deve conter ao menos 3 caracteres"),
            email: Yup.string().email("Email invalido").required("Email é obigatório"),
            password: Yup.string().required("Senha é obigatório").min(6, "senha deve conter ao menos 6 caracteres")
        })

        await schema.validate(req.body)

        const existedUser = await User.findOne({ where: { email: req.body.email }})

        if(existedUser) {
            return res.status(400).json({ error : "Usuario já existe" })
        }

        const hashPassword = await bcrypt.hash(req.body.password, 8)

        const user = new User({
            ...req.body,
            password: "",
            password_hash: hashPassword,
        })

        await user.save()

        return res.json({ user })
        
       } catch (error) {
        console.log({ error })
        return res.status(400).json({ error: error?.message})
       }
    }

    async get(req, res) {
        try {
            if(!req.userId){
                return res.status(400).json({ error: "Id não fornecido"})
            }
    
            const user = await User.findOne({ where: {id: Number(req.userId)}})
    
            if(!user){
                return res.status(404).json({ error: "Usuario não encontrado"})
            }
    
            return res.json(user)
        } catch (error) {
            return res.status(400).json({error: error?.message})
        }
    }
}

export default new UserController()