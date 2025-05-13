import { checkAuth, isAdvertiser } from '../../../middlewares.js'
import express from 'express'
import multer from 'multer'//להתקין "MULER"

import {
    create,
    getAll,
    update,
    remove,
    getById,
    byEqualNumBeds,
    byLessNumBeds,
    byMoreNumBeds,
    byEqualPrice,
    byLessPrice,
    byMorePrice,
    getApartmentsByAdvertiserId,
    getApartmentsByCategoryId,
    getApartmentsByCityId,
    apartmentsWithFilter,
    getAllIds
} from '../controllers/apartment.js'

const router = express.Router()

router.get('', getAll)
router.get('/ids', getAllIds)
router.get('/:id', getById)
router.post('/filter/allFilter', apartmentsWithFilter)
router.get('/filter/bed/eq/:num', byEqualNumBeds)
router.get('/filter/bed/lt/:num', byLessNumBeds)
router.get('/filter/bed/gt/:num', byMoreNumBeds)
router.get('/filter/price/eq/:num', byEqualPrice)
router.get('/filter/price/lt/:num', byLessPrice)
router.get('/filter/price/gt/:num', byMorePrice)
router.get('/byAdvertiser/:id', checkAuth, isAdvertiser, getApartmentsByAdvertiserId)

router.get('/byCategory/:id', getApartmentsByCategoryId)
router.get('/byCity/:id', getApartmentsByCityId)

const storage = multer.memoryStorage();
const upload = multer({storage: storage});
router.post('/',upload.array('images'), checkAuth, create);
router.patch('/:apartmentId',upload.array('images'), checkAuth, update);

router.patch('/:id', checkAuth, isAdvertiser, update)
router.delete('/:id/:apartmentId', checkAuth, isAdvertiser, remove)


export default router