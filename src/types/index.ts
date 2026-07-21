export interface TypingResult {
  id: string;
  mode: 'practice' | 'test';
  duration: number;
  wpm: number;
  accuracy: number;
  characters: number;
  errors: number;
  timestamp: number;
  text: string;
}

export interface TypingState {
  currentText: string;
  userInput: string;
  startTime: number | null;
  endTime: number | null;
  isActive: boolean;
  isFinished: boolean;
  errors: number;
  correctChars: number;
}

export interface FingerMapping {
  [key: string]: {
    finger: string;
    hand: 'left' | 'right';
  };
}

export type PracticeMode = 'letters' | 'words' | 'sentences' | 'paragraphs';
export type TestDuration = 30 | 60 | 120;