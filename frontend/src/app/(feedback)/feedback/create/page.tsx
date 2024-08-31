"use client";

import React, { useState } from "react";
import FeedbackForm from "@/components/FeedbackForm";

interface Question {
  id: string;
  text: string;
}

export default function FeedbackFormPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuestionsGenerated = (generatedQuestions: string[]) => {
    setIsLoading(true); // Set loading to true at the start of the operation
    if (Array.isArray(generatedQuestions)) {
      const formattedQuestions = generatedQuestions.map((q, index) => ({
        id: `question-${index}`,
        text: q,
      }));
      setQuestions(formattedQuestions);
      setError(null); // Reset error state
    } else {
      console.error(
        "Generated questions are not in the expected array format:",
        generatedQuestions,
      );
      setError(
        "An error occurred while generating questions. Please try again.",
      );
    }
    setIsLoading(false); // Set loading to false after operation
  };

  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0 text-center">
      <h1 className="text-2xl font-bold mb-6">Create Feedback Form</h1>
      <FeedbackForm
        onQuestionsGenerated={handleQuestionsGenerated}
        setIsLoading={setIsLoading}
      />
      <div className="mt-6">
        <h2 className="text-lg font-bold">Generated Questions:</h2>
        {isLoading ? (
          <p role="status" aria-live="polite">
            Generating...
          </p>
        ) : error ? (
          <p role="alert" className="text-red-500">
            {error}
          </p>
        ) : questions.length > 0 ? (
          <ul className="mt-4">
            {questions.map((question) => (
              <li
                key={question.id}
                className="mb-2 p-4 border rounded w-full text-left bg-white shadow-sm"
              >
                {question.text}
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions generated yet.</p>
        )}
      </div>
    </div>
  );
}
