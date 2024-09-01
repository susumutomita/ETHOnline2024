import { ReactNode } from "react";
export interface Question {
  id: string;
  text: string;
}

export interface FeedbackFormProps {
  onQuestionsGenerated: (questions: Question[]) => void;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
  readonly?: boolean;
}

export interface QuestionListProps {
  questions: Question[];
  ratings: number[];
  setRatings: (ratings: number[]) => void;
  readonly?: boolean;
}

export interface FeedbackFormFieldsProps {
  productName: string;
  setProductName: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  feedbackType: string;
  setFeedbackType: (value: string) => void;
  generateQuestions: () => void;
  isLoading: boolean;
  readonly?: boolean;
}

export interface TokenDetailsFormProps {
  tokenName: string;
  setTokenName: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  readonly?: boolean;
}

export interface FeedbackContextType {
  productName: string;
  setProductName: (name: string) => void;
  category: string;
  setCategory: (category: string) => void;
  feedbackType: string;
  setFeedbackType: (type: string) => void;
  tokenName: string;
  setTokenName: (name: string) => void;
  price: string;
  setPrice: (price: string) => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  ratings: number[];
  setRatings: (ratings: number[]) => void;
  readonly?: boolean;
}

export interface FeedbackProviderProps {
  children: ReactNode;
}
