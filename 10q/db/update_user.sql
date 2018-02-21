UPDATE users SET 
    first_name = $1,
    last_name = $2,
    img = $3
WHERE user_id= $4
RETURNING *;
