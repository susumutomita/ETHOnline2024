// src/types.ts
import { ReactNode, Dispatch, SetStateAction } from "react";

// Questionに関するインターフェース
export interface Question {
  id: string;
  text: string;
}

// FeedbackForm に関連するインターフェース
export interface FeedbackFormProps {
  onQuestionsGenerated: (generatedQuestions: string[]) => void;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
  readonly?: boolean;
  setTokenContractAddress?: Dispatch<SetStateAction<string | null>>;
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

// Feedbackに関連するインターフェース
export interface Feedback {
  id: number;
  customer: string;
  score: number;
  comment: string;
}

export interface FeedbackForm {
  id: number;
  productName: string;
  category: string;
  totalFeedbackScore: number;
  feedbackCount: number;
  questions: string[];
  averageScore: number;
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
  tokenContractAddress: string | null;
  setTokenContractAddress: (address: string | null) => void;
}

export interface FeedbackProviderProps {
  children: ReactNode;
}

export interface MinaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel: string;
}
