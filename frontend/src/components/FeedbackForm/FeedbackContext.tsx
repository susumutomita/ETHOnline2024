"use client";

import React, { createContext, useContext, useState } from "react";
import {
  Question,
  FeedbackContextType,
  FeedbackProviderProps,
} from "@/components/types";

// `use client` でクライアント側の実行を明示
const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined,
);

export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({
  children,
}) => {
  // フィードバックフォームの状態管理
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("food");
  const [feedbackType, setFeedbackType] = useState("general");
  const [tokenName, setTokenName] = useState("");
  const [price, setPrice] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);

  return (
    <FeedbackContext.Provider
      value={{
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
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error(
      "useFeedbackContext must be used within a FeedbackProvider",
    );
  }
  return context;
};
