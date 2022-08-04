const selectGamesQuery = (name, offset, limit, order, desc) => {
    const isOffSet = offset ? `OFFSET ${offset}` : ''
    const isLimit = limit ? `LIMIT ${limit}` : ''
    const isName = name ? `WHERE LOWER(g.name) LIKE '${name.toLowerCase()}%'` : ''
    const isOrder = order ? `ORDER BY "${order}"` : ''
    const isDesc = desc === 'true' ? 'DESC' : ''

    return `
        SELECT g.*, c.name as "categoryName", COUNT(r."gameId")::float as "rentalsCount"
        FROM games g
        LEFT JOIN rentals r ON r."gameId" = g.id
        JOIN categories c ON c.id = g."categoryId"
        ${isName}
        GROUP BY g.id, c.name
        ${isOrder} ${isDesc}
        ${isOffSet} ${isLimit}
    `
}

const insertGameQuery = `
    INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
    VALUES($1, $2, $3, $4, $5)
`

export { selectGamesQuery, insertGameQuery }