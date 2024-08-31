"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import { abi, contractAddresses } from "../../../constants/contract";

interface FeedbackForm {
  id: number;
  title: string;
  created: string;
  feedbackCount: number;
}

export default function FeedbackFormList() {
  const [forms, setForms] = useState<FeedbackForm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contractAddress, setContractAddress] = useState<string>("");

  useEffect(() => {
    const fetchFeedbackForms = async () => {
      setLoading(true);
      setError(null);

      if (!window.ethereum) {
        setError("MetaMask is not installed!");
        setLoading(false);
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const network = await provider.getNetwork();

        let selectedAddress = "";
        switch (network.chainId) {
          case BigInt(534351):
            selectedAddress = contractAddresses.scrollTestnet;
            break;
          case BigInt(97):
            selectedAddress = contractAddresses.bnbTestnet;
            break;
          default:
            setError("Unsupported network");
            setLoading(false);
            return;
        }

        setContractAddress(selectedAddress);
        const contract = new ethers.Contract(selectedAddress, abi, signer);

        // フィードバックフォームのデータを取得
        const formIds = await contract.getFormIds();
        const formsData = await Promise.all(
          formIds.map(async (formId: number) => {
            const form = await contract.getForm(formId);
            return {
              id: formId,
              title: form.title,
              created: new Date(form.created * 1000).toLocaleDateString(),
              feedbackCount: form.feedbackCount.toNumber(),
            };
          }),
        );

        setForms(formsData);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(`Failed to fetch data: ${error.message || error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackForms();
  }, []);

  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0 text-center">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Your Feedback Forms</h1>
          <div className="grid grid-cols-3 gap-4">
            {forms.map((form) => (
              <div key={form.id} className="p-4 border rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">{form.title}</h2>
                <p>Created: {form.created}</p>
                <p>Feedback count: {form.feedbackCount}</p>
                <Link href={`/form/${form.id}`}>
                  <button className="bg-green-500 text-white px-2 py-1 mt-2 rounded">
                    Details
                  </button>
                </Link>
              </div>
            ))}
            <Link href="/form/create">
              <div className="p-4 border rounded-lg shadow-md flex items-center justify-center cursor-pointer">
                <span className="text-4xl">+</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
