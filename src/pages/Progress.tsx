
import React, { useState } from 'react';
import ProgressChart from '@/components/progress/ProgressChart';
import { Camera } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';

const Progress = () => {
  const [activeTab, setActiveTab] = useState('metriche');
  
  const weightData = [
    { name: '1 Gen', value: 80 },
    { name: '15 Gen', value: 79 },
    { name: '1 Feb', value: 78 },
    { name: '15 Feb', value: 77 },
    { name: '1 Mar', value: 76 },
    { name: '15 Mar', value: 75 },
    { name: '1 Apr', value: 74 },
  ];
  
  const benchPressData = [
    { name: '1 Gen', value: 70 },
    { name: '15 Gen', value: 75 },
    { name: '1 Feb', value: 75 },
    { name: '15 Feb', value: 80 },
    { name: '1 Mar', value: 85 },
    { name: '15 Mar', value: 85 },
    { name: '1 Apr', value: 90 },
  ];

  return (
    <div className="gio-container">
      <div className="mb-6">
        <h1 className="gio-heading">I Tuoi Progressi</h1>
        
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'metriche'
                ? 'border-gio-orange text-white'
                : 'border-gio-gray text-gray-400'
            }`}
            onClick={() => setActiveTab('metriche')}
          >
            Metriche
          </button>
          <button
            className={`flex-1 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'foto'
                ? 'border-gio-orange text-white'
                : 'border-gio-gray text-gray-400'
            }`}
            onClick={() => setActiveTab('foto')}
          >
            Foto
          </button>
        </div>
      </div>
      
      {activeTab === 'metriche' ? (
        <div className="space-y-6">
          <ProgressChart
            data={weightData}
            title="Peso"
            metric="kg"
          />
          
          <ProgressChart
            data={benchPressData}
            title="Bench Press"
            metric="kg"
          />
          
          <div className="gio-card">
            <h3 className="gio-subheading">Le tue misure</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Petto</p>
                <p className="font-medium">98 cm</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Braccia</p>
                <p className="font-medium">38 cm</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Vita</p>
                <p className="font-medium">84 cm</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Gambe</p>
                <p className="font-medium">60 cm</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6 text-center">
            <ActionButton className="mx-auto mb-2">
              <Camera className="w-4 h-4 mr-2" />
              Aggiungi foto
            </ActionButton>
            <p className="text-sm text-gray-400">Monitora i tuoi progressi visivamente</p>
          </div>
          
          <div className="space-y-6">
            <div className="gio-card">
              <h3 className="gio-subheading">1 Aprile 2025</h3>
              <div className="bg-gio-gray rounded-lg h-48 flex items-center justify-center">
                <p className="text-gray-400">Nessuna foto caricata</p>
              </div>
            </div>
            
            <div className="gio-card">
              <h3 className="gio-subheading">1 Marzo 2025</h3>
              <div className="bg-gio-gray rounded-lg h-48 flex items-center justify-center">
                <p className="text-gray-400">Nessuna foto caricata</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;
