import express from 'express'
import{
    create,
    getAll,
    getById,
    update,
} from '../controllers/city.js'

const router = express.Router()

router.get('', getAll)
router.get('/:id', getById)
router.post('', create)
router.patch('/:id', update)

export default router
