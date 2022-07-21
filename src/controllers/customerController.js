import connection from "../database/db.js"

async function getCustomers(req, res) {
    const { cpf } = req.query

    try {
        const { rows: customers } = await connection.query(
            cpf ? 
                `
                    SELECT id, name, phone, cpf, birthday::VARCHAR 
                    FROM customers
                    WHERE cpf LIKE $1
                ` : 
                `
                    SELECT id, name, phone, cpf, birthday::VARCHAR 
                    FROM customers
                `
            , cpf ? [`${cpf}%`] : ''
        )

        res.status(200).send(customers)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function getCustomer(req, res) {
    const { customerId } = req.params

    try {
        const { rows: customerFounded } = await connection.query(`
            SELECT id, name, phone, cpf, birthday::VARCHAR 
            FROM customers WHERE id = $1
        `, [customerId])

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
        await connection.query(`
            INSERT INTO customers (name, phone, cpf, birthday) 
            VALUES($1, $2, $3, $4)`
        , [name, phone, cpf, birthday])

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
        await connection.query(`
            UPDATE customers 
            SET name = $1, phone = $2, cpf = $3, birthday = $4
            WHERE id = $5
            `
        , [name, phone, cpf, birthday, customerId])

        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { getCustomers, getCustomer, createCustomer, updateCustomer }