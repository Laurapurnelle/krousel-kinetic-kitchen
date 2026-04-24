import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Plus, Minus, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, formatEuro } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import logoBordeaux from "@/assets/logo-krousel-bordeaux.svg";

const Panier = () => {
  const { items, totalCount, totalPrice, addItem, removeItem, setQty, clear } = useCart();
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
    >
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card-strong border-b-2 border-primary/20">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2 btn-bounce" aria-label="Retour à l'accueil">
            <img src={logoBordeaux} alt="K'rousel" className="h-8 w-auto" />
          </Link>
          <Link
            to={user ? "/profil" : "/auth"}
            className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <User size={16} /> {user ? user.name ?? user.email : "Se connecter"}
          </Link>
        </div>
      </nav>

      <main className="container mx-auto pt-24 pb-16 px-6 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft size={14} /> Continuer mes achats
        </Link>

        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Mon panier</h1>
        <p className="font-body text-sm text-muted-foreground mb-8">
          {totalCount === 0
            ? "Votre panier est vide. Découvrez la carte de la friterie pour faire votre choix."
            : `${totalCount} article${totalCount > 1 ? "s" : ""} dans votre sélection.`}
        </p>

        {items.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <ShoppingBag size={48} className="mx-auto mb-4 text-muted-foreground/40" />
            <p className="font-body text-base text-muted-foreground mb-6">
              Aucun plat sélectionné pour l'instant.
            </p>
            <Button asChild>
              <Link to="/">Voir la carte</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-8">
              {items.map((item) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card rounded-xl p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-base font-semibold text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="font-body text-xs text-muted-foreground capitalize">
                      {item.category} · {item.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeItem(item.key)}
                      className="w-8 h-8 rounded-full bg-muted hover:bg-destructive/15 hover:text-destructive flex items-center justify-center transition-colors"
                      aria-label="Réduire"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-heading text-base font-bold w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => addItem({ key: item.key, name: item.name, price: item.price, category: item.category })}
                      className="w-8 h-8 rounded-full bg-primary/15 text-primary hover:bg-primary/25 flex items-center justify-center transition-colors"
                      aria-label="Ajouter"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => setQty(item.key, 0)}
                      className="ml-2 w-8 h-8 rounded-full hover:bg-destructive/15 hover:text-destructive flex items-center justify-center transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
                <span className="font-body text-sm text-muted-foreground">Total</span>
                <span className="font-heading text-2xl font-bold text-foreground">
                  {formatEuro(totalPrice)}
                </span>
              </div>
              <p className="font-body text-xs text-muted-foreground mb-4">
                Aperçu de votre commande. Le paiement se fait sur place auprès de Kassandra.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1">
                  <Link to="/">Continuer mes achats</Link>
                </Button>
                <Button variant="outline" onClick={clear} className="flex-1">
                  Vider le panier
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </motion.div>
  );
};

export default Panier;