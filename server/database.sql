CREATE DATABASE todopern;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    done_yn VARCHAR(1) DEFAULT 'N',
    inst_time VARCHAR(14),
    done_time VARCHAR(14),
    updt_time VARCHAR(14)
);

ALTER TABLE todo ADD COLUMN inst_time VARCHAR(14);
ALTER TABLE todo ADD COLUMN done_time VARCHAR(14);
ALTER TABLE todo ADD COLUMN updt_time VARCHAR(14);