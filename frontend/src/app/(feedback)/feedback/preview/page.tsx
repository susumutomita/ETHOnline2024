"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
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
    tokenContractAddress,
  } = useFeedbackContext();

  const router = useRouter();

  const handleDeploy = async () => {
    try {
      const response = await fetch("/api/deploy-contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenName,
          price,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to deploy contract");
      }

      const data = await response.json();

      alert(`Deployment successful! Contract Address: ${data.contractAddress}`);
      // 続けてフォームの情報をブロックチェーンに保存するなどの処理を実行
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
        setRatings={() => {}}
      />
      <TokenDetailsForm
        tokenName={tokenName}
        price={price}
        readonly={true}
        setTokenName={() => {}}
        setPrice={() => {}}
      />
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleDeploy}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Confirm and Continue to Deployment
        </button>
        <button
          type="button"
          onClick={() => router.push("/feedback/create")}
          className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Back
        </button>
      </div>
    </div>
  );
}
