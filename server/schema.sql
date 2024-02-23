-- @block
CREATE TABLE characters (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    UNIQUE (name)
);

-- @block
CREATE TABLE connections (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    char_id_1 INT NOT NULL,
    char_id_2 INT NOT NULL,
    FOREIGN KEY(char_id_1) REFERENCES characters(id),
    FOREIGN KEY(char_id_2) REFERENCES characters(id)
);

-- @block
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(255) NOT NULL,
    hash VARCHAR(255) NOT NULL,
    is_admin BIT NOT NULL DEFAULT 0,
    UNIQUE (username)
);
