import { useState, useEffect } from 'react';
import { AchievementCard } from '@/components/AchievementCard';
import { LevelBadge } from '@/components/LevelBadge';
import { loadGameState } from '@/utils/gameUtils';

export function AchievementsPage() {
  const [gameState, setGameState] = useState(() => loadGameState());

  useEffect(() => {
    setGameState(loadGameState());
  }, []);

  const unlockedCount = gameState.achievements.filter(a => a.unlocked).length;
  const totalCount = gameState.achievements.length;

  return (
    <div className="achievements-page">
      <h2 className="page-title">🏆 成就与等级</h2>
      
      <LevelBadge xp={gameState.xp} />

      <div className="achievements-summary">
        <div className="summary-stat">
          <span className="stat-value">{unlockedCount}</span>
          <span className="stat-label">已解锁成就</span>
        </div>
        <div className="summary-stat">
          <span className="stat-value">{totalCount}</span>
          <span className="stat-label">总成就数</span>
        </div>
        <div className="summary-stat">
          <span className="stat-value">{gameState.maxWPM}</span>
          <span className="stat-label">最高WPM</span>
        </div>
        <div className="summary-stat">
          <span className="stat-value">{gameState.maxCombo}</span>
          <span className="stat-label">最高连击</span>
        </div>
      </div>

      <div className="achievements-grid">
        {gameState.achievements.map(achievement => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}