"use client";
import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import { abi, contractAddresses } from "../../../constants/contract";
import { FeedbackFormProps, Feedback, FeedbackForm } from "@/components/types";

export default function ViewFeedbackForms() {
  const [feedbackForms, setFeedbackForms] = useState<FeedbackForm[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [averageScore, setAverageScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contractAddress, setContractAddress] = useState<string>("");

  useEffect(() => {
    const fetchFeedbackFormsAndDetails = async () => {
      setLoading(true);
      setError(null);

      if (!window.ethereum) {
        setError("MetaMask is not installed!");
        setLoading(false);
        return;
      }

      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const network = await provider.getNetwork();

        // ネットワークIDに基づいてコントラクトアドレスを選択
        let selectedAddress = "";
        switch (network.chainId) {
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
            setLoading(false);
            return;
        }

        setContractAddress(selectedAddress);
        const contract = new Contract(selectedAddress, abi, signer);

        // フィードバックフォームの取得
        const formCount = await contract.getFeedbackIdCounter();
        console.log("Current Feedback Form Count:", formCount);
        const forms = [];
        for (let i = 1; i <= formCount; i++) {
          const form = await contract.feedbackForms(i);

          // 質問を取得
          const questions = await contract.getQuestions(i);

          // 質問をテキストで配列に変換
          const questionTexts = questions.map((q: any) => q.text);

          forms.push({
            productName: form.productName,
            category: form.category,
            totalFeedbackScore: form.totalFeedbackScore,
            feedbackCount: form.feedbackCount,
            questions: questionTexts, // 質問をフォームに追加
          });
        }
        setFeedbackForms(forms);
      } catch (error: any) {
        console.error("Error fetching feedback forms:", error);
        setError(`Failed to fetch feedback forms: ${error.message || error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackFormsAndDetails();
  }, []);

  const viewFeedbackDetails = async (formId: number) => {
    setLoading(true);
    setError(null);

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, abi, signer);

      // フィードバックの詳細を取得
      const feedbackList = await contract.getFeedbacks(formId);
      const formattedFeedbacks = feedbackList.map((feedback: any) => ({
        id: feedback.id,
        customer: feedback.customer,
        score: feedback.score, // スコアを正しく取得
        comment: feedback.comment,
      }));
      setFeedbacks(formattedFeedbacks);

      // 平均スコアを取得
      const avgScore = await contract.getAverageScore(formId);
      setAverageScore(avgScore);
      setSelectedFormId(formId);
    } catch (error: any) {
      console.error("Error fetching feedback details:", error);
      setError(`Failed to fetch feedback details: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0 text-center">
      <h1 className="text-3xl font-bold mb-6">Feedback Forms</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {feedbackForms.map((form, index) => (
              <div key={index} className="bg-white p-4 rounded shadow-md">
                <h2 className="text-xl font-bold mb-2">{form.productName}</h2>
                <p className="text-gray-600 mb-2">Category: {form.category}</p>
                <p className="text-gray-600 mb-2">
                  Feedback Count: {form.feedbackCount}
                </p>
                <div className="text-left">
                  <h3 className="font-semibold">Questions:</h3>
                  <ul className="list-disc list-inside ml-4 mb-4">
                    {form.questions.map((question: string, qIndex: number) => (
                      <li key={qIndex}>{question}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => viewFeedbackDetails(index + 1)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md w-full"
                >
                  View Feedback
                </button>
              </div>
            ))}
          </div>

          {selectedFormId && (
            <div className="mt-6">
              <h2 className="text-lg font-bold mb-4">Feedback Details</h2>
              <p>Average Score: {averageScore}</p>
              <ul className="mt-4">
                {feedbacks.map((feedback) => (
                  <li key={feedback.id} className="mb-2 p-4 border rounded">
                    <p>Customer: {feedback.customer}</p>
                    <p>Score: {feedback.score}</p>
                    <p>Comment: {feedback.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
