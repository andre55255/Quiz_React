-- Seleção de quiz, com usuario e a categoria dele
select 
    quiz.name as quiz,
    users.name as user_name,
    users.email as user_email,
    category.description as category
from
    quiz
inner join
    users
on
    quiz.id_user = users.id
inner join
    category
on
    quiz.id_category = category.id
where
    quiz.id = "Coloca o id do quiz"
    quiz.name = "Coloca o name do quiz";

-- Seleção das respostas do quiz
select
    question.description as question,
    answer.description as answer,
    answer.is_correct as is_correct,
    quiz.name as quiz
from
    quiz_question
inner join
    question
on
    quiz_question.id_question = question.id
inner join
    answer
on
    quiz_question.id_answer = answer.id
inner join
    quiz
on 
    quiz_question.id_quiz = quiz.id
where
    quiz.id = "Coloca o id do quiz em questão";