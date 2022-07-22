const selectGamesQuery = name => 
    name ? 
    `
        SELECT g.*, c.name as categoryName 
        FROM games g, categories c 
        WHERE c.id = g."categoryId" AND LOWER(g.name)
        LIKE LOWER($1)
    ` : 
    `
        SELECT g.*, c.name as categoryName 
        FROM games g, categories c
        WHERE c.id = g."categoryId"
    `

const insertGameQuery = `
    INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
    VALUES($1, $2, $3, $4, $5)
`

export { selectGamesQuery, insertGameQuery }