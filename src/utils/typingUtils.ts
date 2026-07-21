import { TypingResult } from '@/types';

export function calculateWPM(characters: number, duration: number): number {
  const minutes = duration / 60000;
  const words = characters / 5;
  return Math.round(words / minutes);
}

export function calculateAccuracy(correctChars: number, totalChars: number): number {
  if (totalChars === 0) return 0;
  return Math.round((correctChars / totalChars) * 100);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function saveResult(result: TypingResult): void {
  const results = getResults();
  results.push(result);
  localStorage.setItem('typing_results', JSON.stringify(results));
}

export function getResults(): TypingResult[] {
  const stored = localStorage.getItem('typing_results');
  return stored ? JSON.parse(stored) : [];
}

export function clearResults(): void {
  localStorage.removeItem('typing_results');
}

export function getAverageWPM(results: TypingResult[]): number {
  if (results.length === 0) return 0;
  const totalWPM = results.reduce((sum, r) => sum + r.wpm, 0);
  return Math.round(totalWPM / results.length);
}

export function getBestWPM(results: TypingResult[]): number {
  if (results.length === 0) return 0;
  return Math.max(...results.map(r => r.wpm));
}

export function getRecentResults(results: TypingResult[], count: number = 10): TypingResult[] {
  return [...results].sort((a, b) => b.timestamp - a.timestamp).slice(0, count);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}