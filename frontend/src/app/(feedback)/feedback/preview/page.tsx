"use client";
import React from "react";
import TokenDetailsForm from "@/components/FeedbackForm/TokenDetailsForm";
import QuestionList from "@/components/FeedbackForm/QuestionList";
import { useFeedbackContext } from "@/components/FeedbackForm/FeedbackContext";

export default function PreviewPage() {
  const { tokenName, price, questions, ratings } = useFeedbackContext();

  return (
    <div className="text-center z-10">
      <h2 className="text-2xl font-bold mb-6">Preview Your Feedback Form</h2>
      {/* 質問のリストのみを表示 */}
      <QuestionList
        questions={questions}
        ratings={ratings}
        setRatings={() => {}} // プレビュー用なので、空の関数を渡す
        readonly={true}
      />
      {/* トークンの詳細を表示 */}
      <TokenDetailsForm
        tokenName={tokenName}
        setTokenName={() => {}} // プレビュー用なので、空の関数を渡す
        price={price}
        setPrice={() => {}} // プレビュー用なので、空の関数を渡す
        readonly={true}
      />
      <button className="bg-green-500 text-white p-2 rounded w-full mt-6">
        Confirm and Continue to Deployment
      </button>
    </div>
  );
}
