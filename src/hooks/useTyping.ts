import { useState, useEffect, useCallback, useRef } from 'react';
import { TypingState } from '@/types';
import { calculateWPM, calculateAccuracy, generateId, saveResult } from '@/utils/typingUtils';

const initialState: TypingState = {
  currentText: '',
  userInput: '',
  startTime: null,
  endTime: null,
  isActive: false,
  isFinished: false,
  errors: 0,
  correctChars: 0,
};

export function useTyping(text: string, mode: 'practice' | 'test', testDuration?: number) {
  const [state, setState] = useState<TypingState>(initialState);
  const timerRef = useRef<number | null>(null);
  const durationRef = useRef<number>(0);

  useEffect(() => {
    setState({ ...initialState, currentText: text });
  }, [text]);

  useEffect(() => {
    if (testDuration && state.isActive && !state.isFinished) {
      const targetDuration = testDuration * 1000;
      timerRef.current = window.setInterval(() => {
        durationRef.current += 100;
        if (durationRef.current >= targetDuration) {
          handleFinish();
        }
      }, 100);
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [state.isActive, state.isFinished, testDuration]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (state.isFinished) return;

    if (!state.isActive) {
      setState(prev => ({
        ...prev,
        isActive: true,
        startTime: Date.now(),
      }));
    }

    if (e.key === 'Backspace') {
      setState(prev => ({
        ...prev,
        userInput: prev.userInput.slice(0, -1),
      }));
      return;
    }

    if (e.key.length === 1 || e.key === ' ') {
      const nextChar = state.userInput.length;
      if (nextChar < state.currentText.length) {
        const isCorrect = e.key === state.currentText[nextChar];
        setState(prev => ({
          ...prev,
          userInput: prev.userInput + e.key,
          errors: isCorrect ? prev.errors : prev.errors + 1,
          correctChars: isCorrect ? prev.correctChars + 1 : prev.correctChars,
        }));

        if (nextChar + 1 === state.currentText.length && mode === 'practice') {
          handleFinish();
        }
      }
    }
  }, [state, mode]);

  const handleFinish = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const endTime = Date.now();
    const duration = state.startTime ? endTime - state.startTime : durationRef.current;
    
    if (state.correctChars > 0) {
      const wpm = calculateWPM(state.correctChars, duration);
      const accuracy = calculateAccuracy(state.correctChars, state.userInput.length);
      
      saveResult({
        id: generateId(),
        mode,
        duration,
        wpm,
        accuracy,
        characters: state.correctChars,
        errors: state.errors,
        timestamp: Date.now(),
        text: state.currentText.slice(0, 50),
      });
    }

    setState(prev => ({
      ...prev,
      isFinished: true,
      isActive: false,
      endTime,
    }));
  }, [state, mode]);

  const reset = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    durationRef.current = 0;
    setState({ ...initialState, currentText: text });
  }, [text]);

  const currentDuration = state.startTime 
    ? (state.endTime || Date.now()) - state.startTime 
    : durationRef.current;

  const wpm = state.isFinished && state.correctChars > 0
    ? calculateWPM(state.correctChars, currentDuration)
    : 0;

  const accuracy = state.userInput.length > 0
    ? calculateAccuracy(state.correctChars, state.userInput.length)
    : 0;

  return {
    ...state,
    currentDuration,
    wpm,
    accuracy,
    handleKeyDown,
    reset,
  };
}