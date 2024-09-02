"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFeedbackContext } from "@/components/FeedbackForm/FeedbackContext";
import FeedbackFormFields from "@/components/FeedbackForm/FeedbackFormFields";
import TokenDetailsForm from "@/components/FeedbackForm/TokenDetailsForm";
import QuestionList from "@/components/FeedbackForm/QuestionList";
import { Question, FeedbackFormProps } from "@/components/types";

export default function FeedbackForm({
  onQuestionsGenerated,
  setIsLoading,
  isLoading,
}: FeedbackFormProps) {
  const {
    productName,
    setProductName,
    category,
    setCategory,
    feedbackType,
    setFeedbackType,
    tokenName,
    setTokenName,
    price,
    setPrice,
    questions,
    setQuestions,
    ratings,
    setRatings,
  } = useFeedbackContext();

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const navigateToPreviewPage = () => {
    router.push("/feedback/preview");
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
      const generatedQuestions: Question[] = data.questions
        .filter((q: string) => /^\d+\./.test(q.trim()))
        .map((q: string, index: number) => ({
          id: `question-${index}`,
          text: q.trim(),
        }));

      setQuestions(generatedQuestions);
      setRatings(new Array(generatedQuestions.length).fill(0));
    } catch (error: any) {
      console.error("Error generating questions:", error);
      setError(
        error.message ||
          "An error occurred while generating questions. Please try again.",
      );
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Questions set:", questions);
    console.log("Token Name set:", tokenName);
    console.log("Price set:", price);
  }, [questions, tokenName, price]);

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
        onClick={navigateToPreviewPage}
        className={`bg-green-500 text-white p-2 rounded w-full mt-6 ${questions.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={questions.length === 0}
      >
        Continue to Preview
      </button>
    </div>
  );
}
