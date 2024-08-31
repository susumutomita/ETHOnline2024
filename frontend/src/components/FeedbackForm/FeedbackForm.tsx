"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Question, FeedbackFormProps } from "@/components/types";
import FeedbackFormFields from "@/components/FeedbackForm/FeedbackFormFields";
import TokenDetailsForm from "@/components/FeedbackForm/TokenDetailsForm";
import QuestionList from "@/components/FeedbackForm/QuestionList";

export default function FeedbackForm({
  onQuestionsGenerated,
  setIsLoading,
  isLoading,
}: FeedbackFormProps) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("food");
  const [feedbackType, setFeedbackType] = useState("general");
  const [tokenName, setTokenName] = useState("");
  const [price, setPrice] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const navigateToSmartContractPage = () => {
    router.push("/smart-contract-creation");
  };

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
      setRatings(new Array(generatedQuestions.length).fill(0));
      onQuestionsGenerated(generatedQuestions);
    } catch (error) {
      console.error("Error generating questions:", error);
      setError(
        "An error occurred while generating questions. Please try again.",
      );
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <FeedbackFormFields
        productName={productName}
        setProductName={setProductName}
        category={category}
        setCategory={setCategory}
        feedbackType={feedbackType}
        setFeedbackType={setFeedbackType}
        generateQuestions={generateQuestions}
        isLoading={isLoading}
      />

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <QuestionList
        questions={questions}
        ratings={ratings}
        setRatings={setRatings}
      />

      <TokenDetailsForm
        tokenName={tokenName}
        setTokenName={setTokenName}
        price={price}
        setPrice={setPrice}
      />

      <button
        onClick={() => navigateToSmartContractPage()}
        className={`bg-green-500 text-white p-2 rounded w-full mt-6 ${questions.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={questions.length === 0}
      >
        Continue to Smart Contract Creation
      </button>
    </div>
  );
}
