
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import WorkoutsPage from "./workouts/WorkoutsPage";

const Workouts = () => {
  const { user } = useAuth();
  
  return (
    <div className="pt-16">
      <WorkoutsPage />
    </div>
  );
};

export default Workouts;
