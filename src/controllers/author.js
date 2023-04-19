import auth from '../middlewares/auth'
import { Author } from '../models'
import * as Yup from 'yup'

class AuthorConttoller{
    async create(req, res){
        try {
            const shema = Yup.object().shape({
                name: Yup.string().required("Nome é obrigatório").min(3, "Nome deve conter mais de 3 caracteres"),
                avatar_url: Yup.string().url('Avatar url deve ser no formato URL')
            })

            await shema.validate(req.body)

            const createdAuthor = await new Author({
                ...req.body,
            })

            await createdAuthor.save()

            return res.json({ createdAuthor })
        } catch (error) {
            return res.status(400).json({ error: error?.message})
            
        }
    }

    async getAll(req, res){
        try {
            const authors = await Author.findAll({
                order: [["name", "ASC"]]
            })
            return res.json(authors)
        } catch (error) {
            return res.status(400).json({ error: error?.message})
        }
    }
}

export default new AuthorConttoller()