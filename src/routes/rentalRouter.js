import { Router } from 'express'
import { createRental, deleteRental, finalizeRental, getBilling, getRentals } from '../controllers/rentalController.js'
import shouldDeleteRental from '../middlewares/shouldDeleteRental.js'
import shouldFinalizeRental from '../middlewares/shouldFinalizeRental.js'
import validateRentalSchema from '../middlewares/validations/validateRentalSchema.js'

const router = Router()

router.get('/rentals', getRentals)
router.post('/rentals', validateRentalSchema, createRental)
router.post('/rentals/:rentalId/return', shouldFinalizeRental, finalizeRental)
router.delete('/rentals/:rentalId', shouldDeleteRental, deleteRental)
router.get('/rentals/metrics', getBilling)

export default router