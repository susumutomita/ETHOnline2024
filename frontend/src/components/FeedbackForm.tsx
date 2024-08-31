"use client";

import React, { useState } from "react";

interface FeedbackFormProps {
  onQuestionsGenerated: (questions: string[]) => void;
  setIsLoading: (loading: boolean) => void;
}

export default function FeedbackForm({
  onQuestionsGenerated,
  setIsLoading,
}: FeedbackFormProps) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("food");
  const [feedbackType, setFeedbackType] = useState("general");
  const [isLoading, setIsLoadingState] = useState(false); // isLoadingというローカル状態を使う

  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(event.target.value);
    };

  const generateQuestions = async () => {
    setIsLoadingState(true); // ローディング状態を設定
    setError(null); // エラー状態をリセット
    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName, category, feedbackType }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate questions");
      }

      const data = await response.json();
      const questions = data.questions || [];
      onQuestionsGenerated(questions);
    } catch (error) {
      console.error("Error generating questions:", error);
      setError(
        "An error occurred while generating questions. Please try again.",
      );
    } finally {
      setIsLoadingState(false); // ローディング状態を終了
    }
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <input
          type="text"
          value={productName}
          onChange={handleChange(setProductName)}
          placeholder="Product Name"
          className="p-2 border rounded w-full"
          disabled={isLoading} // isLoading状態を使用
        />
      </div>
      <div className="mb-4">
        <select
          value={category}
          onChange={handleChange(setCategory)}
          className="p-2 border rounded w-full"
          disabled={isLoading} // isLoading状態を使用
        >
          <option value="food">Food</option>
          <option value="beverage">Beverage</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>
      <div className="mb-4">
        <select
          value={feedbackType}
          onChange={handleChange(setFeedbackType)}
          className="p-2 border rounded w-full"
          disabled={isLoading} // isLoading状態を使用
        >
          <option value="general">General Feedback</option>
          <option value="quality">Quality Feedback</option>
          <option value="usability">Usability Feedback</option>
        </select>
      </div>
      <button
        onClick={generateQuestions}
        className={`bg-blue-500 text-white p-2 rounded w-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isLoading} // isLoading状態を使用
      >
        {isLoading ? "Generating..." : "Generate Questions"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
