INSERT INTO users (first_name, last_name, email, img, balance, uid)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;