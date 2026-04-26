import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index.tsx";
import Devis from "./pages/Devis.tsx";
import MerciDevis from "./pages/MerciDevis.tsx";
import Panier from "./pages/Panier.tsx";
import Auth from "./pages/Auth.tsx";
import Profil from "./pages/Profil.tsx";
import Commande from "./pages/Commande.tsx";
import MerciCommande from "./pages/MerciCommande.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <CartProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/devis" element={<Devis />} />
              <Route path="/devis/merci" element={<MerciDevis />} />
              <Route path="/panier" element={<Panier />} />
              <Route path="/commande" element={<Commande />} />
              <Route path="/commande/merci" element={<MerciCommande />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profil" element={<Profil />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
