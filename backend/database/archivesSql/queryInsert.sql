/**************TESTES DE RELAÇÕES**************/

-- Inserção na tabela de usuários
INSERT INTO users(name, email, password) VALUES ('André', 'andre@email.com', 'hsjsbckjbcspbbcsabi');

-- Inserção na tabela de categorias de quiz
INSERT INTO category(description) VALUES ('Esportes');
INSERT INTO category(description) VALUES ('Tecnologia');

-- Inserção de novo quiz, relacionando com o usuário que o criou e a categoria dele
INSERT INTO quiz(name, id_user, id_category) VALUES ('Primeiro quiz', 1, 1);
INSERT INTO quiz(name, id_user, id_category) VALUES ('Segundo quiz', 1, 2);

-- **********Inserção de nova questão no quiz criado******** --
-- Inserçao de questão
INSERT INTO question(description) VALUES ('Questão numero 1 do quiz 1');
INSERT INTO question(description) VALUES ('Questão numero 2 do quiz 1');
INSERT INTO question(description) VALUES ('Questão numero 1 do quiz 2');

-- Inserção das respostas
INSERT INTO answer(description, is_correct) VALUES ('Resposta 1 - questão 1 - quiz 1', true);
INSERT INTO answer(description, is_correct) VALUES ('Resposta 2 - questão 1 - quiz 1', false);
INSERT INTO answer(description, is_correct) VALUES ('Resposta 3 - questão 1 - quiz 1', false);
INSERT INTO answer(description, is_correct) VALUES ('Resposta 4 - questão 1 - quiz 1', false);

INSERT INTO answer(description, is_correct) VALUES ('Resposta 1 - questão 2 - quiz 1', false);
INSERT INTO answer(description, is_correct) VALUES ('Resposta 2 - questão 2 - quiz 1', false);
INSERT INTO answer(description, is_correct) VALUES ('Resposta 3 - questão 2 - quiz 1', false);
INSERT INTO answer(description, is_correct) VALUES ('Resposta 4 - questão 2 - quiz 1', true);

INSERT INTO answer(description, is_correct) VALUES ('Resposta 1 - questão 1 - quiz 2', false);
INSERT INTO answer(description, is_correct) VALUES ('Resposta 2 - questão 1 - quiz 2', true);
INSERT INTO answer(description, is_correct) VALUES ('Resposta 3 - questão 1 - quiz 2', false);
INSERT INTO answer(description, is_correct) VALUES ('Resposta 4 - questão 1 - quiz 2', false);

-- Inserção na tabela de questões de quiz (montando a questão referente ao quiz)
INSERT INTO quiz_question(id_question, id_answer, id_quiz) VALUES (1,1,1);
INSERT INTO quiz_question(id_question, id_answer, id_quiz) VALUES (1,2,1);
INSERT INTO quiz_question(id_question, id_answer, id_quiz) VALUES (1,3,1);
INSERT INTO quiz_question(id_question, id_answer, id_quiz) VALUES (1,4,1);

INSERT INTO quiz_question(id_question, id_answer, id_quiz) VALUES (2,5,1);
INSERT INTO quiz_question(id_question, id_answer, id_quiz) VALUES (2,6,1);
INSERT INTO quiz_question(id_question, id_answer, id_quiz) VALUES (2,7,1);
INSERT INTO quiz_question(id_question, id_answer, id_quiz) VALUES (2,8,1);

INSERT INTO quiz_question(id_question, id_answer, id_quiz) VALUES (3,9,2);
INSERT INTO quiz_question(id_question, id_answer, id_quiz) VALUES (3,10,2);
INSERT INTO quiz_question(id_question, id_answer, id_quiz) VALUES (3,11,2);
INSERT INTO quiz_question(id_question, id_answer, id_quiz) VALUES (3,12,2);