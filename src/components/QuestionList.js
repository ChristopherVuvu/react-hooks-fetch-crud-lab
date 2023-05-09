import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);


    // Fetch the questions here and update the state
    useEffect(() => {
      fetch("http://localhost:4000/questions")
        .then((response) => response.json())
        .then((data) => setQuestions(data))
        .catch((error) => console.log(error));
    }, []);

    function handleQuestionDeleted(deletedQuestionId) {
      setQuestions(questions.filter((question) => question.id !== deletedQuestionId));
    }

    /*function handleCorrectAnswerUpdated(updatedQuestionId, newCorrectIndex) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === updatedQuestionId
            ? { ...question, correctIndex: newCorrectIndex }
            : question
        )
      );
    }*/

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* Map over the questions and render QuestionItem components */}
        {questions.map((question) => (
          <QuestionItem 
          key={question.id} 
          question={question} 
          onQuestionDeleted={handleQuestionDeleted}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
