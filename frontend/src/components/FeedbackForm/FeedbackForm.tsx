"use client";
import React, { useState, useEffect } from "react";
import { Contract, BrowserProvider } from "ethers";
import FeedbackFormFields from "@/components/FeedbackForm/FeedbackFormFields";
import TokenDetailsForm from "@/components/FeedbackForm/TokenDetailsForm";
import QuestionList from "@/components/FeedbackForm/QuestionList";
import { useFeedbackContext } from "@/components/FeedbackForm/FeedbackContext";
import { abi, contractAddresses } from "../../app/constants/contract";
import { Question, FeedbackFormProps } from "@/components/types";

export default function FeedbackForm({
  onQuestionsGenerated,
  setIsLoading,
  isLoading,
  setTokenContractAddress,
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
  const [submitting, setSubmitting] = useState(false);

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

  // MetaMaskを使用してフォームデータをブロックチェーンに送信する
  const submitToBlockchain = async () => {
    if (!window.ethereum) {
      setError("MetaMask is not installed");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();

      let selectedAddress = "";
      switch (BigInt(network.chainId)) {
        case BigInt(534351): // Scroll Testnet ID
          selectedAddress = contractAddresses.scrollTestnet;
          break;
        case BigInt(97): // BNB Testnet ID
          selectedAddress = contractAddresses.bnbTestnet;
          break;
        case BigInt(84532): // Base Sepolia Testnet ID
          selectedAddress = contractAddresses.baseSepoliaTestnet;
          break;
        default:
          setError("Unsupported network");
          setSubmitting(false);
          return;
      }
      const contract = new Contract(selectedAddress, abi, signer);

      const questionTexts = questions.map((question) => question.text);

      const tx = await contract.createFeedbackForm(
        productName,
        category,
        questionTexts,
      );

      await tx.wait();

      alert("Feedback form submitted successfully!");
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form to the blockchain.");
    } finally {
      setSubmitting(false);
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

      <button
        onClick={submitToBlockchain}
        className={`bg-green-500 text-white p-2 rounded w-full mt-6 ${submitting || questions.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={submitting || questions.length === 0}
      >
        {submitting ? "Submitting..." : "Submit to Blockchain"}
      </button>
    </div>
  );
}
