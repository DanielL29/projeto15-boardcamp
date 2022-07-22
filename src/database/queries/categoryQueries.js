const selectCategoryQuery = (offset, limit) => {
    const isOffSet = offset ? `OFFSET ${offset}` : ''
    const isLimit = limit ? `LIMIT ${limit}` : ''

    return `
        SELECT * 
        FROM categories 
        ${isOffSet}
        ${isLimit}
    `
}

const insertCategoryQuery = `
    INSERT INTO categories 
    (name) 
    VALUES ($1)
`

export { selectCategoryQuery, insertCategoryQuery }