import { HashRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import HabitTracker from "./pages/HabitTracker";
import BrainDump from "./pages/BrainDump";

const App = () => (
  <TooltipProvider>
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/habitudes" element={<HabitTracker />} />
            <Route path="/brain-dump" element={<BrainDump />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  </TooltipProvider>
);

export default App;
