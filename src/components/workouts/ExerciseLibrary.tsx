
import React from 'react';
import ExerciseItem from '@/components/workouts/ExerciseItem';
import ActionButton from '@/components/ui/ActionButton';

interface ExerciseData {
  id: number;
  name: string;
  sets: number;
  reps: number | string;
  imageUrl?: string;
}

interface ExerciseLibraryProps {
  exercises: ExerciseData[];
}

const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({ exercises }) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Libreria Esercizi</h2>
      <ActionButton variant="outline" size="sm">
        Filtri
      </ActionButton>
    </div>

    <div>
      {exercises.map((exercise) => (
        <ExerciseItem
          key={exercise.id}
          name={exercise.name}
          sets={exercise.sets}
          reps={exercise.reps}
        />
      ))}
    </div>
  </div>
);

export default ExerciseLibrary;

