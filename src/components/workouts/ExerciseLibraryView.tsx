
import React from "react";
import ExerciseLibrary from "./ExerciseLibrary";

interface ExerciseData {
  id: number;
  name: string;
  sets: number;
  reps: number | string;
  imageUrl?: string;
}

interface Props {
  exercises: ExerciseData[];
}

const ExerciseLibraryView: React.FC<Props> = ({ exercises }) => (
  <ExerciseLibrary exercises={exercises} />
);

export default ExerciseLibraryView;
