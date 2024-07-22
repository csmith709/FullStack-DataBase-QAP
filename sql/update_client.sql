-- update_client.sql
UPDATE Client SET first_name = $1, last_name = $2, phone_number = $3, email = $4 WHERE client_id = $5;
