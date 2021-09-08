-- Tabela para armazenar usuarios
create table users(
    id serial primary key,
    name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null
);

-- Tabela de perguntas
create table question(
    id serial primary key,
    description varchar(1200) not null
);

-- Tabela de respostas
create table answer(
    id serial primary key,
    description varchar(1200) not null,
    is_correct boolean not null
);

-- Tabela de categorias/temas de quiz
create table category(
    id serial primary key,
    description varchar(255) not null unique
);

-- Tabela para relacionar cada quiz com sua categoria e o usuário que o criou 
create table quiz(
    id serial primary key,
    name varchar(155) not null,
    id_user integer not null,
    foreign key(id_user) references users(id),
    id_category integer not null,
    foreign key(id_category) references category(id)
);

-- Tabela relacionando cada questão com suas respectivas respostas e o quiz a que pertence
create table quiz_question(
    id serial primary key,
    id_question integer not null,
    foreign key(id_question) references question(id),
    id_answer integer not null unique,
    foreign key(id_answer) references answer(id),
    id_quiz integer not null,
    foreign key(id_quiz) references quiz(id)
);