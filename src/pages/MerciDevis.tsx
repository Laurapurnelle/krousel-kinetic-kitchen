import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, Mail, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logoTraiteurVert from "@/assets/logo-traiteur-vert-fonce.svg";

const MerciDevis = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card-strong border-b-2 border-traiteur-forest/20">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-traiteur-forest font-body text-sm font-medium btn-bounce"
          >
            <ArrowLeft size={18} />
            Accueil
          </button>
          <img src={logoTraiteurVert} alt="The K'rousel Traiteur" className="h-8 w-auto" />
          <div className="w-16" />
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-8 md:p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mb-6 w-20 h-20 rounded-full bg-traiteur-forest/10 flex items-center justify-center"
            >
              <CheckCircle size={44} className="text-traiteur-forest" />
            </motion.div>

            <p className="font-body text-xs uppercase tracking-[0.3em] text-traiteur-olive mb-3">
              Demande envoyée
            </p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Merci pour votre confiance
            </h1>
            <p className="font-body text-base text-muted-foreground mb-8 max-w-lg mx-auto">
              Votre demande a bien été transmise à <span className="font-semibold text-traiteur-forest">Kassandra</span>.
              Elle vous appellera personnellement sous 48h pour discuter de votre événement, puis vous enverra un devis sur mesure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
              <div className="rounded-2xl border border-traiteur-forest/15 bg-background/40 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={18} className="text-traiteur-forest" />
                  <p className="font-heading text-sm font-semibold text-traiteur-forest">Appel sous 48h</p>
                </div>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  Kassandra vous téléphone pour cerner vos envies, puis vous envoie un devis personnalisé par email.
                </p>
              </div>
              <div className="rounded-2xl border border-traiteur-forest/15 bg-background/40 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={18} className="text-traiteur-forest" />
                  <p className="font-heading text-sm font-semibold text-traiteur-forest">Une question ?</p>
                </div>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  Écrivez directement à <a href="mailto:contact@therousel.be" className="underline underline-offset-2 hover:text-traiteur-forest">contact@therousel.be</a>
                </p>
              </div>
            </div>

            <p className="font-body text-sm text-muted-foreground italic mb-8">
              « Chaque projet est unique — j'ai hâte de découvrir le vôtre. »
              <br />
              <span className="not-italic font-heading text-traiteur-forest">— Kassandra Lorquet</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-traiteur-forest text-traiteur-offwhite px-6 py-3 rounded-xl font-body text-sm font-semibold btn-bounce"
              >
                Retour à l'accueil
              </Link>
              <Link
                to="/devis"
                className="inline-flex items-center justify-center gap-2 border-2 border-traiteur-forest text-traiteur-forest px-6 py-3 rounded-xl font-body text-sm font-semibold btn-bounce hover:bg-traiteur-forest/5 transition-colors"
              >
                Envoyer une autre demande
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MerciDevis;