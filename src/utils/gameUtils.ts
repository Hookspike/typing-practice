export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface LevelInfo {
  level: number;
  name: string;
  minXP: number;
  color: string;
}

export const levels: LevelInfo[] = [
  { level: 1, name: '打字新手', minXP: 0, color: '#9ca3af' },
  { level: 2, name: '初级打字员', minXP: 100, color: '#22c55e' },
  { level: 3, name: '中级打字员', minXP: 300, color: '#3b82f6' },
  { level: 4, name: '高级打字员', minXP: 600, color: '#8b5cf6' },
  { level: 5, name: '打字高手', minXP: 1000, color: '#f59e0b' },
  { level: 6, name: '打字大师', minXP: 1500, color: '#ef4444' },
  { level: 7, name: '打字宗师', minXP: 2500, color: '#ec4899' },
  { level: 8, name: '键盘之神', minXP: 4000, color: '#06b6d4' },
];

export const achievements: Achievement[] = [
  { id: 'first_practice', name: '初次练习', description: '完成第一次打字练习', icon: '🎯', unlocked: false },
  { id: 'first_test', name: '初次测试', description: '完成第一次打字测试', icon: '📝', unlocked: false },
  { id: 'speed_50', name: '速度突破', description: '打字速度达到50 WPM', icon: '🚀', unlocked: false },
  { id: 'speed_100', name: '极速打字', description: '打字速度达到100 WPM', icon: '⚡', unlocked: false },
  { id: 'accuracy_90', name: '精准达人', description: '准确率达到90%', icon: '🎯', unlocked: false },
  { id: 'accuracy_99', name: '完美无瑕', description: '准确率达到99%', icon: '💎', unlocked: false },
  { id: 'combo_10', name: '连击新手', description: '达成10连击', icon: '🔥', unlocked: false },
  { id: 'combo_50', name: '连击大师', description: '达成50连击', icon: '💥', unlocked: false },
  { id: 'combo_100', name: '连击之神', description: '达成100连击', icon: '🌟', unlocked: false },
  { id: 'practice_10', name: '勤奋练习', description: '完成10次练习', icon: '📚', unlocked: false },
  { id: 'practice_50', name: '坚持不懈', description: '完成50次练习', icon: '🏆', unlocked: false },
  { id: 'chinese_master', name: '中文高手', description: '用中文完成10次练习', icon: '🇨🇳', unlocked: false },
  { id: 'english_master', name: '英文高手', description: '用英文完成10次练习', icon: '🇬🇧', unlocked: false },
];

export function calculateXP(wpm: number, accuracy: number, errors: number, mode: 'practice' | 'test'): number {
  const baseXP = Math.floor(wpm * (accuracy / 100));
  const errorPenalty = errors * 2;
  const modeBonus = mode === 'test' ? 2 : 1;
  return Math.max(0, baseXP * modeBonus - errorPenalty);
}

export function getLevel(xp: number): LevelInfo {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].minXP) {
      return levels[i];
    }
  }
  return levels[0];
}

export function getProgressToNextLevel(currentXP: number): { current: number; next: number; progress: number } {
  const currentLevel = getLevel(currentXP);
  const nextLevelIndex = levels.findIndex(l => l.level === currentLevel.level + 1);
  const nextLevel = nextLevelIndex >= 0 ? levels[nextLevelIndex] : null;
  
  if (!nextLevel) {
    return { current: currentXP, next: currentXP, progress: 100 };
  }
  
  const progress = ((currentXP - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100;
  return { current: currentXP, next: nextLevel.minXP, progress: Math.min(100, Math.max(0, progress)) };
}

export function saveGameState(state: GameState): void {
  localStorage.setItem('typingGameState', JSON.stringify(state));
}

export function loadGameState(): GameState {
  const saved = localStorage.getItem('typingGameState');
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    xp: 0,
    achievements: achievements.map(a => ({ ...a, unlocked: false })),
    practiceCount: 0,
    testCount: 0,
    maxCombo: 0,
    maxWPM: 0,
    maxAccuracy: 0,
    chinesePracticeCount: 0,
    englishPracticeCount: 0,
  };
}

export interface GameState {
  xp: number;
  achievements: Achievement[];
  practiceCount: number;
  testCount: number;
  maxCombo: number;
  maxWPM: number;
  maxAccuracy: number;
  chinesePracticeCount: number;
  englishPracticeCount: number;
}

export function checkAchievements(state: GameState, wpm: number, accuracy: number, combo: number, mode: 'practice' | 'test', language?: string): Achievement[] {
  const newlyUnlocked: Achievement[] = [];
  const updatedState = { ...state };

  if (!state.achievements.find(a => a.id === 'first_practice') && mode === 'practice') {
    newlyUnlocked.push({ ...achievements.find(a => a.id === 'first_practice')!, unlocked: true, unlockedAt: Date.now() });
    updatedState.achievements = updateAchievement(state.achievements, 'first_practice', true);
  }

  if (!state.achievements.find(a => a.id === 'first_test') && mode === 'test') {
    newlyUnlocked.push({ ...achievements.find(a => a.id === 'first_test')!, unlocked: true, unlockedAt: Date.now() });
    updatedState.achievements = updateAchievement(state.achievements, 'first_test', true);
  }

  if (!state.achievements.find(a => a.id === 'speed_50') && wpm >= 50) {
    newlyUnlocked.push({ ...achievements.find(a => a.id === 'speed_50')!, unlocked: true, unlockedAt: Date.now() });
    updatedState.achievements = updateAchievement(state.achievements, 'speed_50', true);
  }

  if (!state.achievements.find(a => a.id === 'speed_100') && wpm >= 100) {
    newlyUnlocked.push({ ...achievements.find(a => a.id === 'speed_100')!, unlocked: true, unlockedAt: Date.now() });
    updatedState.achievements = updateAchievement(state.achievements, 'speed_100', true);
  }

  if (!state.achievements.find(a => a.id === 'accuracy_90') && accuracy >= 90) {
    newlyUnlocked.push({ ...achievements.find(a => a.id === 'accuracy_90')!, unlocked: true, unlockedAt: Date.now() });
    updatedState.achievements = updateAchievement(state.achievements, 'accuracy_90', true);
  }

  if (!state.achievements.find(a => a.id === 'accuracy_99') && accuracy >= 99) {
    newlyUnlocked.push({ ...achievements.find(a => a.id === 'accuracy_99')!, unlocked: true, unlockedAt: Date.now() });
    updatedState.achievements = updateAchievement(state.achievements, 'accuracy_99', true);
  }

  if (!state.achievements.find(a => a.id === 'combo_10') && combo >= 10) {
    newlyUnlocked.push({ ...achievements.find(a => a.id === 'combo_10')!, unlocked: true, unlockedAt: Date.now() });
    updatedState.achievements = updateAchievement(state.achievements, 'combo_10', true);
  }

  if (!state.achievements.find(a => a.id === 'combo_50') && combo >= 50) {
    newlyUnlocked.push({ ...achievements.find(a => a.id === 'combo_50')!, unlocked: true, unlockedAt: Date.now() });
    updatedState.achievements = updateAchievement(state.achievements, 'combo_50', true);
  }

  if (!state.achievements.find(a => a.id === 'combo_100') && combo >= 100) {
    newlyUnlocked.push({ ...achievements.find(a => a.id === 'combo_100')!, unlocked: true, unlockedAt: Date.now() });
    updatedState.achievements = updateAchievement(state.achievements, 'combo_100', true);
  }

  if (!state.achievements.find(a => a.id === 'practice_10') && state.practiceCount >= 10) {
    newlyUnlocked.push({ ...achievements.find(a => a.id === 'practice_10')!, unlocked: true, unlockedAt: Date.now() });
    updatedState.achievements = updateAchievement(state.achievements, 'practice_10', true);
  }

  if (!state.achievements.find(a => a.id === 'practice_50') && state.practiceCount >= 50) {
    newlyUnlocked.push({ ...achievements.find(a => a.id === 'practice_50')!, unlocked: true, unlockedAt: Date.now() });
    updatedState.achievements = updateAchievement(state.achievements, 'practice_50', true);
  }

  if (!state.achievements.find(a => a.id === 'chinese_master') && state.chinesePracticeCount >= 10) {
    newlyUnlocked.push({ ...achievements.find(a => a.id === 'chinese_master')!, unlocked: true, unlockedAt: Date.now() });
    updatedState.achievements = updateAchievement(state.achievements, 'chinese_master', true);
  }

  if (!state.achievements.find(a => a.id === 'english_master') && state.englishPracticeCount >= 10) {
    newlyUnlocked.push({ ...achievements.find(a => a.id === 'english_master')!, unlocked: true, unlockedAt: Date.now() });
    updatedState.achievements = updateAchievement(state.achievements, 'english_master', true);
  }

  return newlyUnlocked;
}

function updateAchievement(achievements: Achievement[], id: string, unlocked: boolean): Achievement[] {
  return achievements.map(a => a.id === id ? { ...a, unlocked, unlockedAt: unlocked ? Date.now() : undefined } : a);
}