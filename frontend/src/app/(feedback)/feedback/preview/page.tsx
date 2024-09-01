"use client";
import React, { useEffect } from "react";
import TokenDetailsForm from "@/components/FeedbackForm/TokenDetailsForm";
import QuestionList from "@/components/FeedbackForm/QuestionList";
import { useFeedbackContext } from "@/components/FeedbackForm/FeedbackContext";

export default function PreviewPage() {
  const {
    productName,
    category,
    feedbackType,
    tokenName,
    price,
    questions,
    ratings,
  } = useFeedbackContext();

  const handleDeploy = async () => {
    try {
      const response = await fetch("/api/deploy-contract", {
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
          questions,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to deploy contract");
      }

      const data = await response.json();
      alert(`Deployment successful! Contract Address: ${data.contractAddress}`);
    } catch (error) {
      console.error("Error deploying contract:", error);
      alert("Deployment failed. Please try again.");
    }
  };

  useEffect(() => {
    console.log("Preview Questions:", questions);
    console.log("Preview Token Name:", tokenName);
    console.log("Preview Price:", price);
  }, [questions, tokenName, price]);

  return (
    <div className="text-center z-10">
      <h2 className="text-2xl font-bold mb-6">Preview Your Feedback Form</h2>
      <QuestionList
        questions={questions}
        ratings={ratings}
        readonly={true}
        setRatings={function (ratings: number[]): void {
          throw new Error("Function not implemented.");
        }}
      />
      <TokenDetailsForm
        tokenName={tokenName}
        price={price}
        readonly={true}
        setTokenName={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        setPrice={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      <button
        onClick={handleDeploy}
        className="bg-green-500 text-white p-2 rounded w-full mt-6"
      >
        Confirm and Continue to Deployment
      </button>
    </div>
  );
}
