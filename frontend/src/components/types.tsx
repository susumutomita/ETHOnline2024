export interface Question {
  id: string;
  text: string;
}

export interface FeedbackFormProps {
  onQuestionsGenerated: (questions: Question[]) => void;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
}

export interface QuestionListProps {
  questions: Question[];
  ratings: number[];
  setRatings: (ratings: number[]) => void;
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
}

export interface TokenDetailsFormProps {
  tokenName: string;
  setTokenName: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
}
