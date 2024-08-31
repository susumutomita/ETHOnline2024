"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // useRouterをインポート
import { Question, FeedbackFormProps } from "@/components/FeedbackFormTypes";

export default function FeedbackForm({
  onQuestionsGenerated,
  setIsLoading,
  isLoading,
}: FeedbackFormProps) {
  const router = useRouter(); // useRouterフックを使用
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("food");
  const [feedbackType, setFeedbackType] = useState("general");
  const [tokenName, setTokenName] = useState("");
  const [price, setPrice] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(event.target.value);
    };

  const handleRatingChange = (index: number, rating: number) => {
    const newRatings = [...ratings];
    newRatings[index] = rating;
    setRatings(newRatings);
  };

  const generateQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          category,
          feedbackType,
          tokenName,
          price,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate questions");
      }

      const data = await response.json();
      console.log("API response data:", data);

      const generatedQuestions: Question[] = data.questions
        .filter((q: string) => /^\d+\./.test(q.trim()))
        .map((q: string, index: number) => ({
          id: `question-${index}`,
          text: q.trim(),
        }));

      console.log("Filtered Questions:", generatedQuestions);
      setQuestions(generatedQuestions);
      setRatings(new Array(generatedQuestions.length).fill(0)); // 質問の数に合わせて評価を初期化
      onQuestionsGenerated(generatedQuestions);
    } catch (error) {
      console.error("Error generating questions:", error);
      setError(
        "An error occurred while generating questions. Please try again.",
      );
      setQuestions([]); // エラー時に質問をクリア
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSmartContractPage = () => {
    router.push("/create-smart-contract"); // スマートコントラクト作成ページに移動
  };

  return (
    <div className="text-center">
      {/* フィードバック生成セクション */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Feedback Form Details</h2>
        <input
          type="text"
          value={productName}
          onChange={handleChange(setProductName)}
          placeholder="Product Name"
          className="p-2 border rounded w-full mb-4"
          disabled={isLoading}
        />
        <select
          value={category}
          onChange={handleChange(setCategory)}
          className="p-2 border rounded w-full mb-4"
          disabled={isLoading}
        >
          <option value="food">Food</option>
          <option value="beverage">Beverage</option>
          <option value="electronics">Electronics</option>
        </select>
        <select
          value={feedbackType}
          onChange={handleChange(setFeedbackType)}
          className="p-2 border rounded w-full mb-4"
          disabled={isLoading}
        >
          <option value="general">General Feedback</option>
          <option value="quality">Quality Feedback</option>
          <option value="usability">Usability Feedback</option>
        </select>
      </div>

      {/* Generate Questions ボタン */}
      <button
        onClick={generateQuestions}
        className={`bg-blue-500 text-white p-2 rounded w-full mb-4 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Questions"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* 質問の表示・評価セクション */}
      {questions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold">Generated Questions:</h2>
          <ul className="mt-4">
            {questions.map((question, index) => (
              <li
                key={question.id || index}
                className="mb-2 p-4 border rounded w-full text-left bg-white shadow-sm"
              >
                <p>{question.text}</p>
                <div className="mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`cursor-pointer ${
                        ratings[index] >= star
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                      onClick={() => handleRatingChange(index, star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* トークン情報セクション */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Token Details</h2>
        <input
          type="text"
          value={tokenName}
          onChange={handleChange(setTokenName)}
          placeholder="Token Name"
          className="p-2 border rounded w-full mb-4"
          disabled={isLoading}
        />
        <input
          type="number"
          value={price}
          onChange={handleChange(setPrice)}
          placeholder="Price in ETH"
          className="p-2 border rounded w-full mb-4"
          disabled={isLoading}
        />
      </div>

      {/* Continue ボタン */}
      <button
        onClick={navigateToSmartContractPage}
        className={`bg-blue-500 text-white p-2 rounded w-full mt-6 ${questions.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={questions.length === 0}
      >
        Continue to Smart Contract Creation
      </button>
    </div>
  );
}
