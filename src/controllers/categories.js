import { Category } from '../models'

class CategoryController {
    async getAll(req, res){
        try {
            const categories = await Category.findAll({
                order: [["name", "ASC"]]
            })
            return res.json(categories)
        } catch (error) {
            return res.status(400).json({ error: error?.message})
        }
    }
}

export default new CategoryController()