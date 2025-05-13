import express from 'express'
import {
    getAll,
    create,
    getById,
    update,
} from '../controllers/category.js'

const router = express.Router()
router.get('', getAll)
router.get('/:id', getById)
router.post('', create)
router.patch('/:id', update)

export default router