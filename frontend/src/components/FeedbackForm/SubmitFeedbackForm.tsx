"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { BrowserProvider, Contract } from "ethers";
import { abi, contractAddresses } from "../../app/constants/contract";

interface SubmitFeedbackFormProps {
  id: string; // フォームIDをパラメータとして受け取る
}

export default function SubmitFeedbackForm({ id }: SubmitFeedbackFormProps) {
  const [form, setForm] = useState<any | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [score, setScore] = useState<number>(0);
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
        setForm(formDetails);
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
      const tx = await contract.submitFeedback(id, score, feedback); // フィードバックをスマートコントラクトに送信
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
          <textarea
            className="w-full p-2 border rounded"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback"
          />
          <input
            type="number"
            className="w-full p-2 border rounded mt-4"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            placeholder="Rate 1 to 5"
            max={5}
            min={1}
          />
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
