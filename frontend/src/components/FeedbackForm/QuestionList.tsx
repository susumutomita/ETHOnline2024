import React from "react";
import { QuestionListProps } from "@/components/types";

export default function QuestionList({
  questions,
  ratings,
  setRatings,
  readonly = false,
}: QuestionListProps) {
  const handleRatingChange = (index: number, rating: number) => {
    const newRatings = [...ratings];
    newRatings[index] = rating;
    setRatings(newRatings);
  };

  return (
    console.log("questions", questions),
    (
      <div className="mt-6">
        <ul className="mt-4">
          {questions.map((question, index) => (
            <li
              key={question.id}
              className="mb-2 p-4 border rounded w-full text-left bg-white shadow-sm"
            >
              <input
                type="text"
                value={question.text}
                onChange={(e) => {
                  if (!readonly) {
                    const newQuestions = [...questions];
                    newQuestions[index].text = e.target.value;
                    setRatings(new Array(newQuestions.length).fill(0));
                  }
                }}
                className="w-full p-2 border rounded"
                readOnly={readonly}
              />
              <div className="mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer ${
                      ratings[index] >= star
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
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
    )
  );
}
