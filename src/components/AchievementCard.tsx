import { Achievement } from '@/utils/gameUtils';

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <div 
      className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
    >
      <div className="achievement-icon">
        {achievement.unlocked ? achievement.icon : '🔒'}
      </div>
      <div className="achievement-info">
        <h4 className="achievement-name">
          {achievement.unlocked ? achievement.name : '???'}
        </h4>
        <p className="achievement-description">
          {achievement.unlocked ? achievement.description : '解锁后显示描述'}
        </p>
      </div>
    </div>
  );
}