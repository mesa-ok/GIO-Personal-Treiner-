
import React, { useState } from 'react';
import { Play, Clock, Timer } from 'lucide-react';
import WorkoutTimer from './WorkoutTimer';
import TabataTimer from './TabataTimer';

interface ExerciseItemProps {
  name: string;
  sets: number;
  reps: number | string;
  imageUrl?: string;
}

const ExerciseItem = ({ name, sets, reps, imageUrl }: ExerciseItemProps) => {
  const [showTimer, setShowTimer] = useState(false);
  const [timerType, setTimerType] = useState<'standard' | 'tabata'>('standard');

  const toggleTimer = (type: 'standard' | 'tabata') => {
    if (showTimer && timerType === type) {
      setShowTimer(false);
    } else {
      setTimerType(type);
      setShowTimer(true);
    }
  };

  return (
    <div className="mb-6">
      <div className="gio-card flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 rounded bg-gio-gray overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-xl font-bold text-gio-orange">EX</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Play className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-gray-400">{sets} set × {reps}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => toggleTimer('standard')}
            className="w-8 h-8 rounded-full bg-gio-gray flex items-center justify-center hover:bg-gio-orange/20 transition-colors"
          >
            <Clock className="w-4 h-4 text-gio-orange" />
          </button>
          <button 
            onClick={() => toggleTimer('tabata')}
            className="w-8 h-8 rounded-full bg-gio-gray flex items-center justify-center hover:bg-gio-orange/20 transition-colors"
          >
            <Timer className="w-4 h-4 text-gio-orange" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gio-gray flex items-center justify-center">
            <Play className="w-4 h-4 text-gio-orange" />
          </div>
        </div>
      </div>

      {showTimer && (
        <div className="mt-2 mb-4">
          {timerType === 'standard' ? (
            <WorkoutTimer initialTime={60} />
          ) : (
            <TabataTimer workSeconds={30} restSeconds={15} rounds={4} />
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseItem;
