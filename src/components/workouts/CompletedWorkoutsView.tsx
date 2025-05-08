
import React from "react";
import CompletedWorkouts from "./CompletedWorkouts";

interface CompletedWorkout {
  id: number;
  title: string;
  duration: number;
  calories: number;
  type: string;
  level: "principiante" | "intermedio" | "avanzato";
  date: string;
}

interface Props {
  completedWorkouts: CompletedWorkout[];
  onBack: () => void;
}

const CompletedWorkoutsView: React.FC<Props> = ({
  completedWorkouts,
  onBack,
}) => (
  <CompletedWorkouts workouts={completedWorkouts} onBack={onBack} />
);

export default CompletedWorkoutsView;
