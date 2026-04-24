import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, ShoppingBag } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart, formatEuro } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { FRITERIE_ADDRESS } from "@/lib/friterie";
import logoBordeaux from "@/assets/logo-krousel-bordeaux.svg";

const phoneRegex = /^(?:\+?\d[\d\s().-]{6,20})$/;

const buildSchema = (requirePhone: boolean) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Indiquez votre prénom (2 caractères min.)" })
      .max(80, { message: "Nom trop long" }),
    phone: requirePhone
      ? z
          .string()
          .trim()
          .min(1, { message: "Le numéro de téléphone est obligatoire" })
          .regex(phoneRegex, { message: "Numéro de téléphone invalide" })
          .max(20, { message: "Numéro trop long" })
      : z
          .string()
          .trim()
          .max(20, { message: "Numéro trop long" })
          .optional()
          .or(z.literal("")),
    notes: z
      .string()
      .trim()
      .max(300, { message: "Les notes sont limitées à 300 caractères" })
      .optional()
      .or(z.literal("")),
  });

const Commande = () => {
  const navigate = useNavigate();
  const { items, totalCount, totalPrice } = useCart();
  const { user } = useAuth();

  const requirePhone = !user;
  const schema = useMemo(() => buildSchema(requirePhone), [requirePhone]);

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalCount === 0) {
      toast.error("Votre panier est vide.");
      return;
    }
    const result = schema.safeParse({ name, phone, notes });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0]?.toString() ?? "form";
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    // Simulated order placement (no backend yet)
    const orderRef = `KR-${Date.now().toString().slice(-6)}`;
    const phoneToUse = (phone || "").trim();

    setTimeout(() => {
      navigate("/commande/merci", {
        replace: true,
        state: {
          orderRef,
          name: result.data.name,
          phone: phoneToUse,
          totalCount,
          totalPrice,
        },
      });
    }, 400);
  };

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
            to="/panier"
            className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ShoppingBag size={16} /> Mon panier
          </Link>
        </div>
      </nav>

      <main className="container mx-auto pt-24 pb-16 px-6 max-w-2xl">
        <Link
          to="/panier"
          className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft size={14} /> Retour au panier
        </Link>

        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Confirmer ma commande</h1>
        <p className="font-body text-sm text-muted-foreground mb-8">
          Vérifiez votre sélection puis indiquez vos coordonnées. Le paiement se fait sur place.
        </p>

        {totalCount === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <ShoppingBag size={48} className="mx-auto mb-4 text-muted-foreground/40" />
            <p className="font-body text-base text-muted-foreground mb-6">
              Votre panier est vide.
            </p>
            <Button asChild>
              <Link to="/">Voir la carte</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {/* Recap */}
            <section className="glass-card rounded-2xl p-6">
              <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
                Récapitulatif ({totalCount} article{totalCount > 1 ? "s" : ""})
              </h2>
              <ul className="divide-y divide-border/50">
                {items.map((item) => (
                  <li key={item.key} className="flex items-center justify-between py-2">
                    <div className="min-w-0">
                      <p className="font-body text-sm font-medium text-foreground truncate">
                        {item.qty} × {item.name}
                      </p>
                      <p className="font-body text-xs text-muted-foreground capitalize">
                        {item.category}
                      </p>
                    </div>
                    <span className="font-body text-sm text-muted-foreground">{item.price}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                <span className="font-body text-sm text-muted-foreground">Total estimé</span>
                <span className="font-heading text-xl font-bold text-foreground">
                  {formatEuro(totalPrice)}
                </span>
              </div>
            </section>

            {/* Form */}
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-5" noValidate>
              <h2 className="font-heading text-lg font-semibold text-foreground">Vos coordonnées</h2>

              {!user && (
                <p className="font-body text-xs text-muted-foreground">
                  Pas encore de compte ?{" "}
                  <Link to="/auth" className="text-primary underline underline-offset-2">
                    Connectez-vous
                  </Link>{" "}
                  pour aller plus vite la prochaine fois.
                </p>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Prénom</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                  placeholder="Ex. Camille"
                  autoComplete="given-name"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="font-body text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Numéro de téléphone{" "}
                  {requirePhone ? (
                    <span className="text-destructive">*</span>
                  ) : (
                    <span className="text-muted-foreground text-xs">(optionnel)</span>
                  )}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={20}
                  placeholder="+32 4 ..."
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                />
                <p className="font-body text-xs text-muted-foreground">
                  Vous recevrez par SMS l'estimation de l'heure pour venir chercher votre commande.
                </p>
                {errors.phone && (
                  <p className="font-body text-xs text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes pour la friterie (optionnel)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={300}
                  placeholder="Allergies, sauce supplémentaire, etc."
                  rows={3}
                  aria-invalid={!!errors.notes}
                />
                {errors.notes && (
                  <p className="font-body text-xs text-destructive">{errors.notes}</p>
                )}
              </div>

              <div className="flex items-start gap-2 rounded-xl bg-muted/40 p-3">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <p className="font-body text-xs text-muted-foreground">
                  Commande à retirer à la friterie : <strong className="text-foreground">{FRITERIE_ADDRESS}</strong>
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Envoi en cours…" : "Confirmer ma commande"}
              </Button>
            </form>
          </div>
        )}
      </main>
    </motion.div>
  );
};

export default Commande;