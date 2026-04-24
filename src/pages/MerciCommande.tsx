import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, formatEuro } from "@/context/CartContext";
import { FRITERIE_ADDRESS, FRITERIE_HOURS, FRITERIE_NAME } from "@/lib/friterie";
import logoBordeaux from "@/assets/logo-krousel-bordeaux.svg";

interface OrderState {
  orderRef?: string;
  name?: string;
  phone?: string;
  totalCount?: number;
  totalPrice?: number;
}

const MerciCommande = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clear } = useCart();
  const state = (location.state as OrderState | null) ?? {};

  // Clear cart once when arriving on the thank-you screen
  useEffect(() => {
    if (state.orderRef) {
      clear();
    } else {
      // Direct visit without an order: redirect to home
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${FRITERIE_NAME}, ${FRITERIE_ADDRESS}`,
  )}`;

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
        </div>
      </nav>

      <main className="container mx-auto pt-24 pb-16 px-6 max-w-2xl">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="flex flex-col items-center text-center mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="text-primary" size={48} />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Merci{state.name ? `, ${state.name}` : ""} !
          </h1>
          <p className="font-body text-base text-muted-foreground max-w-md">
            Votre commande a bien été envoyée à Kassandra. Vous recevrez bientôt par <strong className="text-foreground">SMS</strong> une estimation de l'heure à laquelle venir la chercher.
          </p>
        </motion.div>

        <div className="grid gap-4">
          {state.orderRef && (
            <section className="glass-card rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                  Référence
                </p>
                <p className="font-heading text-lg font-bold text-foreground">{state.orderRef}</p>
              </div>
              {typeof state.totalPrice === "number" && (
                <div className="text-right">
                  <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                    Total estimé
                  </p>
                  <p className="font-heading text-lg font-bold text-foreground">
                    {formatEuro(state.totalPrice)}
                  </p>
                </div>
              )}
            </section>
          )}

          <section className="glass-card rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <MapPin className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <p className="font-heading text-base font-semibold text-foreground">
                  Où retirer votre commande
                </p>
                <p className="font-body text-sm text-foreground mt-1">{FRITERIE_NAME}</p>
                <p className="font-body text-sm text-muted-foreground">{FRITERIE_ADDRESS}</p>
                <p className="font-body text-xs text-muted-foreground mt-2">{FRITERIE_HOURS}</p>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 font-body text-sm text-primary underline underline-offset-2"
                >
                  Ouvrir dans Google Maps →
                </a>
              </div>
            </div>
          </section>

          {state.phone && (
            <section className="glass-card rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <MessageSquare className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-heading text-base font-semibold text-foreground">
                    SMS de confirmation
                  </p>
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    Nous vous contacterons au{" "}
                    <span className="inline-flex items-center gap-1 text-foreground font-medium">
                      <Phone size={12} /> {state.phone}
                    </span>{" "}
                    avec l'estimation de l'heure pour venir chercher votre commande.
                  </p>
                </div>
              </div>
            </section>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button asChild className="flex-1">
              <Link to="/">Retour à l'accueil</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/profil">Voir mon profil</Link>
            </Button>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default MerciCommande;