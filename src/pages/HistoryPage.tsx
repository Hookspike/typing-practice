import { useState, useEffect } from 'react';
import { HistoryPanel } from '@/components/HistoryPanel';
import { getResults } from '@/utils/typingUtils';
import { TypingResult } from '@/types';

export function HistoryPage() {
  const [results, setResults] = useState<TypingResult[]>([]);

  useEffect(() => {
    setResults(getResults());
  }, []);

  return (
    <div className="history-page">
      <h2 className="page-title">练习历史</h2>
      <HistoryPanel results={results} />
    </div>
  );
}