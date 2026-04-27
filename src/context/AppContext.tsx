import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

export type EnergyLevel = 'empty' | 'low' | 'medium' | 'high' | 'super';

export interface Task {
  id: string;
  title: string;
  day: string;
  completed: boolean;
  color: string;
  isComplex: boolean;
}

export interface Habit {
  id: string;
  name: string;
  icon: string;
  completedDays: string[];
}

interface AppContextType {
  energy: EnergyLevel;
  setEnergy: (level: EnergyLevel) => void;
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  habits: Habit[];
  addHabit: (name: string, icon: string) => void;
  toggleHabitDay: (habitId: string, dateStr: string) => void;
  deleteHabit: (id: string) => void;
  brainDump: string;
  setBrainDump: (text: string) => void;
  focusTask: Task | null;
  setFocusTask: (task: Task | null) => void;
  oneThingMode: boolean;
  setOneThingMode: (active: boolean) => void;
  showConfetti: boolean;
  triggerConfetti: () => void;
  lastCompletedTask: string;
}

const DEFAULT_HABITS: Habit[] = [
  { id: 'h1', name: 'Skin Care', icon: '✨', completedDays: [] },
  { id: 'h2', name: 'Marche', icon: '🚶', completedDays: [] },
  { id: 'h3', name: 'Eau', icon: '💧', completedDays: [] },
  { id: 'h4', name: 'Méditation', icon: '🧘', completedDays: [] },
  { id: 'h5', name: 'Lecture', icon: '📚', completedDays: [] },
];

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [energy, setEnergyState] = useState<EnergyLevel>(() => load('adhd_energy', 'medium'));
  const [tasks, setTasks] = useState<Task[]>(() => load('adhd_tasks', []));
  const [habits, setHabits] = useState<Habit[]>(() => load('adhd_habits', DEFAULT_HABITS));
  const [brainDump, setBrainDumpState] = useState<string>(() => load('adhd_brain_dump', ''));
  const [focusTask, setFocusTask] = useState<Task | null>(null);
  const [oneThingMode, setOneThingMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastCompletedTask, setLastCompletedTask] = useState('');
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerConfetti = useCallback(() => {
    if (confettiTimer.current) clearTimeout(confettiTimer.current);
    setShowConfetti(true);
    confettiTimer.current = setTimeout(() => setShowConfetti(false), 4000);
  }, []);

  const setEnergy = useCallback((level: EnergyLevel) => {
    setEnergyState(level);
    save('adhd_energy', level);
  }, []);

  const addTask = useCallback((task: Omit<Task, 'id'>) => {
    const newTask: Task = { ...task, id: `t_${Date.now()}_${Math.random()}` };
    setTasks(prev => {
      const updated = [...prev, newTask];
      save('adhd_tasks', updated);
      return updated;
    });
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === id);
      if (task && !task.completed) {
        setLastCompletedTask(task.title);
        triggerConfetti();
      }
      const updated = prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
      save('adhd_tasks', updated);
      return updated;
    });
  }, [triggerConfetti]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => {
      const updated = prev.filter(t => t.id !== id);
      save('adhd_tasks', updated);
      return updated;
    });
  }, []);

  const addHabit = useCallback((name: string, icon: string) => {
    const newHabit: Habit = { id: `h_${Date.now()}`, name, icon, completedDays: [] };
    setHabits(prev => {
      const updated = [...prev, newHabit];
      save('adhd_habits', updated);
      return updated;
    });
  }, []);

  const toggleHabitDay = useCallback((habitId: string, dateStr: string) => {
    setHabits(prev => {
      const updated = prev.map(h => {
        if (h.id !== habitId) return h;
        const days = h.completedDays.includes(dateStr)
          ? h.completedDays.filter(d => d !== dateStr)
          : [...h.completedDays, dateStr];
        return { ...h, completedDays: days };
      });
      save('adhd_habits', updated);
      return updated;
    });
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits(prev => {
      const updated = prev.filter(h => h.id !== id);
      save('adhd_habits', updated);
      return updated;
    });
  }, []);

  const setBrainDump = useCallback((text: string) => {
    setBrainDumpState(text);
    save('adhd_brain_dump', text);
  }, []);

  return (
    <AppContext.Provider value={{
      energy, setEnergy,
      tasks, addTask, toggleTask, deleteTask,
      habits, addHabit, toggleHabitDay, deleteHabit,
      brainDump, setBrainDump,
      focusTask, setFocusTask,
      oneThingMode, setOneThingMode,
      showConfetti, triggerConfetti,
      lastCompletedTask,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
