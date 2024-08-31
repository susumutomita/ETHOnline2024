"use client";

import React, { useState } from "react";
import FeedbackForm from "@/components/FeedbackForm";

export default function FeedbackFormPage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionsGenerated = (generatedQuestions: string[]) => {
    setIsLoading(true); // Set loading to true at the start of the operation
    if (Array.isArray(generatedQuestions)) {
      setQuestions(generatedQuestions);
    } else {
      console.error(
        "Generated questions are not in the expected array format:",
        generatedQuestions,
      );
    }
    setIsLoading(false); // Already present to set loading to false after operation
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
          <p>Generating...</p>
        ) : questions.length > 0 ? (
          <ul className="mt-4">
            {questions.map((question, index) => (
              <li
                key={index}
                className="mb-2 p-4 border rounded w-full text-left bg-white shadow-sm"
              >
                {question}
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
