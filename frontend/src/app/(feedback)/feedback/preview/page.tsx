"use client";

import React from "react";
import FeedbackFormFields from "@/components/FeedbackForm/FeedbackFormFields";
import TokenDetailsForm from "@/components/FeedbackForm/TokenDetailsForm";
import QuestionList from "@/components/FeedbackForm/QuestionList";
import { useFeedbackContext } from "@/components/FeedbackForm/FeedbackContext"; // ここで正しくインポート

export default function PreviewPage() {
  const {
    productName,
    category,
    feedbackType,
    tokenName,
    price,
    questions,
    ratings,
  } = useFeedbackContext(); // useFeedbackContextを利用してコンテキストを取得

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">Preview Your Feedback Form</h2>
      <FeedbackFormFields
        productName={productName}
        setProductName={() => {}}
        category={category}
        setCategory={() => {}}
        feedbackType={feedbackType}
        setFeedbackType={() => {}}
        generateQuestions={() => {}}
        isLoading={false}
        readonly={true}
      />
      <TokenDetailsForm
        tokenName={tokenName}
        setTokenName={() => {}}
        price={price}
        setPrice={() => {}}
        readonly={true}
      />
      <QuestionList
        questions={questions}
        ratings={ratings}
        setRatings={() => {}}
        readonly={true}
      />
      <button className="bg-green-500 text-white p-2 rounded w-full mt-6">
        Confirm and Continue to Deployment
      </button>
    </div>
  );
}
