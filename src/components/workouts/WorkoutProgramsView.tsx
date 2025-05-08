
import React from "react";
import WorkoutProgramList from "./WorkoutProgramList";

interface WorkoutItem {
  id: number;
  title: string;
  duration: number;
  calories: number;
  type: string;
  level: "principiante" | "intermedio" | "avanzato";
}

interface Props {
  workouts: WorkoutItem[];
  onShowCompleted: () => void;
}

const WorkoutProgramsView: React.FC<Props> = ({
  workouts,
  onShowCompleted,
}) => (
  <WorkoutProgramList
    workouts={workouts}
    onShowCompleted={onShowCompleted}
  />
);

export default WorkoutProgramsView;
