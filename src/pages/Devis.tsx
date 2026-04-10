import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import KMonogram from "@/components/KMonogram";

const motifOptions = [
  { value: "traiteur-mariage", label: "Traiteur — Mariage" },
  { value: "traiteur-corporate", label: "Traiteur — Événement d'entreprise" },
  { value: "traiteur-prive", label: "Traiteur — Fête privée" },
  { value: "traiteur-autre", label: "Traiteur — Autre événement" },
  { value: "foodtruck-mariage", label: "Food Truck — Mariage" },
  { value: "foodtruck-corporate", label: "Food Truck — Événement d'entreprise" },
  { value: "foodtruck-festival", label: "Food Truck — Festival / Marché" },
  { value: "foodtruck-anniversaire", label: "Food Truck — Anniversaire" },
  { value: "foodtruck-prive", label: "Food Truck — Fête privée" },
  { value: "autre", label: "Autre demande" },
];

const Devis = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultMotif = searchParams.get("motif") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    motif: defaultMotif,
    guests: "",
    date: "",
    location: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.motif || !formData.guests || !formData.date) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setSubmitted(true);
    toast.success("Demande envoyée ! Nous vous recontacterons rapidement.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card-strong border-b-2 border-traiteur-forest/20">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-traiteur-forest font-body text-sm font-medium btn-bounce">
            <ArrowLeft size={18} />
            Retour
          </button>
          <div className="flex items-center gap-2">
            <KMonogram variant="dark" size={28} />
            <span className="font-heading text-lg font-bold text-traiteur-forest">THE K'ROUSEL</span>
          </div>
          <div className="w-16" />
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left mb-10"
          >
            <p className="font-body text-sm uppercase tracking-[0.3em] text-traiteur-olive mb-3">
              Devis & Réservation
            </p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Demandez Votre Devis
            </h1>
            <p className="font-body text-base text-muted-foreground">
              Traiteur sur mesure ou privatisation du food truck — décrivez votre projet et nous vous recontacterons sous 48h.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card rounded-2xl p-6 md:p-8"
          >
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="text-traiteur-forest mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Demande Envoyée !</h3>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  Merci pour votre intérêt. Kassandra vous recontactera dans les 48h pour discuter de votre projet.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", motif: "", guests: "", date: "", location: "", message: "" }); }}
                  className="font-body text-sm text-traiteur-forest underline underline-offset-4 hover:text-traiteur-forest/80 transition-colors"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Motif du contact */}
                <div>
                  <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Motif du contact *</label>
                  <Select value={formData.motif} onValueChange={(v) => setFormData(p => ({ ...p, motif: v }))}>
                    <SelectTrigger className="bg-background/50 border-traiteur-forest/20 focus:ring-traiteur-forest">
                      <SelectValue placeholder="Pourquoi nous contactez-vous ?" />
                    </SelectTrigger>
                    <SelectContent>
                      {motifOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Nom complet *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder="Votre nom"
                      className="bg-background/50 border-traiteur-forest/20 focus-visible:ring-traiteur-forest"
                      maxLength={100}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder="votre@email.be"
                      className="bg-background/50 border-traiteur-forest/20 focus-visible:ring-traiteur-forest"
                      maxLength={255}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Téléphone</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+32 4XX XX XX XX"
                      className="bg-background/50 border-traiteur-forest/20 focus-visible:ring-traiteur-forest"
                      maxLength={20}
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Nombre de convives *</label>
                    <Select value={formData.guests} onValueChange={(v) => setFormData(p => ({ ...p, guests: v }))}>
                      <SelectTrigger className="bg-background/50 border-traiteur-forest/20 focus:ring-traiteur-forest">
                        <SelectValue placeholder="Combien ?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10-30">10 – 30</SelectItem>
                        <SelectItem value="30-50">30 – 50</SelectItem>
                        <SelectItem value="50-100">50 – 100</SelectItem>
                        <SelectItem value="100-150">100 – 150</SelectItem>
                        <SelectItem value="150-200">150 – 200</SelectItem>
                        <SelectItem value="200-300">200 – 300</SelectItem>
                        <SelectItem value="300+">300+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Date souhaitée *</label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(p => ({ ...p, date: e.target.value }))}
                      className="bg-background/50 border-traiteur-forest/20 focus-visible:ring-traiteur-forest"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Lieu de l'événement</label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData(p => ({ ...p, location: e.target.value }))}
                      placeholder="Ville ou adresse"
                      className="bg-background/50 border-traiteur-forest/20 focus-visible:ring-traiteur-forest"
                      maxLength={200}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Message / Détails</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Décrivez vos envies, contraintes, thème, menu souhaité..."
                    className="bg-background/50 border-traiteur-forest/20 focus-visible:ring-traiteur-forest min-h-[100px]"
                    maxLength={1000}
                    rows={4}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-traiteur-forest text-traiteur-offwhite px-8 py-4 rounded-xl font-body text-sm font-semibold uppercase tracking-widest cinematic-shadow btn-bounce mt-2"
                >
                  <Send size={16} />
                  Envoyer ma Demande
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Devis;
