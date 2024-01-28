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

-- This is where statements for initializing the database go.
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    author VARCHAR(128) NOT NULL,
    file_path TEXT NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(254) UNIQUE,
    display VARCHAR(80), 
    passhash VARCHAR(100)
);

CREATE TABLE sessions (
    id VARCHAR(22) PRIMARY KEY DEFAULT generate_uid(),
    user_id INT,
    created TIMESTAMPTZ DEFAULT clock_timestamp()
);
