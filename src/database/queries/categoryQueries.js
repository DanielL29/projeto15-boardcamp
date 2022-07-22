const selectCategoryQuery = (offset, limit, order, desc) => {
    const isOffSet = offset ? `OFFSET ${offset}` : ''
    const isLimit = limit ? `LIMIT ${limit}` : ''
    const isOrder = order ? `ORDER BY "${order}"` : ''
    const isDesc = desc === 'true' ? 'DESC' : ''

    return `
        SELECT * 
        FROM categories 
        ${isOrder} ${isDesc}
        ${isOffSet} ${isLimit}
    `
}

const insertCategoryQuery = `
    INSERT INTO categories 
    (name) 
    VALUES ($1)
`

export { selectCategoryQuery, insertCategoryQuery }