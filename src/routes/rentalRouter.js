import { Router } from 'express'
import { createRental, deleteRental, finalizeRental, getRentals } from '../controllers/rentalController.js'
import validateRentalSchema from '../validations/rentalSchema.js'

const router = Router()

router.get('/rentals', getRentals)
router.post('/rentals', validateRentalSchema, createRental)
router.post('/rentals/:rentalId/return', finalizeRental)
router.delete('/rentals/:rentalId', deleteRental)

export default router