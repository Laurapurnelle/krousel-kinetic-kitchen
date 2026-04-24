import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, LogOut, Mail, ShoppingBag, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useCart, formatEuro } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";
import logoBordeaux from "@/assets/logo-krousel-bordeaux.svg";

const Profil = () => {
  const { user, signOut, updateProfile, loading } = useAuth();
  const { totalCount, totalPrice } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) setName(user.name ?? "");
  }, [user]);

  if (!user) return null;

  const initials = (user.name ?? user.email).slice(0, 2).toUpperCase();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card-strong border-b-2 border-primary/20">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2 btn-bounce" aria-label="Retour">
            <img src={logoBordeaux} alt="K'rousel" className="h-8 w-auto" />
          </Link>
          <Link to="/" className="font-body text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
            <ArrowLeft size={14} /> Accueil
          </Link>
        </div>
      </nav>

      <main className="container mx-auto pt-24 pb-16 px-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading text-xl font-bold">
            {initials}
          </div>
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              {user.name ?? "Bonjour"}
            </h1>
            <p className="font-body text-sm text-muted-foreground">
              Connecté via {user.provider === "google" ? "Google" : "email"}
            </p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <h2 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
            <UserIcon size={18} className="text-primary" /> Mes informations
          </h2>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="font-body text-xs">Nom</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-xs">Email</Label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input value={user.email} disabled className="pl-9" />
              </div>
            </div>
            <Button
              onClick={() => {
                updateProfile({ name });
                toast({ title: "Profil mis à jour" });
              }}
            >
              Enregistrer
            </Button>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <h2 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
            <ShoppingBag size={18} className="text-primary" /> Mon panier
          </h2>
          <div className="flex items-center justify-between mb-4">
            <p className="font-body text-sm text-muted-foreground">
              {totalCount === 0
                ? "Votre panier est vide."
                : `${totalCount} article${totalCount > 1 ? "s" : ""} · ${formatEuro(totalPrice)}`}
            </p>
            <Button asChild variant="outline" size="sm">
              <Link to="/panier">Voir</Link>
            </Button>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full text-destructive hover:bg-destructive/10"
          onClick={() => {
            signOut();
            toast({ title: "Déconnecté" });
            navigate("/");
          }}
        >
          <LogOut size={16} className="mr-2" /> Se déconnecter
        </Button>
      </main>
    </motion.div>
  );
};

export default Profil;