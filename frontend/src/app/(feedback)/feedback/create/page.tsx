"use client";

import React, { useState } from "react";
import FeedbackForm from "@/components/FeedbackForm";
import BasicCard from "@/components/basic-card";

interface Question {
  id: string;
  text: string;
}

export default function FeedbackFormPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuestionsGenerated = (generatedQuestions: Question[]) => {
    setIsLoading(true);
    if (Array.isArray(generatedQuestions)) {
      setError(null); // Reset error state
    } else {
      console.error(
        "Generated questions are not in the expected array format:",
        generatedQuestions,
      );
      setError(
        "An error occurred while generating questions. Please try again.",
      );
    }
    setIsLoading(false); // Set loading to false after operation
  };

  return (
    <div className="flex flex-row justify-center mt-8 space-x-8 z-10 w-full max-w-screen-xl px-5 xl:px-0 text-center">
      <BasicCard
        className="w-full p-4"
        title="Create Feedback Form"
        description="Collect feedback from your customers and improve their experience by creating a tailored feedback form."
      >
        <FeedbackForm
          onQuestionsGenerated={handleQuestionsGenerated}
          setIsLoading={setIsLoading}
          isLoading={isLoading} // isLoadingをFeedbackFormに渡す
        />
        {error && (
          <div className="mt-6">
            <p role="alert" className="text-red-500">
              {error}
            </p>
          </div>
        )}
      </BasicCard>

      {/* Steps or Instructions Card */}
      <BasicCard
        className="w-full h-auto px-4 py-6 sticky top-24 text-center"
        title="Steps"
        description="Follow these steps to create and manage feedback forms."
      >
        <div className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-bold">1. Create Form</h3>
            <p className="break-words">
              Enter product details and select feedback types.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold">2. Generate Questions</h3>
            <p className="break-words">
              Click &apos;Generate Questions&apos; to create your feedback form.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold">3. Review and Publish</h3>
            <p className="break-words">
              Review generated questions and publish the form.
            </p>
          </div>
        </div>
      </BasicCard>
    </div>
  );
}
