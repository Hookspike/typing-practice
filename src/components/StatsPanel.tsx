import { formatDuration } from '@/utils/typingUtils';

interface StatsPanelProps {
  wpm: number;
  accuracy: number;
  errors: number;
  duration: number;
  progress: number;
}

export function StatsPanel({ wpm, accuracy, errors, duration, progress }: StatsPanelProps) {
  return (
    <div className="stats-panel">
      <div className="stat-item">
        <div className="stat-value">{wpm}</div>
        <div className="stat-label">WPM</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">{accuracy}%</div>
        <div className="stat-label">准确率</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">{errors}</div>
        <div className="stat-label">错误</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">{formatDuration(duration)}</div>
        <div className="stat-label">用时</div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}