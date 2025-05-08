
import React from 'react';
import { Calendar, Timer, Flame } from 'lucide-react';
import ActionButton from '../ui/ActionButton';

const DashboardSummary = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="gio-heading text-3xl">
          <span className="gio-gradient-text">Ciao, Atleta</span>
        </h1>
        <div className="bg-gio-gray rounded-full p-2">
          <Calendar className="w-5 h-5 text-gio-orange" />
        </div>
      </div>
      
      <div className="gio-card mb-6">
        <h2 className="font-medium text-gray-400 mb-1">Il tuo prossimo allenamento</h2>
        <h3 className="gio-subheading">Allenamento Completo</h3>
        
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-1 text-gray-400">
            <Timer className="w-4 h-4" />
            <span className="text-sm">45 min</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Flame className="w-4 h-4 text-gio-orange" />
            <span className="text-sm">350 kcal</span>
          </div>
        </div>
        
        <ActionButton>
          Inizia ora
        </ActionButton>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="gio-card">
          <h3 className="text-lg font-medium mb-2">Progressi</h3>
          <div className="flex items-center justify-between">
            <div className="relative h-16 w-16">
              <svg className="h-16 w-16" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#2D2D2D"
                  strokeWidth="2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#FF5500"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset="25"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium">
                75%
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Settimana</p>
              <p className="font-medium">3 di 4</p>
            </div>
          </div>
        </div>
        
        <div className="gio-card">
          <h3 className="text-lg font-medium mb-2">Nutrizione</h3>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-gio-orange">
              1850
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Calorie</p>
              <p className="font-medium">Oggi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
