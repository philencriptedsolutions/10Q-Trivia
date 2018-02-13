INSERT INTO answered (user_id, question_id, chosen_answer) VALUES $1, $2, $3
RETURNING *;
