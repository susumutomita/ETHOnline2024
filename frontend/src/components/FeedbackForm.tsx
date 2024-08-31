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

  const generateQuestions = async () => {
    setIsLoading(true); // ローディング状態を設定
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
    } finally {
      setIsLoading(false); // ローディング状態を終了
    }
  };

  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0 text-center">
      <div className="mb-4">
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
          className="p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="food">Food</option>
          <option value="beverage">Beverage</option>
          <option value="electronics">Electronics</option>
          {/* 追加のカテゴリオプション */}
        </select>
      </div>
      <div className="mb-4">
        <select
          value={feedbackType}
          onChange={(e) => setFeedbackType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="general">General Feedback</option>
          <option value="quality">Quality Feedback</option>
          <option value="usability">Usability Feedback</option>
          {/* 追加のフィードバックタイプオプション */}
        </select>
      </div>
      <button
        onClick={generateQuestions}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Generate Questions
      </button>
    </div>
  );
}
