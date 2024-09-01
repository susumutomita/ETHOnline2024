import React from "react";
import { FeedbackFormFieldsProps } from "@/components/types";

export default function FeedbackFormFields({
  productName,
  setProductName,
  category,
  setCategory,
  feedbackType,
  setFeedbackType,
  generateQuestions,
  isLoading,
  readonly = false,
}: FeedbackFormFieldsProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Feedback Form Details</h2>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName && setProductName(e.target.value)}
        placeholder="Product Name"
        className="p-2 border rounded w-full mb-4"
        disabled={isLoading || readonly}
      />
      <select
        value={category}
        onChange={(e) => setCategory && setCategory(e.target.value)}
        className="p-2 border rounded w-full mb-4"
        disabled={isLoading || readonly}
      >
        <option value="food">Food</option>
        <option value="beverage">Beverage</option>
        <option value="electronics">Electronics</option>
      </select>
      <select
        value={feedbackType}
        onChange={(e) => setFeedbackType && setFeedbackType(e.target.value)}
        className="p-2 border rounded w-full mb-4"
        disabled={isLoading || readonly}
      >
        <option value="general">General Feedback</option>
        <option value="quality">Quality Feedback</option>
        <option value="usability">Usability Feedback</option>
      </select>
      {!readonly && (
        <button
          onClick={generateQuestions}
          className={`bg-blue-500 text-white p-2 rounded w-full mb-4 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Questions"}
        </button>
      )}
    </div>
  );
}
