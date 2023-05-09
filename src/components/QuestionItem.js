import React from "react";

function QuestionItem({ question, onCorrectAnswerUpdated }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleCorrectAnswerChange(event) {
    const newCorrectIndex = parseInt(event.target.value);

    // Send a PATCH request to the server and update the UI state
    updateCorrectAnswer(id, newCorrectIndex);
  }

  async function updateCorrectAnswer(questionId, newCorrectIndex) {
    try {
      const response = await fetch(`http://localhost:4000/questions/${questionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correctIndex: newCorrectIndex,
        }),
      });

      if (response.ok) {
        // Update the state in the QuestionList component
        onCorrectAnswerUpdated(questionId, newCorrectIndex);
      } else {
        console.log("Failed to update correct answer. Status:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
