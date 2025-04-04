import { useEffect, useState } from "react";
import IntegerType from "./IntegerType";
import MultiType from "./MultiType";
import SingleType from "./SingleType";
import StringType from "./StringType";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Load questions from sessionStorage
  useEffect(() => {
    const storedQuestions = sessionStorage.getItem("questions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }

    // Check for question index in URL using standard Web API
    const url = new URL(window.location.href);
    const qIndex = url.searchParams.get("q");
    if (qIndex) {
      setCurrentQuestionIndex(parseInt(qIndex));
    }
  }, []);

  // Get current question
  const currentQuestion: any = questions[currentQuestionIndex] || null;

  // Render the appropriate question component based on type
  const renderQuestion = () => {
    switch (currentQuestion?.type) {
      case "integer":
        return (
          <IntegerType
            question={currentQuestion?.text}
            jobRoleQuestionId={currentQuestion?.jobRoleQuestionId}
            currentIndex={currentQuestionIndex}
            totalIndex={questions?.length - 1}
          />
        );
      case "multi":
        return (
          <MultiType
            question={currentQuestion?.text}
            options={currentQuestion?.options}
            jobRoleQuestionId={currentQuestion?.jobRoleQuestionId}
            currentIndex={currentQuestionIndex}
            totalIndex={questions?.length - 1}
          />
        );
      case "single":
        return (
          <SingleType
            question={currentQuestion?.text}
            options={currentQuestion?.options}
            jobRoleQuestionId={currentQuestion?.jobRoleQuestionId}
            currentIndex={currentQuestionIndex}
            totalIndex={questions?.length - 1}
          />
        );
      case "string":
        return (
          <StringType
            question={currentQuestion?.text}
            jobRoleQuestionId={currentQuestion?.jobRoleQuestionId}
            currentIndex={currentQuestionIndex}
            totalIndex={questions?.length - 1}
          />
        );
      default:
        return null;
    }
  };

  return <div>{renderQuestion()}</div>;
}
