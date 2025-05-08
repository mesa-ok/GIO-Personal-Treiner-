
import React from "react";
import { Search, Timer as TimerIcon } from "lucide-react";
import ActionButton from "@/components/ui/ActionButton";
import TabataTimer from "@/components/workouts/TabataTimer";

interface WorkoutTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showGlobalTimer: boolean;
  setShowGlobalTimer: (v: boolean) => void;
}

const WorkoutTabs: React.FC<WorkoutTabsProps> = ({
  activeTab,
  setActiveTab,
  showGlobalTimer,
  setShowGlobalTimer,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <h1 className="gio-heading">Allenamenti</h1>
        <ActionButton
          onClick={() => setShowGlobalTimer(!showGlobalTimer)}
          variant="ghost"
          size="sm"
          className="flex items-center"
        >
          <TimerIcon className="mr-2 h-4 w-4" />
          {showGlobalTimer ? "Nascondi Timer" : "Timer"}
        </ActionButton>
      </div>

      {showGlobalTimer && (
        <div className="mb-4">
          <TabataTimer workSeconds={40} restSeconds={20} rounds={8} />
        </div>
      )}

      <div className="flex items-center bg-gio-darkgray border border-gio-gray rounded-lg px-3 py-2 mb-4">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Cerca allenamenti o esercizi..."
          className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-400"
        />
      </div>

      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 border-b-2 font-medium transition-colors ${
            activeTab === "programmi"
              ? "border-gio-orange text-white"
              : "border-gio-gray text-gray-400"
          }`}
          onClick={() => setActiveTab("programmi")}
        >
          Programmi
        </button>
        <button
          className={`flex-1 py-2 border-b-2 font-medium transition-colors ${
            activeTab === "esercizi"
              ? "border-gio-orange text-white"
              : "border-gio-gray text-gray-400"
          }`}
          onClick={() => setActiveTab("esercizi")}
        >
          Esercizi
        </button>
        <button
          className={`flex-1 py-2 border-b-2 font-medium transition-colors ${
            activeTab === "schede"
              ? "border-gio-orange text-white"
              : "border-gio-gray text-gray-400"
          }`}
          onClick={() => setActiveTab("schede")}
        >
          Schede
        </button>
      </div>
    </div>
  );
};

export default WorkoutTabs;
