import { Router } from "express"
import { getCategories, createCategory } from "../controllers/categoryController.js"
import validateCategorySchema from "../middlewares/validations/validateCategorySchema.js"

const router = Router()

router.get('/categories', getCategories)
router.post('/categories', validateCategorySchema, createCategory)

export default router