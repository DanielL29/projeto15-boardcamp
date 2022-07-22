const selectCustomersQuery = (cpf, offset, limit) => {
    const isOffSet = offset ? `OFFSET ${offset}` : ''
    const isLimit = limit ? `LIMIT ${limit}` : ''
    const isCPF = cpf ? `WHERE cpf LIKE '${cpf}%'` : ''

    return  `
        SELECT id, name, phone, cpf, birthday::VARCHAR 
        FROM customers
        ${isCPF}
        ${isOffSet}
        ${isLimit}
    `
}

const selectCustomerQuery = `
    SELECT id, name, phone, cpf, birthday::VARCHAR 
    FROM customers WHERE id = $1
`

const insertCustomerQuery = `
    INSERT INTO customers (name, phone, cpf, birthday) 
    VALUES($1, $2, $3, $4)
`

const updateCustomerQuery = `
    UPDATE customers 
    SET name = $1, phone = $2, cpf = $3, birthday = $4
    WHERE id = $5
`

export { selectCustomersQuery, selectCustomerQuery, insertCustomerQuery, updateCustomerQuery }