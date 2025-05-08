
import React from 'react';
import { Apple, Coffee, Utensils, Moon } from 'lucide-react';
import ActionButton from '../ui/ActionButton';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type Meal = {
  id: number;
  name: string;
  time: string;
  foods: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

const meals: Meal[] = [
  {
    id: 1,
    name: "Colazione",
    time: "8:00",
    foods: ["Avocado toast", "Uova strapazzate", "Caffè"],
    calories: 450,
    protein: 22,
    carbs: 35,
    fat: 28
  },
  {
    id: 2,
    name: "Pranzo",
    time: "13:00",
    foods: ["Insalata di pollo", "Patate dolci", "Broccoli"],
    calories: 550,
    protein: 40,
    carbs: 45,
    fat: 20
  },
  {
    id: 3,
    name: "Spuntino",
    time: "16:00",
    foods: ["Yogurt greco", "Frutta secca", "Banana"],
    calories: 300,
    protein: 15,
    carbs: 35,
    fat: 12
  },
  {
    id: 4,
    name: "Cena",
    time: "20:00",
    foods: ["Salmone al forno", "Quinoa", "Verdure miste"],
    calories: 600,
    protein: 45,
    carbs: 40,
    fat: 25
  }
];

const getMealIcon = (mealName: string) => {
  switch (mealName) {
    case "Colazione":
      return Coffee;
    case "Pranzo":
      return Utensils;
    case "Spuntino":
      return Apple;
    case "Cena":
      return Moon;
    default:
      return Utensils;
  }
};

const NutritionPlan = () => {
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Calorie Totali</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gio-orange">{totalCalories}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Proteine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gio-orange">{totalProtein}g</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Carboidrati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gio-orange">{totalCarbs}g</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Grassi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gio-orange">{totalFat}g</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {meals.map((meal) => {
          const Icon = getMealIcon(meal.name);
          return (
            <Card key={meal.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gio-gray rounded-full">
                      <Icon className="w-5 h-5 text-gio-orange" />
                    </div>
                    <div>
                      <h3 className="font-medium">{meal.name}</h3>
                      <p className="text-sm text-gray-400">{meal.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{meal.calories} kcal</p>
                    <p className="text-sm text-gray-400">
                      P: {meal.protein}g • C: {meal.carbs}g • G: {meal.fat}g
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {meal.foods.map((food, index) => (
                    <div key={index} className="text-sm text-gray-300">
                      • {food}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end">
        <ActionButton variant="outline">
          Modifica Piano
        </ActionButton>
      </div>
    </div>
  );
};

export default NutritionPlan;
