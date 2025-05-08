
import React from 'react';
import { Search, Calendar, Check, ArrowLeft } from 'lucide-react';
import WorkoutCard from '@/components/workouts/WorkoutCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CompletedWorkout {
  id: number;
  title: string;
  duration: number;
  calories: number;
  type: string;
  level: 'principiante' | 'intermedio' | 'avanzato';
  date: string;
}

interface CompletedWorkoutsProps {
  workouts: CompletedWorkout[];
  onBack: () => void;
}

const CompletedWorkouts: React.FC<CompletedWorkoutsProps> = ({ workouts, onBack }) => (
  <div className="gio-container">
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <Button
          variant="ghost"
          className="mr-2 p-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="gio-heading">Allenamenti Eseguiti</h1>
      </div>

      <div className="flex items-center bg-gio-darkgray border border-gio-gray rounded-lg px-3 py-2 mb-4">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Cerca allenamenti completati..."
          className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-400"
        />
      </div>
    </div>

    <div className="space-y-4">
      {workouts.map((workout) => (
        <Card key={workout.id} className="bg-gio-darkgray border-gio-gray">
          <CardContent className="p-4">
            <WorkoutCard
              title={workout.title}
              duration={workout.duration}
              calories={workout.calories}
              type={workout.type}
              level={workout.level}
            />
            <div className="mt-2 flex justify-between items-center">
              <div className="flex items-center text-gray-400">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">{workout.date}</span>
              </div>
              <div className="flex items-center text-green-500">
                <Check className="w-4 h-4 mr-1" />
                <span className="text-sm">Completato</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default CompletedWorkouts;

