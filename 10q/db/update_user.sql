UPDATE users SET 
    username = $1,
    img = $2
WHERE uid = $3
RETURNING *;
