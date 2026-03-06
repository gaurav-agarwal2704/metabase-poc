import { useState } from "react";
import { InteractiveQuestion } from "@metabase/embedding-sdk-react";
import "./QuestionExplorerPage.scss";

export default function QuestionExplorerPage() {
  const [questionId, setQuestionId] = useState<string | number | undefined>(undefined);
  const [inputValue, setInputValue] = useState("");

  const handleLoadQuestion = () => {
    setQuestionId(inputValue);
    // const id = parseInt(inputValue, 10);
    // if (!isNaN(id)) setQuestionId(id);
  };

  return (
    <div className="explorer-page">
      <header className="explorer-page__header">
        <h1>Question Explorer</h1>
        <p>
          Use the query builder to create new questions or load existing ones.
          Covers: chart type exploration, custom report creation...
          Hello {inputValue} ---- {questionId}
        </p>

        <div className="explorer-page__controls">
          <input
            // type="number"
            placeholder="Question ID"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLoadQuestion()}
            className="explorer-page__input"
          />
          <button
            onClick={handleLoadQuestion}
            className="explorer-page__btn explorer-page__btn--load"
          >
            Load Question
          </button>
          <button
            onClick={() => setQuestionId(undefined)}
            className="explorer-page__btn explorer-page__btn--new"
          >
            + New Question
          </button>
          {questionId}    
        </div>
      </header>
      {questionId}
      <div className="explorer-page__content">
        {questionId ? (
          <InteractiveQuestion
            questionId={questionId}
            className="explorer-page__embed"
          />
        ) : (
          <InteractiveQuestion className="explorer-page__embed" />
        )}
      </div>
    </div>
  );
}
