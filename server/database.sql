CREATE DATABASE todopern;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    done_yn VARCHAR(1) DEFAULT 'N'
);