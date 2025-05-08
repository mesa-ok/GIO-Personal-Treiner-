
export const workouts = [
  {
    id: 1,
    title: "Full Body",
    duration: 45,
    calories: 350,
    type: "Con attrezzi",
    level: "intermedio" as const,
  },
  {
    id: 2,
    title: "Upper Body",
    duration: 40,
    calories: 300,
    type: "Con attrezzi",
    level: "intermedio" as const,
  },
  {
    id: 3,
    title: "Lower Body",
    duration: 35,
    calories: 320,
    type: "Con attrezzi",
    level: "avanzato" as const,
  },
  {
    id: 4,
    title: "HIIT Cardio",
    duration: 25,
    calories: 400,
    type: "Cardio",
    level: "avanzato" as const,
  },
  {
    id: 5,
    title: "Bodyweight",
    duration: 30,
    calories: 250,
    type: "Corpo libero",
    level: "principiante" as const,
  },
];

export const completedWorkouts = [
  {
    id: 101,
    title: "Upper Body",
    duration: 38,
    calories: 290,
    type: "Con attrezzi",
    level: "intermedio" as const,
    date: "2023-04-19",
  },
  {
    id: 102,
    title: "Full Body",
    duration: 42,
    calories: 320,
    type: "Con attrezzi",
    level: "intermedio" as const,
    date: "2023-04-15",
  },
  {
    id: 103,
    title: "HIIT Cardio",
    duration: 22,
    calories: 380,
    type: "Cardio",
    level: "avanzato" as const,
    date: "2023-04-12",
  },
];

export const exercises = [
  {
    id: 1,
    name: "Push-ups",
    sets: 3,
    reps: "12-15",
  },
  {
    id: 2,
    name: "Squats",
    sets: 4,
    reps: "15",
  },
  {
    id: 3,
    name: "Pull-ups",
    sets: 3,
    reps: "8-10",
  },
  {
    id: 4,
    name: "Lunges",
    sets: 3,
    reps: "12 per gamba",
  },
  {
    id: 5,
    name: "Plank",
    sets: 3,
    reps: "45 sec",
  },
];

export const sheets = [
  {
    id: 1,
    title: "Scheda Upper Body",
    createdAt: "15/04/2025",
    exercisesCount: 6,
  },
  {
    id: 2,
    title: "Scheda Lower Body",
    createdAt: "10/04/2025",
    exercisesCount: 5,
  },
  {
    id: 3,
    title: "Scheda Addominali",
    createdAt: "05/04/2025",
    exercisesCount: 4,
  },
];
