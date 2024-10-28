CREATE DATABASE porto_alegre;

USE porto_alegre;

CREATE TABLE porto_alegre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL
);

select * from tasks;

INSERT INTO points_of_interest (name, description, latitude, longitude) VALUES
('Parque Farroupilha', 'Um dos maiores e mais populares parques de Porto Alegre.', -30.037878, -51.218513),
('Mercado Público', 'Um mercado histórico com uma variedade de produtos locais.', -30.027704, -51.228734),
('Usina do Gasômetro', 'Centro cultural com uma vista incrível do Rio Guaíba.', -30.031041, -51.241550);

create table users(
	id int not null auto_increment primary key,
    name varchar(255) not null,
    password varchar(255) not null,
    email varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);
select * from users;