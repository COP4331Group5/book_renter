-- This is where statements for initializing the database go.
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title varchar(128),
    author varchar(128),
    file_path text
);
