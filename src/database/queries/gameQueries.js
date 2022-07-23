const selectGamesQuery = (name, offset, limit, order, desc) => {
    const isOffSet = offset ? `OFFSET ${offset}` : ''
    const isLimit = limit ? `LIMIT ${limit}` : ''
    const isName = name ? `AND LOWER(g.name) LIKE '${name.toLowerCase()}%'` : ''
    const isOrder = order ? `ORDER BY "${order}"` : ''
    const isDesc = desc === 'true' ? 'DESC' : ''

    return `
        SELECT g.*, c.name as "categoryName", 
            COUNT(CASE WHEN r."gameId" = g.id THEN g.id END)::float as "rentalsCount"
        FROM games g, categories c, rentals r
        WHERE c.id = g."categoryId"
        ${isName}
        ${isOrder} ${isDesc}
        ${isOffSet} ${isLimit}
        GROUP BY g.id, c.name
    `
}

const insertGameQuery = `
    INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
    VALUES($1, $2, $3, $4, $5)
`

export { selectGamesQuery, insertGameQuery }