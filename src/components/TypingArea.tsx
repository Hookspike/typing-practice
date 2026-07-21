import { useEffect, useRef, useState } from 'react';

interface TypingAreaProps {
  text: string;
  userInput: string;
  isActive: boolean;
  onInput: (input: string) => void;
  onBackspace: () => void;
}

export function TypingArea({ text, userInput, isActive, onInput, onBackspace }: TypingAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [composingText, setComposingText] = useState('');

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  useEffect(() => {
    if (inputRef.current && !isComposing) {
      inputRef.current.value = userInput + composingText;
    }
  }, [userInput, composingText, isComposing]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    if (isComposing) {
      setComposingText(newValue.slice(userInput.length));
    } else {
      const diff = newValue.length - userInput.length;
      
      if (diff > 0) {
        const addedChars = newValue.slice(userInput.length);
        onInput(addedChars);
      } else if (diff < 0) {
        onBackspace();
      }
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
    setComposingText('');
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
    if (composingText) {
      onInput(composingText);
      setComposingText('');
    }
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
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
    </div>
  );
}
