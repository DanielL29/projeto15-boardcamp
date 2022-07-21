import { Router } from 'express'
import { createCustomer, getCustomer, getCustomers, updateCustomer } from '../controllers/customerController.js'
import validateCustomerSchema from '../validations/customerSchema.js'

const router = Router()

router.get('/customers', getCustomers)
router.get('/customers/:customerId', getCustomer)
router.post('/customers', validateCustomerSchema, createCustomer)
router.put('/customers/:customerId', validateCustomerSchema, updateCustomer)

export default router