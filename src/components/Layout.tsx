import { type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarDays, CheckSquare, Brain } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import EnergyBarometer from "./EnergyBarometer";
import CherryPomodoro from "./CherryPomodoro";
import ConfettiEffect from "./ConfettiEffect";
import MotivationalQuote from "./MotivationalQuote";
import OneThingMode from "./OneThingMode";
import { useApp } from "@/context/AppContext";

const NAV = [
  { path: "/",           icon: CalendarDays, label: "Semaine" },
  { path: "/habitudes",  icon: CheckSquare,  label: "Habitudes" },
  { path: "/brain-dump", icon: Brain,        label: "Brain Dump" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { showConfetti, oneThingMode, lastCompletedTask } = useApp();

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #FFF5F0 0%, #FFF1EC 40%, #FFE8F0 100%)' }}>

      {showConfetti && <ConfettiEffect />}

      <AnimatePresence>
        {oneThingMode && <OneThingMode key="one-thing" />}
      </AnimatePresence>

      <AnimatePresence>
        {showConfetti && lastCompletedTask && (
          <MotivationalQuote key={lastCompletedTask} task={lastCompletedTask} />
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 glass-card px-4 py-3 flex items-center justify-between border-b border-rose-200/30">
        <div>
          <h1 className="font-script text-2xl text-plum leading-tight">🍒 Mon Journal</h1>
          <p className="text-xs text-plum-muted font-semibold capitalize">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <EnergyBarometer />
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-24 no-scrollbar">
        {children}
      </main>

      <CherryPomodoro />

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 glass-card border-t border-rose-200/30 safe-pb">
        <div className="flex justify-around py-2 px-2">
          {NAV.map(({ path, icon: Icon, label }) => {
            const active = pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center gap-0.5 px-5 py-2 rounded-2xl transition-all duration-200 font-semibold ${
                  active
                    ? 'text-rose-500 bg-rose-100/80 shadow-sm'
                    : 'text-plum-muted hover:text-rose-400 hover:bg-rose-50/60'
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                <span className="text-[11px]">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
