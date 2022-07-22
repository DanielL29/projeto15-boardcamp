const selectCustomersQuery = cpf => 
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