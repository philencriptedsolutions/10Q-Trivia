INSERT INTO users (first_name, last_name, email, username, img, balance)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;