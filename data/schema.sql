DROP TABLE if exists users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    score_number INT
);

DROP TABLE if exists quotes;

CREATE TABLE quotes (
    id SERIAL PRIMARY KEY,
    quotes VARCHAR(500),
    note VARCHAR(500)
);