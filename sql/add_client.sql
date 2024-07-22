-- insert_client.sql
INSERT INTO Client (first_name, last_name, phone_number, email) VALUES ($1, $2, $3, $4);
