
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, ChevronRight } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';

interface ExerciseSheet {
  id: number;
  title: string;
  createdAt: string;
  exercisesCount: number;
}

interface ExerciseSheetListProps {
  sheets: ExerciseSheet[];
}

const ExerciseSheetList: React.FC<ExerciseSheetListProps> = ({ sheets }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Le Mie Schede</h2>
        <ActionButton variant="outline" size="sm">
          Nuova Scheda
        </ActionButton>
      </div>

      {sheets.length === 0 ? (
        <div className="text-center py-8 bg-gio-darkgray rounded-lg border border-gio-gray">
          <FileText className="w-12 h-12 text-gio-orange mx-auto mb-3" />
          <h3 className="text-lg font-medium mb-2">Nessuna scheda creata</h3>
          <p className="text-gray-400 mb-4">Crea una nuova scheda per organizzare i tuoi esercizi</p>
          <ActionButton>Crea Scheda</ActionButton>
        </div>
      ) : (
        sheets.map((sheet) => (
          <Card key={sheet.id} className="bg-gio-darkgray border-gio-gray hover:border-gio-orange transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-lg">{sheet.title}</h3>
                  <div className="text-sm text-gray-400">
                    <span>Creata il: {sheet.createdAt}</span>
                    <span className="mx-2">•</span>
                    <span>{sheet.exercisesCount} esercizi</span>
                  </div>
                </div>
                <ChevronRight className="text-gio-orange" />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ExerciseSheetList;
