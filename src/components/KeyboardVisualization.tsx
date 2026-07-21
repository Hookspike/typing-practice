import { fingerMap, fingerNames } from '@/data/practiceData';

interface KeyboardVisualizationProps {
  currentKey: string;
  pressedKeys: Set<string>;
}

const keyboardRows = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
];

export function KeyboardVisualization({ currentKey, pressedKeys }: KeyboardVisualizationProps) {
  const getKeyClass = (key: string) => {
    const classes = ['key'];
    
    if (key === currentKey) {
      classes.push('current');
    }
    
    if (pressedKeys.has(key)) {
      classes.push('pressed');
    }
    
    const fingerInfo = fingerMap[key];
    if (fingerInfo) {
      classes.push(fingerInfo.hand);
    }
    
    return classes.join(' ');
  };

  const getFingerHint = (key: string) => {
    const fingerInfo = fingerMap[key];
    if (!fingerInfo) return null;
    
    return (
      <span className="finger-hint">
        {fingerInfo.hand === 'left' ? '左' : '右'}{fingerNames[fingerInfo.finger]}
      </span>
    );
  };

  return (
    <div className="keyboard-visualization">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map(key => (
            <div key={key} className={getKeyClass(key)}>
              <span className="key-label">{key}</span>
              {getFingerHint(key)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}