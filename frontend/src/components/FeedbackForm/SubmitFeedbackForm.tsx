"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { BrowserProvider, Contract } from "ethers";
import { abi, contractAddresses } from "../../app/constants/contract";

// 星評価のコンポーネント
function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [rating, setRating] = useState(value);

  const handleClick = (newValue: number) => {
    setRating(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

interface SubmitFeedbackFormProps {
  id: string; // フォームIDをパラメータとして受け取る
}

export default function SubmitFeedbackForm({ id }: SubmitFeedbackFormProps) {
  const [form, setForm] = useState<any | null>(null);
  const [feedback, setFeedback] = useState<string[]>([]); // 各質問に対するフィードバックを配列で保持
  const [score, setScore] = useState<number[]>([]); // 各質問に対するスコアも配列で保持
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchFormDetails = async () => {
      if (!window.ethereum || !id) return;

      try {
        setLoading(true);
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const network = await provider.getNetwork();

        const selectedAddress = getContractAddress(network.chainId);

        if (!selectedAddress) {
          setError("Unsupported network");
          setLoading(false);
          return;
        }

        const contract = new Contract(selectedAddress, abi, signer);
        const formDetails = await contract.feedbackForms(id); // フィードバックフォームの情報を取得

        // 質問を取得
        const questions = await contract.getQuestions(id); // スマートコントラクトから質問を取得
        const formattedQuestions = questions.map((q: any) => q.text); // 質問をテキストでフォーマット

        setForm({
          ...formDetails,
          questions: formattedQuestions, // フォームに質問を追加
        });

        // フィードバックとスコア用に空の配列を用意
        setFeedback(new Array(formattedQuestions.length).fill(""));
        setScore(new Array(formattedQuestions.length).fill(0));
      } catch (error: any) {
        console.error("Error fetching form details:", error);
        setError(`Failed to fetch form details: ${error.message || error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFormDetails();
  }, [id]);

  const getContractAddress = (chainId: bigint) => {
    switch (chainId) {
      case BigInt(534351):
        return contractAddresses.scrollTestnet;
      case BigInt(97):
        return contractAddresses.bnbTestnet;
      case BigInt(84532):
        return contractAddresses.baseSepoliaTestnet;
      default:
        return null;
    }
  };

  const submitFeedback = async () => {
    if (!window.ethereum || !form) return;

    try {
      setLoading(true);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      const selectedAddress = getContractAddress(network.chainId);

      if (!selectedAddress) {
        setError("Unsupported network");
        setLoading(false);
        return;
      }

      const contract = new Contract(selectedAddress, abi, signer);

      // フィードバックとスコアを一括で送信
      const tx = await contract.submitFeedbackBatch(id, score, feedback); // スマートコントラクト側のsubmitFeedbackBatch関数を使用
      await tx.wait();

      setSuccess(true);
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      setError(`Failed to submit feedback: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">{form?.productName}</h1>

      {error && <p className="text-red-600">{error}</p>}
      {loading && <p>Loading...</p>}
      {success && (
        <p className="text-green-600">Feedback submitted successfully!</p>
      )}

      {!loading && form && (
        <div>
          {form.questions?.map((question: string, index: number) => (
            <div key={index} className="mb-4">
              <p>{question}</p>
              {/* スター評価のコンポーネント */}
              <StarRating
                value={score[index]}
                onChange={(newRating) =>
                  setScore((prev) => {
                    const updatedScores = [...prev];
                    updatedScores[index] = newRating;
                    return updatedScores;
                  })
                }
              />
            </div>
          ))}

          <button
            onClick={submitFeedback}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-4"
          >
            Submit Feedback
          </button>
        </div>
      )}
    </div>
  );
}
