import React from "react";
import { QuestionListProps } from "@/components/types";

export default function QuestionList({
  questions,
  ratings,
  setRatings,
}: QuestionListProps) {
  const handleRatingChange = (index: number, rating: number) => {
    const newRatings = [...ratings];
    newRatings[index] = rating;
    setRatings(newRatings);
  };

  return (
    <div className="mt-6">
      <ul className="mt-4">
        {questions.map((question, index) => (
          <li
            key={question.id}
            className="mb-2 p-4 border rounded w-full text-left bg-white shadow-sm"
          >
            <p>{question.text}</p>
            <div className="mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer ${ratings[index] >= star ? "text-yellow-500" : "text-gray-400"}`}
                  onClick={() => handleRatingChange(index, star)}
                >
                  ★
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
