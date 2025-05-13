import express from 'express'
import { checkAuth, UniqueEmail } from '../../../middlewares.js'
import{
    create,
    getAll,
    getById,
    login,
    resetPassword,
    updatePass
} from '../controllers/advertiser.js'

const router = express.Router()

router.get('', getAll)
router.get('/getById/:id', getById)
router.post('',UniqueEmail,create)
router.patch('/updatePass',checkAuth,updatePass)
router.post('/login', login)
router.get('/resetPassword/:advertiserEmail',resetPassword)

export default router