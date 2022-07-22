const selectGamesQuery = (name, offset, limit, order, desc) => {
    const isOffSet = offset ? `OFFSET ${offset}` : ''
    const isLimit = limit ? `LIMIT ${limit}` : ''
    const isName = name ? `AND LOWER(g.name) LIKE '${name.toLowerCase()}%'` : ''
    const isOrder = order ? `ORDER BY "${order}"` : ''
    const isDesc = desc === 'true' ? 'DESC' : ''

    return `
        SELECT g.*, c.name as "categoryName" 
        FROM games g, categories c 
        WHERE c.id = g."categoryId"
        ${isName}
        ${isOrder} ${isDesc}
        ${isOffSet} ${isLimit}
    `
}

const insertGameQuery = `
    INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
    VALUES($1, $2, $3, $4, $5)
`

export { selectGamesQuery, insertGameQuery }