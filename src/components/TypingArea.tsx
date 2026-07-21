import { useEffect, useRef } from 'react';

interface TypingAreaProps {
  text: string;
  userInput: string;
  isActive: boolean;
  onKeyDown: (e: KeyboardEvent) => void;
  onCompositionEnd: (e: CompositionEvent) => void;
}

export function TypingArea({ text, userInput, isActive, onKeyDown, onCompositionEnd }: TypingAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      onKeyDown(e);
    };

    const handleCompositionEnd = (e: CompositionEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      onCompositionEnd(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('compositionend', handleCompositionEnd);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('compositionend', handleCompositionEnd);
    };
  }, [onKeyDown, onCompositionEnd]);

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
        onCompositionEnd={onCompositionEnd}
      />
    </div>
  );
}