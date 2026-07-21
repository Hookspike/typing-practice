import { useState, useEffect, useMemo } from 'react';
import { TypingArea } from '@/components/TypingArea';
import { StatsPanel } from '@/components/StatsPanel';
import { KeyboardVisualization } from '@/components/KeyboardVisualization';
import { ResultModal } from '@/components/ResultModal';
import { ComboDisplay } from '@/components/ComboDisplay';
import { useTyping } from '@/hooks/useTyping';
import { 
  letterGroups, 
  englishWords, 
  chineseWords, 
  englishSentences, 
  chineseSentences,
  englishParagraphs,
  chineseParagraphs,
  shuffleArray 
} from '@/data/practiceData';

type PracticeMode = 'letters' | 'words' | 'sentences' | 'paragraphs';
type Language = 'english' | 'chinese';

export function PracticePage() {
  const [mode, setMode] = useState<PracticeMode>('letters');
  const [language, setLanguage] = useState<Language>('english');
  const [selectedLetterGroup, setSelectedLetterGroup] = useState(0);
  
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const practiceText = useMemo(() => {
    switch (mode) {
      case 'letters':
        const letters = letterGroups[selectedLetterGroup].letters;
        const shuffledLetters = shuffleArray(letters.split(''));
        return shuffledLetters.join(' ').repeat(3);
      case 'words':
        const words = language === 'english' ? englishWords : chineseWords;
        return shuffleArray(words).slice(0, 20).join(' ');
      case 'sentences':
        const sentences = language === 'english' ? englishSentences : chineseSentences;
        return shuffleArray(sentences).slice(0, 3).join(' ');
      case 'paragraphs':
        const paragraphs = language === 'english' ? englishParagraphs : chineseParagraphs;
        return paragraphs[Math.floor(Math.random() * paragraphs.length)];
      default:
        return '';
    }
  }, [mode, language, selectedLetterGroup]);

  const { 
    userInput, 
    isActive, 
    isFinished, 
    errors, 
    correctChars,
    currentDuration,
    wpm,
    accuracy,
    combo,
    handleInput,
    handleBackspace,
    reset 
  } = useTyping(practiceText, 'practice', undefined, language);

  const currentKey = practiceText[userInput.length]?.toLowerCase();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        setPressedKeys(prev => new Set([...prev, e.key.toLowerCase()]));
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        setPressedKeys(prev => {
          const next = new Set(prev);
          next.delete(e.key.toLowerCase());
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const progress = practiceText.length > 0 
    ? (userInput.length / practiceText.length) * 100 
    : 0;

  return (
    <div className="practice-page">
      <div className="practice-controls">
        <div className="control-group">
          <label>模式:</label>
          <div className="mode-buttons">
            {(['letters', 'words', 'sentences', 'paragraphs'] as PracticeMode[]).map(m => (
              <button
                key={m}
                className={`mode-btn ${mode === m ? 'active' : ''}`}
                onClick={() => { setMode(m); reset(); }}
              >
                {m === 'letters' ? '字母' : m === 'words' ? '单词' : m === 'sentences' ? '句子' : '段落'}
              </button>
            ))}
          </div>
        </div>
        <div className="control-group">
          <label>语言:</label>
          <div className="mode-buttons">
            <button
              className={`mode-btn ${language === 'english' ? 'active' : ''}`}
              onClick={() => { setLanguage('english'); reset(); }}
            >
              英文
            </button>
            <button
              className={`mode-btn ${language === 'chinese' ? 'active' : ''}`}
              onClick={() => { setLanguage('chinese'); reset(); }}
            >
              中文
            </button>
          </div>
        </div>
        {mode === 'letters' && (
          <div className="control-group">
            <label>键位组:</label>
            <select 
              value={selectedLetterGroup} 
              onChange={(e) => { setSelectedLetterGroup(Number(e.target.value)); reset(); }}
              className="select-input"
            >
              {letterGroups.map((group, index) => (
                <option key={index} value={index}>
                  {group.name} - {group.description}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <StatsPanel 
        wpm={wpm} 
        accuracy={accuracy} 
        errors={errors} 
        duration={currentDuration}
        progress={progress}
      />
      <ComboDisplay combo={combo} />
      <TypingArea 
        text={practiceText}
        userInput={userInput}
        isActive={isActive}
        onInput={handleInput}
        onBackspace={handleBackspace}
      />
      <KeyboardVisualization 
        currentKey={currentKey || ''}
        pressedKeys={pressedKeys}
      />
      <div className="action-buttons">
        <button className="btn btn-primary" onClick={reset}>
          重新开始
        </button>
      </div>
      {isFinished && (
        <ResultModal
          wpm={wpm}
          accuracy={accuracy}
          errors={errors}
          duration={currentDuration}
          onClose={() => reset()}
          onRestart={() => reset()}
        />
      )}
    </div>
  );
}