
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';

interface WorkoutTimerProps {
  initialTime?: number; // in seconds
  onComplete?: () => void;
  autoStart?: boolean;
}

const WorkoutTimer = ({ 
  initialTime = 30, 
  onComplete, 
  autoStart = false 
}: WorkoutTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(autoStart);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    audioRef.current = new Audio('/timer-beep.mp3');
    
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);
  
  useEffect(() => {
    if (timeLeft === 0) {
      handleTimerComplete();
    }
  }, [timeLeft]);
  
  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isActive]);
  
  const handleTimerComplete = () => {
    setIsActive(false);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    
    if (soundEnabled && audioRef.current) {
      audioRef.current.play().catch(err => console.error('Error playing sound:', err));
      // Add vibration if browser supports it
      if (navigator.vibrate) {
        navigator.vibrate(500);
      }
    }
    
    if (onComplete) onComplete();
  };
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  };
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const progressPercentage = (timeLeft / initialTime) * 100;
  
  return (
    <div className="gio-card">
      <div className="mb-4 relative">
        <svg className="w-full" viewBox="0 0 100 8" preserveAspectRatio="none">
          <rect 
            x="0" 
            y="0" 
            width="100" 
            height="8" 
            rx="4" 
            fill="#333"
          />
          <rect 
            x="0" 
            y="0" 
            width={`${progressPercentage}`} 
            height="8" 
            rx="4" 
            fill="#f97316"
          />
        </svg>
      </div>
      
      <div className="text-center mb-4">
        <h3 className="text-4xl font-bold">{formatTime(timeLeft)}</h3>
      </div>
      
      <div className="flex justify-center space-x-4">
        <ActionButton onClick={toggleTimer} variant="default" className="rounded-full w-14 h-14 p-0 flex items-center justify-center">
          {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </ActionButton>
        
        <ActionButton onClick={resetTimer} variant="outline" className="rounded-full w-14 h-14 p-0 flex items-center justify-center">
          <RotateCcw className="w-6 h-6" />
        </ActionButton>
        
        <ActionButton onClick={toggleSound} variant="ghost" className="rounded-full w-14 h-14 p-0 flex items-center justify-center">
          {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </ActionButton>
      </div>
    </div>
  );
};

export default WorkoutTimer;
