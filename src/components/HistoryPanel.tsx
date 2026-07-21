import { TypingResult } from '@/types';
import { formatDuration, clearResults, getAverageWPM, getBestWPM } from '@/utils/typingUtils';

interface HistoryPanelProps {
  results: TypingResult[];
}

export function HistoryPanel({ results }: HistoryPanelProps) {
  if (results.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📊</div>
        <div className="empty-text">暂无练习记录</div>
        <div className="empty-hint">开始练习后，记录会保存在这里</div>
      </div>
    );
  }

  const avgWPM = getAverageWPM(results);
  const bestWPM = getBestWPM(results);

  return (
    <div className="history-panel">
      <div className="history-summary">
        <div className="summary-item">
          <div className="summary-value">{results.length}</div>
          <div className="summary-label">总练习次数</div>
        </div>
        <div className="summary-item">
          <div className="summary-value">{avgWPM}</div>
          <div className="summary-label">平均 WPM</div>
        </div>
        <div className="summary-item">
          <div className="summary-value">{bestWPM}</div>
          <div className="summary-label">最高 WPM</div>
        </div>
      </div>
      <div className="history-list">
        {results.slice().reverse().map(result => (
          <div key={result.id} className="history-item">
            <div className="history-date">
              {new Date(result.timestamp).toLocaleString('zh-CN')}
            </div>
            <div className="history-metrics">
              <span className="metric">{result.wpm} WPM</span>
              <span className="metric">{result.accuracy}%</span>
              <span className="metric">{formatDuration(result.duration)}</span>
            </div>
            <div className="history-mode">{result.mode === 'practice' ? '练习' : '测试'}</div>
          </div>
        ))}
      </div>
      <button className="btn btn-danger" onClick={clearResults}>
        清空记录
      </button>
    </div>
  );
}