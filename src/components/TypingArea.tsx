import { useEffect, useRef, useState } from 'react';

interface TypingAreaProps {
  text: string;
  userInput: string;
  isActive: boolean;
  onKeyDown: (e: KeyboardEvent) => void;
  onCompositionEnd: (e: CompositionEvent) => void;
}

export function TypingArea({ text, userInput, isActive, onKeyDown, onCompositionEnd }: TypingAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      onKeyDown(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  useEffect(() => {
    if (inputRef.current && !isComposing) {
      inputRef.current.value = userInput;
      inputRef.current.scrollTop = inputRef.current.scrollHeight;
    }
  }, [userInput, isComposing]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isComposing) {
      const newValue = e.target.value;
      const diff = newValue.length - userInput.length;
      
      if (diff > 0) {
        const addedChars = newValue.slice(userInput.length);
        const syntheticEvent = new KeyboardEvent('keydown', {
          key: addedChars,
          bubbles: true,
        });
        onKeyDown(syntheticEvent);
      } else if (diff < 0) {
        const syntheticEvent = new KeyboardEvent('keydown', {
          key: 'Backspace',
          bubbles: true,
        });
        onKeyDown(syntheticEvent);
      }
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (e: React.CompositionEvent) => {
    setIsComposing(false);
    onCompositionEnd(e);
  };

  const renderCharacter = (char: string, index: number) => {
    let className = 'char';
    
    if (index < userInput.length) {
      className += char === userInput[index] ? ' correct' : ' incorrect';
    } else if (index === userInput.length) {
      className += ' current';
    }

    return (
      <span key={index} className={className}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    );
  };

  return (
    <div className="typing-area">
      <div className="text-display">
        {text.split('').map((char, index) => renderCharacter(char, index))}
      </div>
      <textarea
        ref={inputRef}
        className="hidden-input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        value={userInput}
        onChange={handleInput}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
    </div>
  );
}
