import { useEffect, useRef } from 'react';

interface TypingAreaProps {
  text: string;
  userInput: string;
  isActive: boolean;
  onKeyDown: (e: KeyboardEvent) => void;
}

export function TypingArea({ text, userInput, isActive, onKeyDown }: TypingAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

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
      <input
        ref={inputRef}
        type="text"
        className="hidden-input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        readOnly
      />
    </div>
  );
}