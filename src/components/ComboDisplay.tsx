import { useEffect, useState } from 'react';

interface ComboDisplayProps {
  combo: number;
}

export function ComboDisplay({ combo }: ComboDisplayProps) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (combo > 0 && combo % 10 === 0) {
      setShowAnimation(true);
      const timer = setTimeout(() => setShowAnimation(false), 500);
      return () => clearTimeout(timer);
    }
  }, [combo]);

  if (combo < 5) return null;

  return (
    <div className={`combo-display ${showAnimation ? 'combo-pulse' : ''}`}>
      <span className="combo-number">{combo}</span>
      <span className="combo-label">连击!</span>
    </div>
  );
}