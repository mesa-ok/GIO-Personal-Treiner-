
import React from 'react';
import WorkoutCard from '@/components/workouts/WorkoutCard';
import ActionButton from '@/components/ui/ActionButton';

interface WorkoutItem {
  id: number;
  title: string;
  duration: number;
  calories: number;
  type: string;
  level: 'principiante' | 'intermedio' | 'avanzato';
}

interface WorkoutProgramListProps {
  workouts: WorkoutItem[];
  onShowCompleted: () => void;
}

const WorkoutProgramList: React.FC<WorkoutProgramListProps> = ({ workouts, onShowCompleted }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">I Tuoi Programmi</h2>
      <div className="flex gap-2">
        <ActionButton
          variant="outline"
          size="sm"
          onClick={onShowCompleted}
        >
          Allenamenti eseguiti
        </ActionButton>
        <ActionButton variant="outline" size="sm">
          Filtri
        </ActionButton>
      </div>
    </div>

    {workouts.map((workout) => (
      <WorkoutCard
        key={workout.id}
        title={workout.title}
        duration={workout.duration}
        calories={workout.calories}
        type={workout.type}
        level={workout.level}
      />
    ))}
  </div>
);

export default WorkoutProgramList;

