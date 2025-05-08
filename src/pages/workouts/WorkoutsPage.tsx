
import React, { useState } from "react";
import WorkoutTabs from "./WorkoutTabs";
import WorkoutProgramsView from "@/components/workouts/WorkoutProgramsView";
import ExerciseLibraryView from "@/components/workouts/ExerciseLibraryView";
import ExerciseSheetView from "@/components/workouts/ExerciseSheetView";
import CompletedWorkoutsView from "@/components/workouts/CompletedWorkoutsView";
import {
  workouts,
  completedWorkouts,
  exercises,
  sheets,
} from "./workoutMockData";

const WorkoutsPage = () => {
  const [activeTab, setActiveTab] = useState("programmi");
  const [showGlobalTimer, setShowGlobalTimer] = useState(false);
  const [showCompletedWorkouts, setShowCompletedWorkouts] = useState(false);

  const handleCompletedWorkoutsClick = () => setShowCompletedWorkouts(true);
  const handleBackClick = () => setShowCompletedWorkouts(false);

  if (showCompletedWorkouts) {
    return (
      <CompletedWorkoutsView
        completedWorkouts={completedWorkouts}
        onBack={handleBackClick}
      />
    );
  }

  return (
    <div className="gio-container">
      <WorkoutTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showGlobalTimer={showGlobalTimer}
        setShowGlobalTimer={setShowGlobalTimer}
      />
      {activeTab === "programmi" ? (
        <WorkoutProgramsView
          workouts={workouts}
          onShowCompleted={handleCompletedWorkoutsClick}
        />
      ) : activeTab === "esercizi" ? (
        <ExerciseLibraryView exercises={exercises} />
      ) : (
        <ExerciseSheetView sheets={sheets} />
      )}
    </div>
  );
};

export default WorkoutsPage;
