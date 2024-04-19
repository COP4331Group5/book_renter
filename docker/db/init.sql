CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION generate_uid() RETURNS TEXT AS $$
DECLARE
  size INT := 22;
  characters TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  bytes BYTEA := gen_random_bytes(size);
  l INT := length(characters);
  i INT := 0;
  output TEXT := '';
BEGIN
  WHILE i < size LOOP
    output := output || substr(characters, get_byte(bytes, i) % l + 1, 1);
    i := i + 1;
  END LOOP;
  RETURN output;
END;
$$ LANGUAGE plpgsql VOLATILE;

CREATE TYPE pdf_status_value AS ENUM ('processing', 'completed', 'failed');

-- This is where statements for initializing the database go.
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(128) NOT NULL,
  author VARCHAR(128) NOT NULL,
  pdf_status pdf_status_value NOT NULL,
  blob_name TEXT NOT NULL,
  num_pages INT NOT NULL
);

CREATE TABLE pages (
  id SERIAL PRIMARY KEY,
  book_id INT NOT NULL,
  page_num INT NOT NULL,
  slice_count INT NOT NULL
);

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  book_id INT NOT NULL,
  page_num INT NOT NULL,
  slice_num INT NOT NULL,
  blob_name TEXT NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  is_admin BOOLEAN NOT NULL,
  email VARCHAR(254) UNIQUE,
  display VARCHAR(80),
  passhash VARCHAR(100)
);

CREATE TABLE rentals (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  book_id INT NOT NULL,
  rental_length INT NOT NULL,
  created TIMESTAMP DEFAULT NOW(),
  expry TIMESTAMP GENERATED ALWAYS AS (created + (rental_length * INTERVAL '1 month')) STORED
);

CREATE TABLE sessions (
  id VARCHAR(22) PRIMARY KEY DEFAULT generate_uid(),
  user_id INT NOT NULL,
  created TIMESTAMP DEFAULT NOW()
);
