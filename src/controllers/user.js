import {User} from '../models'
import * as Yup from 'yup'
import bcrypt from 'bcrypt'

class UserController {
    async create(req, res){
       try {
        const schema = Yup.object().shape({
            name: Yup.string().required("Nome é obigatório").min(3, "Nome deve conter ao menos 3 caracteres"),
            email: Yup.string().email("Email invalido").required("Email é obigatório"),
            password: Yup.string().required("Senha é obigatório").min(6, "senha deve conter ao menos 6 caracteres")
        })

        const existedUser = await User.findOne({ where: { email: req.body.email }})

        if(existedUser) {
            return res.status(400).json({ error : "Usuario já existe" })
        }

        await schema.validate(req.body)

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
}

export default new UserController()