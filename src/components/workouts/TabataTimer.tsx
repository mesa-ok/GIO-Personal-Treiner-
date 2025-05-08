
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Dumbbell, Clock } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';
import { cn } from '@/lib/utils';

interface TabataTimerProps {
  workSeconds?: number;
  restSeconds?: number;
  rounds?: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

const TabataTimer = ({
  workSeconds = 30,
  restSeconds = 15,
  rounds = 8,
  onComplete,
  autoStart = false
}: TabataTimerProps) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [timeLeft, setTimeLeft] = useState(workSeconds);
  const [isActive, setIsActive] = useState(autoStart);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const intervalRef = useRef<number | null>(null);
  const workAudioRef = useRef<HTMLAudioElement | null>(null);
  const restAudioRef = useRef<HTMLAudioElement | null>(null);
  const completeAudioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    workAudioRef.current = new Audio('/work-beep.mp3');
    restAudioRef.current = new Audio('/rest-beep.mp3');
    completeAudioRef.current = new Audio('/complete-beep.mp3');
    
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);
  
  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 1) return prevTime - 1;
          
          // Time reached zero, handle phase change
          if (isWorkPhase) {
            if (currentRound < rounds) {
              playSound(restAudioRef.current);
              setIsWorkPhase(false);
              return restSeconds;
            } else {
              // Workout complete
              handleWorkoutComplete();
              return 0;
            }
          } else {
            // End of rest phase, start next round
            playSound(workAudioRef.current);
            setIsWorkPhase(true);
            setCurrentRound(prevRound => prevRound + 1);
            return workSeconds;
          }
        });
      }, 1000);
    } else if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isActive, isWorkPhase, currentRound, rounds, workSeconds, restSeconds]);
  
  const playSound = (audio: HTMLAudioElement | null) => {
    if (soundEnabled && audio) {
      audio.play().catch(err => console.error('Error playing sound:', err));
      // Add vibration if browser supports it
      if (navigator.vibrate) {
        navigator.vibrate(500);
      }
    }
  };
  
  const handleWorkoutComplete = () => {
    setIsActive(false);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    
    playSound(completeAudioRef.current);
    
    if (onComplete) onComplete();
  };
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setCurrentRound(1);
    setIsWorkPhase(true);
    setTimeLeft(workSeconds);
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
  const currentPhaseTime = isWorkPhase ? workSeconds : restSeconds;
  const progressPercentage = (timeLeft / currentPhaseTime) * 100;
  
  return (
    <div className="gio-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Tabata Timer</h3>
        <div className="text-sm text-gray-400">Round {currentRound}/{rounds}</div>
      </div>
      
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
            fill={isWorkPhase ? "#f97316" : "#22c55e"}
          />
        </svg>
      </div>
      
      <div className="text-center mb-6">
        <div className={cn(
          "inline-block px-3 py-1 rounded-full text-sm font-medium mb-2",
          isWorkPhase ? "bg-gio-orange text-black" : "bg-green-600 text-white"
        )}>
          {isWorkPhase ? (
            <span className="flex items-center">
              <Dumbbell className="w-4 h-4 mr-1" /> LAVORO
            </span>
          ) : (
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" /> RECUPERO
            </span>
          )}
        </div>
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

export default TabataTimer;
