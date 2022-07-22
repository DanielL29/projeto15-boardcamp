import connection from "../database/db.js"
import { insertCustomerQuery, selectCustomerQuery, selectCustomersQuery, updateCustomerQuery } from "../database/queries/customerQueries.js"

async function getCustomers(req, res) {
    const { cpf, offset, limit, order, desc } = req.query

    try {
        const { rows: customers } = await connection.query(selectCustomersQuery(cpf, offset, limit, order, desc))

        res.status(200).send(customers)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function getCustomer(req, res) {
    const { customerId } = req.params

    try {
        const { rows: customerFounded } = await connection.query(selectCustomerQuery, [customerId])

        if(customerFounded.length === 0) {
            return res.sendStatus(404)
        }

        res.status(200).send(customerFounded[0])
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function createCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body

    try {
        await connection.query(insertCustomerQuery, [name, phone, cpf, birthday])

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function updateCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body
    const { customerId } = req.params

    try {
        await connection.query(updateCustomerQuery, [name, phone, cpf, birthday, customerId])

        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { getCustomers, getCustomer, createCustomer, updateCustomer }