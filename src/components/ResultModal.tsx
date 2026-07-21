interface ResultModalProps {
  wpm: number;
  accuracy: number;
  errors: number;
  duration: number;
  onClose: () => void;
  onRestart: () => void;
}

export function ResultModal({ wpm, accuracy, errors, duration, onClose, onRestart }: ResultModalProps) {
  const getGrade = () => {
    if (wpm >= 60) return { text: '优秀', color: '#22c55e' };
    if (wpm >= 40) return { text: '良好', color: '#3b82f6' };
    if (wpm >= 20) return { text: '及格', color: '#eab308' };
    return { text: '继续努力', color: '#ef4444' };
  };

  const grade = getGrade();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">练习完成！</h2>
        <div className="result-grid">
          <div className="result-item">
            <div className="result-value" style={{ color: grade.color }}>{wpm}</div>
            <div className="result-label">WPM</div>
          </div>
          <div className="result-item">
            <div className="result-value">{accuracy}%</div>
            <div className="result-label">准确率</div>
          </div>
          <div className="result-item">
            <div className="result-value">{errors}</div>
            <div className="result-label">错误数</div>
          </div>
          <div className="result-item">
            <div className="result-value">{Math.round(duration / 1000)}秒</div>
            <div className="result-label">用时</div>
          </div>
        </div>
        <div className="grade-badge" style={{ backgroundColor: grade.color }}>
          {grade.text}
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>关闭</button>
          <button className="btn btn-primary" onClick={onRestart}>再来一次</button>
        </div>
      </div>
    </div>
  );
}