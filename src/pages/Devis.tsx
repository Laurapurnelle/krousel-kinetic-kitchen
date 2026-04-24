import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import logoTraiteurVert from "@/assets/logo-traiteur-vert-fonce.svg";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.motif) {
      toast.error("Merci d'indiquer au moins votre nom, votre téléphone et le motif.");
      return;
    }
    toast.success("Demande envoyée ! Kassandra vous appellera sous 48h.");
    navigate("/devis/merci");
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
          <img src={logoTraiteurVert} alt="The K'rousel Traiteur" className="h-8 w-auto" />
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
              Premier contact
            </p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Parlons de votre projet
            </h1>
            <p className="font-body text-base text-muted-foreground">
              Pas besoin de tout détailler ici. Laissez-nous quelques infos et <span className="font-semibold text-traiteur-forest">Kassandra vous appellera sous 48h</span> pour discuter ensemble de votre événement. Le devis vous sera envoyé après ce premier échange.
            </p>
          </motion.div>

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 rounded-2xl border border-traiteur-forest/15 bg-traiteur-forest/5 p-5"
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-9 h-9 rounded-full bg-traiteur-forest/10 flex items-center justify-center">
                <Phone size={16} className="text-traiteur-forest" />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-traiteur-forest mb-2">Comment ça se passe</p>
                <ol className="font-body text-xs text-muted-foreground space-y-1.5 list-decimal list-inside">
                  <li>Vous laissez vos coordonnées et le motif (les autres champs sont optionnels).</li>
                  <li>Kassandra vous appelle sous 48h pour discuter en détail de votre événement.</li>
                  <li>Vous recevez ensuite un devis personnalisé par email.</li>
                </ol>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card rounded-2xl p-6 md:p-8"
          >
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
                    <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Téléphone *</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+32 4XX XX XX XX"
                      className="bg-background/50 border-traiteur-forest/20 focus-visible:ring-traiteur-forest"
                      maxLength={20}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Email <span className="text-muted-foreground/60 normal-case">(optionnel)</span></label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder="votre@email.be"
                      className="bg-background/50 border-traiteur-forest/20 focus-visible:ring-traiteur-forest"
                      maxLength={255}
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Nombre de convives <span className="text-muted-foreground/60 normal-case">(estimation)</span></label>
                    <Select value={formData.guests} onValueChange={(v) => setFormData(p => ({ ...p, guests: v }))}>
                      <SelectTrigger className="bg-background/50 border-traiteur-forest/20 focus:ring-traiteur-forest">
                        <SelectValue placeholder="Si vous le savez déjà" />
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
                    <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Date souhaitée <span className="text-muted-foreground/60 normal-case">(si connue)</span></label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(p => ({ ...p, date: e.target.value }))}
                      className="bg-background/50 border-traiteur-forest/20 focus-visible:ring-traiteur-forest"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Lieu de l'événement <span className="text-muted-foreground/60 normal-case">(optionnel)</span></label>
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
                  <label className="font-body text-xs font-medium text-foreground mb-1.5 block">
                    Votre projet & disponibilités pour être rappelé(e) <span className="text-muted-foreground/60 normal-case">(important)</span>
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Indiquez une plage horaire où vous êtes joignable (ex. en semaine entre 14h et 18h), puis quelques mots sur votre projet si vous le souhaitez."
                    className="bg-background/50 border-traiteur-forest/20 focus-visible:ring-traiteur-forest min-h-[100px]"
                    maxLength={1000}
                    rows={4}
                  />
                  <p className="font-body text-[11px] text-muted-foreground mt-1.5">
                    Précisez vos disponibilités pour qu'on soit sûrs de vous joindre du premier coup.
                  </p>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-traiteur-forest text-traiteur-offwhite px-8 py-4 rounded-xl font-body text-sm font-semibold uppercase tracking-widest cinematic-shadow btn-bounce mt-2"
                >
                  <Phone size={16} />
                  Être rappelé(e) par Kassandra
                </motion.button>
                <p className="font-body text-[11px] text-muted-foreground text-center -mt-1">
                  Seuls le nom, le téléphone et le motif sont obligatoires.
                </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Devis;
