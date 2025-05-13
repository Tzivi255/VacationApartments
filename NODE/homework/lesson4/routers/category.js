import express from 'express'

import {
    getAll,
    create,
    remove,
    update,
    getByCategory

} from '../controllers/category.js'

const router = express.Router()

router.get('', getAll)
router.get('/:id', getByCategory)
router.post('', create)
router.delete('/:id', remove)
router.patch('/:id', update)


export default router