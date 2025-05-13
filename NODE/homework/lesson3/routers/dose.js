import express from 'express'

import {
    create,
    getAll,
    getById,
    remove
} from '../controllers/dose.js'

const router = express.Router()

router.get('', getAll)
router.get('/:id', getById)
router.post('', create)
router.delete('/:id', remove)

export default router