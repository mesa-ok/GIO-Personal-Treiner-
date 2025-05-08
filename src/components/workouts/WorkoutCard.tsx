
import React from 'react';
import { Timer, Flame, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkoutCardProps {
  title: string;
  duration: number;
  calories: number;
  type: string;
  level: 'principiante' | 'intermedio' | 'avanzato';
  className?: string;
  onClick?: () => void;
}

const WorkoutCard = ({
  title,
  duration,
  calories,
  type,
  level,
  className,
  onClick
}: WorkoutCardProps) => {
  const levelColors = {
    principiante: 'bg-green-500',
    intermedio: 'bg-yellow-500',
    avanzato: 'bg-red-500',
  };
  
  return (
    <div 
      className={cn("gio-card cursor-pointer transition-transform hover:translate-y-[-2px]", className)}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="inline-block px-2 py-1 bg-gio-gray rounded-full text-xs text-gray-300 mb-2">
            {type}
          </span>
          <h3 className="gio-subheading mb-1">{title}</h3>
        </div>
        <span className={`w-3 h-3 rounded-full ${levelColors[level]}`} />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <div className="flex items-center gap-1 text-gray-400">
            <Timer className="w-4 h-4" />
            <span className="text-sm">{duration} min</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Flame className="w-4 h-4 text-gio-orange" />
            <span className="text-sm">{calories} kcal</span>
          </div>
        </div>
        <ChevronRight className="text-gio-orange" />
      </div>
    </div>
  );
};

export default WorkoutCard;
