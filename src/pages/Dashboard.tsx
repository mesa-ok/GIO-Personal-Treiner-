
import React from 'react';
import { Dumbbell, Apple, Zap } from 'lucide-react';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import WorkoutCard from '@/components/workouts/WorkoutCard';
import RecentNotifications from '@/components/dashboard/RecentNotifications';
import NutritionPlan from '@/components/dashboard/NutritionPlan';
import UpcomingAppointments from '@/components/dashboard/UpcomingAppointments';

const Dashboard = () => {
  const suggestedWorkouts = [
    {
      id: 1,
      title: 'Full Body Workout',
      duration: 45,
      calories: 350,
      type: 'Con attrezzi',
      level: 'intermedio' as const,
    },
    {
      id: 2,
      title: 'Cardio Intenso',
      duration: 30,
      calories: 400,
      type: 'Cardio',
      level: 'avanzato' as const,
    },
  ];

  return (
    <div className="gio-container">
      <DashboardSummary />
      
      <RecentNotifications />
      
      <UpcomingAppointments />
      
      <section className="mb-6">
        <h2 className="gio-heading flex items-center gap-2">
          <Dumbbell className="text-gio-orange" />
          Allenamenti suggeriti
        </h2>
        <div className="space-y-4">
          {suggestedWorkouts.map((workout) => (
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
      </section>
      
      <section className="mb-6">
        <h2 className="gio-heading flex items-center gap-2">
          <Apple className="text-gio-orange" />
          Piano nutrizionale
        </h2>
        <NutritionPlan />
      </section>
      
      <section>
        <h2 className="gio-heading flex items-center gap-2">
          <Zap className="text-gio-orange" />
          Obiettivi della settimana
        </h2>
        <div className="gio-card">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <p className="font-medium">Allenamenti</p>
                <p className="text-gio-orange">3/4</p>
              </div>
              <div className="h-2 bg-gio-gray rounded-full overflow-hidden">
                <div className="h-full bg-gio-orange w-[75%] rounded-full"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <p className="font-medium">Acqua</p>
                <p className="text-gio-orange">1.5/2 L</p>
              </div>
              <div className="h-2 bg-gio-gray rounded-full overflow-hidden">
                <div className="h-full bg-gio-orange w-[75%] rounded-full"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <p className="font-medium">Proteine</p>
                <p className="text-gio-orange">120/140 g</p>
              </div>
              <div className="h-2 bg-gio-gray rounded-full overflow-hidden">
                <div className="h-full bg-gio-orange w-[85%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
