import { useRef, useState, useEffect } from 'react';
import Crosshair from './Crosshair';

const SHOOT_SOUND = '/sounds/click.mp3';

interface CrosshairLoadingScreenProps {
  progress: number;
  onComplete: () => void;
}

const CrosshairLoadingScreen: React.FC<CrosshairLoadingScreenProps> = ({ progress, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [shot, setShot] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      setReady(true);
    }
  }, [progress]);

  const handleShoot = () => {
    if (!ready || shot) return;
    setShot(true);
    // Play sound
    const audio = new Audio(SHOOT_SOUND);
    audio.play();
    // Flash effect
    if (containerRef.current) {
      containerRef.current.style.transition = 'background 0.2s';
      containerRef.current.style.background = 'white';
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.background = '';
        }
        setTimeout(onComplete, 200);
      }, 120);
    } else {
      setTimeout(onComplete, 320);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      style={{ cursor: ready ? 'crosshair' : 'wait', transition: 'background 0.2s' }}
      onClick={handleShoot}
    >
      <Crosshair color="#fff" containerRef={containerRef} />
      {/* Progress/Ready Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="text-lg font-mono text-white mb-2">
          {ready ? (shot ? 'Entering...' : 'Shoot to Enter') : 'Loading...'}
        </div>
        <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-white/60 tracking-widest">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default CrosshairLoadingScreen; 