import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logoTraiteurVert from "@/assets/logo-traiteur-vert-fonce.svg";

const Devis = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultMotif = searchParams.get("motif") || "Votre demande";

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
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error("Merci d'indiquer votre nom, votre téléphone et votre adresse email.");
      return;
    }
    toast.success("Demande envoyée ! Vérifiez votre boîte mail pour la suite.");
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
              Laissez simplement vos coordonnées. Nous vous recontactons ensuite par email avec le document à compléter pour finaliser votre demande de devis.
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
                <Mail size={16} className="text-traiteur-forest" />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-traiteur-forest mb-2">Comment ça se passe</p>
                <ol className="font-body text-xs text-muted-foreground space-y-1.5 list-decimal list-inside">
                  <li>Vous laissez votre nom, votre téléphone et votre adresse email.</li>
                  <li>Vous recevez automatiquement par email le document PDF à compléter pour votre devis final.</li>
                  <li>Dès réception du PDF complété, nous revenons vers vous sous 48h.</li>
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
                    <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Adresse email *</label>
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

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-traiteur-forest text-traiteur-offwhite px-8 py-4 rounded-xl font-body text-sm font-semibold uppercase tracking-widest cinematic-shadow btn-bounce mt-2"
                >
                  <Phone size={16} />
                  Recevoir le document de devis
                </motion.button>
                <p className="font-body text-[11px] text-muted-foreground text-center -mt-1">
                  Nous utiliserons ces coordonnées pour vous envoyer la suite par email et vous recontacter si nécessaire.
                </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Devis;
