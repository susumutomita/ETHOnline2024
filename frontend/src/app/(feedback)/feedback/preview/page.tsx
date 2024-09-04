"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BrowserProvider, ContractFactory } from "ethers"; // v6.x でのインポート方法
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

  const [deploying, setDeploying] = useState(false);
  const router = useRouter();

  const handleDeploy = async () => {
    setDeploying(true);
    try {
      if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed!");
        setDeploying(false);
        return;
      }

      // メタマスクに接続して署名者を取得
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // スマートコントラクトをデプロイするためのファクトリを作成
      // const contractFactory = new ContractFactory(abi, bytecode, signer);

      // // スマートコントラクトをデプロイ
      // const contract = await contractFactory.deploy(tokenName, price);

      // // デプロイが完了するまで待機
      // await contract.waitForDeployment();
      const contractAddress = tokenContractAddress;
      // // コントラクトアドレスを取得して表示
      // const contractAddress = contract.target;
      // alert(`Deployment successful! Contract Address: ${contractAddress}`);

      // 必要ならばフォームデータの保存処理を追加
      const response = await fetch("/api/save-form-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenName,
          price,
          formData: { productName, category, feedbackType, questions },
          contractAddress: contractAddress,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save form data");
      }

      const data = await response.json();
      alert(`Form data saved successfully! CID: ${data.cid}`);
    } catch (error) {
      console.error("Error deploying contract:", error);
      alert("Deployment failed. Please try again.");
    } finally {
      setDeploying(false);
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
          disabled={deploying}
        >
          {deploying ? "Deploying..." : "Confirm and Continue to Deployment"}
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
