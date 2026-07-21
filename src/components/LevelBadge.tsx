import { getLevel, getProgressToNextLevel } from '@/utils/gameUtils';

interface LevelBadgeProps {
  xp: number;
}

export function LevelBadge({ xp }: LevelBadgeProps) {
  const level = getLevel(xp);
  const progress = getProgressToNextLevel(xp);

  return (
    <div className="level-badge">
      <div className="level-info">
        <div className="level-icon" style={{ backgroundColor: level.color }}>
          {level.level}
        </div>
        <div className="level-text">
          <span className="level-name">{level.name}</span>
          <span className="level-xp">{progress.current} XP</span>
        </div>
      </div>
      <div className="level-progress">
        <div 
          className="level-progress-fill" 
          style={{ width: `${progress.progress}%`, backgroundColor: level.color }}
        />
      </div>
      {progress.progress < 100 && (
        <span className="level-next">下一级: {progress.next} XP</span>
      )}
    </div>
  );
}