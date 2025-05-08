
import React from "react";
import ExerciseSheetList from "./ExerciseSheetList";

interface ExerciseSheet {
  id: number;
  title: string;
  createdAt: string;
  exercisesCount: number;
}

interface Props {
  sheets: ExerciseSheet[];
}

const ExerciseSheetView: React.FC<Props> = ({ sheets }) => (
  <ExerciseSheetList sheets={sheets} />
);

export default ExerciseSheetView;
