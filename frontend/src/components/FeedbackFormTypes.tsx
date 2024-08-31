export interface Question {
  id: string;
  text: string;
}

export interface FeedbackFormProps {
  onQuestionsGenerated: (questions: Question[]) => void;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
}
