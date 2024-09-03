import { ReactNode, Dispatch, SetStateAction } from "react";
export interface Question {
  id: string;
  text: string;
}

export interface FeedbackFormProps {
  onQuestionsGenerated: (questions: string[]) => void;
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
