import { useState, useMemo } from 'react';
import { TypingArea } from '@/components/TypingArea';
import { StatsPanel } from '@/components/StatsPanel';
import { ResultModal } from '@/components/ResultModal';
import { ComboDisplay } from '@/components/ComboDisplay';
import { useTyping } from '@/hooks/useTyping';
import { englishWords, chineseWords, englishParagraphs, chineseParagraphs, shuffleArray } from '@/data/practiceData';

type TestType = 'words' | 'paragraphs';
type Language = 'english' | 'chinese';
type Duration = 30 | 60 | 120;

export function TestPage() {
  const [testType, setTestType] = useState<TestType>('words');
  const [language, setLanguage] = useState<Language>('english');
  const [duration, setDuration] = useState<Duration>(60);
  const [isStarted, setIsStarted] = useState(false);

  const testText = useMemo(() => {
    if (testType === 'words') {
      const words = language === 'english' ? englishWords : chineseWords;
      return shuffleArray(words).slice(0, 100).join(' ');
    } else {
      const paragraphs = language === 'english' ? englishParagraphs : chineseParagraphs;
      return paragraphs.join(' ');
    }
  }, [testType, language]);

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
    handleKeyDown,
    handleCompositionEnd,
    reset 
  } = useTyping(testText, 'test', isStarted ? duration : undefined, language);

  const progress = testType === 'words' 
    ? Math.min((userInput.length / testText.length) * 100, 100)
    : Math.min((currentDuration / (duration * 1000)) * 100, 100);

  const timeRemaining = duration * 1000 - currentDuration;

  const handleStart = () => {
    setIsStarted(true);
    reset();
  };

  const handleReset = () => {
    setIsStarted(false);
    reset();
  };

  return (
    <div className="test-page">
      <div className="test-controls">
        <div className="control-group">
          <label>测试类型:</label>
          <div className="mode-buttons">
            <button
              className={`mode-btn ${testType === 'words' ? 'active' : ''}`}
              onClick={() => !isStarted && setTestType('words')}
            >
              单词
            </button>
            <button
              className={`mode-btn ${testType === 'paragraphs' ? 'active' : ''}`}
              onClick={() => !isStarted && setTestType('paragraphs')}
            >
              段落
            </button>
          </div>
        </div>
        <div className="control-group">
          <label>语言:</label>
          <div className="mode-buttons">
            <button
              className={`mode-btn ${language === 'english' ? 'active' : ''}`}
              onClick={() => !isStarted && setLanguage('english')}
            >
              英文
            </button>
            <button
              className={`mode-btn ${language === 'chinese' ? 'active' : ''}`}
              onClick={() => !isStarted && setLanguage('chinese')}
            >
              中文
            </button>
          </div>
        </div>
        <div className="control-group">
          <label>时长:</label>
          <div className="mode-buttons">
            {([30, 60, 120] as Duration[]).map(d => (
              <button
                key={d}
                className={`mode-btn ${duration === d ? 'active' : ''}`}
                onClick={() => !isStarted && setDuration(d)}
              >
                {d}秒
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {!isStarted ? (
        <div className="start-screen">
          <div className="start-icon">⏱️</div>
          <h2 className="start-title">准备好测试了吗？</h2>
          <p className="start-hint">按下开始按钮后，计时将立即开始</p>
          <button className="btn btn-primary btn-large" onClick={handleStart}>
            开始测试
          </button>
        </div>
      ) : (
        <>
          <div className="timer-display">
            <span className={`timer ${timeRemaining < 10000 ? 'warning' : ''}`}>
              {Math.ceil(timeRemaining / 1000)}秒
            </span>
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
            text={testText}
            userInput={userInput}
            isActive={isActive}
            onKeyDown={handleKeyDown}
            onCompositionEnd={handleCompositionEnd}
          />
          <div className="action-buttons">
            <button className="btn btn-secondary" onClick={handleReset}>
              重新开始
            </button>
          </div>
          {isFinished && (
            <ResultModal
              wpm={wpm}
              accuracy={accuracy}
              errors={errors}
              duration={currentDuration}
              onClose={() => handleReset()}
              onRestart={() => handleReset()}
            />
          )}
        </>
      )}
    </div>
  );
}