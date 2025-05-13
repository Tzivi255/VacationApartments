import express from 'express'

import {
    create,
    getAll,
    getById,
    remove,
    update
} from '../controllers/dose.js'

const router = express.Router()

router.get('', getAll)
router.get('/:id', getById)
router.post('', create)
router.delete('/:id', remove)
router.patch('/:id', update)

export default router