const selectCustomersQuery = (cpf, offset, limit, order, desc) => {
    const isOffSet = offset ? `OFFSET ${offset}` : ''
    const isLimit = limit ? `LIMIT ${limit}` : ''
    const isCPF = cpf ? `WHERE cpf LIKE '${cpf}%'` : ''
    const isOrder = order ? `ORDER BY "${order}"` : ''
    const isDesc = desc === 'true' ? 'DESC' : ''

    return  `
        SELECT c.*, c.birthday::VARCHAR, COUNT(r."customerId")::float AS "rentalsCount"
        FROM customers c
        LEFT JOIN rentals r ON r."customerId" = c.id
        ${isCPF}
        GROUP BY c.id
        ${isOrder} ${isDesc}
        ${isOffSet} ${isLimit}
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