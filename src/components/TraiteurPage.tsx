import { motion } from "framer-motion";
import { ArrowLeft, Instagram, Mail, MessageSquareHeart, Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import TraiteurQuiz from "./TraiteurQuiz";
import TraiteurGallery from "./TraiteurGallery";
import TraiteurMenu from "./TraiteurMenu";
import FoodTruckMenu from "./FoodTruckMenu";
import ClientReviews from "./ClientReviews";
import CartDrawer from "./CartDrawer";
import { useAuth } from "@/context/AuthContext";
import heroTraiteur from "@/assets/hero-traiteur.jpg";
import logoTraiteurVert from "@/assets/logo-traiteur-vert-fonce.svg";
import logoTraiteurBeige from "@/assets/logo-traiteur-beige.svg";

interface TraiteurPageProps {
  onBack: () => void;
}

const TraiteurPage = ({ onBack }: TraiteurPageProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const navbarOffset = 104;
    const targetTop = element.getBoundingClientRect().top + window.scrollY - navbarOffset;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card-strong border-b-2 border-traiteur-forest/20">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <button onClick={onBack} className="flex items-center gap-2 btn-bounce" aria-label="Retour à l'accueil">
            <img src={logoTraiteurVert} alt="The K'rousel Traiteur" className="h-8 w-auto" />
          </button>
          <div className="flex items-center gap-4">
              {[
                { label: "Réalisations", sectionId: "realisations" },
                { label: "La Carte", sectionId: "notre-carte" },
                { label: "Food Truck", sectionId: "food-truck-menu" },
                { label: "Votre Menu", sectionId: "votre-menu" },
              ].map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => scrollToSection(link.sectionId)}
                  className="hidden md:block font-body text-sm text-muted-foreground hover:text-traiteur-forest transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button onClick={() => navigate("/devis")} className="hidden md:block font-body text-sm text-muted-foreground hover:text-traiteur-forest transition-colors">
                Devis
              </button>
            <Link
              to={user ? "/profil" : "/auth"}
              aria-label={user ? "Mon profil" : "Se connecter"}
              className="w-10 h-10 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors"
            >
              <User size={18} className="text-traiteur-forest" />
            </Link>
            <CartDrawer variant="traiteur" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16">
        <div className="relative h-[55vh] overflow-hidden">
          <img src={heroTraiteur} alt="Traiteur sur mesure" className="w-full h-full object-cover" width={1280} height={720} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-traiteur-forest/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-traiteur-olive mb-3">Traiteur & Privatisation</p>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-traiteur-offwhite mb-3">L'Art de Recevoir</h1>
              <p className="font-body text-base text-traiteur-offwhite/80 max-w-lg mx-auto">
                Menus sur mesure, food truck privatisé & expériences culinaires uniques par Kassandra Lorquet.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Concept */}
      <section id="le-concept" className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-left mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">Notre Philosophie</h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Chaque événement est unique. C'est pourquoi nous concevons des menus sur mesure, 
              en alliant des produits locaux d'exception à une créativité sans limite. 
              Du mariage intime au gala corporate, nous transformons votre vision en une expérience gustative inoubliable.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Sur Mesure", desc: "Chaque menu est créé spécifiquement pour votre événement, vos goûts et vos invités." },
              { title: "Produits Nobles", desc: "Circuits courts, producteurs locaux, ingrédients de saison sélectionnés avec soin." },
              { title: "Service Complet", desc: "De la conception du menu au service en salle, nous gérons chaque détail." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`rounded-2xl p-6 text-left border cinematic-shadow ${
                  i === 1
                    ? "bg-traiteur-olive/20 border-traiteur-olive/40"
                    : "bg-traiteur-forest border-traiteur-forest/80"
                }`}
              >
                <h3 className={`font-heading text-lg font-semibold mb-2 ${i === 1 ? "text-traiteur-forest" : "text-traiteur-offwhite"}`}>
                  {item.title}
                </h3>
                <p className={`font-body text-sm ${i === 1 ? "text-traiteur-forest/80" : "text-traiteur-offwhite/80"}`}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery & Reviews */}
      <TraiteurGallery />
      <ClientReviews />

      {/* Carte Traiteur */}
      <TraiteurMenu />

      {/* Food Truck Menu */}
      <div id="food-truck-menu" className="scroll-mt-28">
        <FoodTruckMenu />
      </div>

      {/* Quiz */}
      <div id="votre-menu" className="scroll-mt-28">
        <TraiteurQuiz />
      </div>

      {/* Footer */}
      <footer className="bg-traiteur-forest py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-b border-traiteur-offwhite/15 pb-12 mb-10"
          >
            <div className="max-w-3xl text-left">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquareHeart size={18} className="text-traiteur-offwhite" />
                <p className="font-body text-sm uppercase tracking-[0.3em] text-traiteur-olive">
                  Parlons de votre projet
                </p>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-traiteur-offwhite mb-4">
                Organisons un événement à votre image
              </h2>
              <p className="font-body text-sm md:text-base text-traiteur-offwhite/80 mb-8 max-w-2xl leading-relaxed">
                Traiteur sur mesure ou privatisation du food truck : écrivez-nous pour imaginer ensemble une proposition adaptée à votre moment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:contact@therousel.be" className="flex items-center justify-center gap-2 bg-traiteur-offwhite text-traiteur-forest px-6 py-3 rounded-xl font-body text-sm font-semibold btn-bounce hover:bg-traiteur-beige/90 transition-colors">
                  <Mail size={16} /> Nous écrire
                </a>
                <button
                  onClick={() => navigate("/devis")}
                  className="flex items-center justify-center gap-2 border border-traiteur-offwhite/40 text-traiteur-offwhite px-6 py-3 rounded-xl font-body text-sm font-semibold btn-bounce hover:bg-traiteur-offwhite/10 transition-colors"
                >
                  Demander un devis
                </button>
              </div>
            </div>
          </motion.div>

          <img src={logoTraiteurBeige} alt="The K'rousel Traiteur" className="h-12 w-auto mx-auto mb-3" />
          <p className="font-heading text-2xl font-bold text-traiteur-offwhite text-center mb-2">THE K'ROUSEL</p>
          <p className="font-body text-sm text-traiteur-offwhite/70 text-center">Traiteur & Privatisation Food Truck — Liège, Belgique</p>
          <div className="flex items-center justify-center gap-4 mt-6">
          {[Instagram, Mail, Phone].map((Icon, i) => (
            <a key={i} href="#" className="w-9 h-9 rounded-full bg-traiteur-offwhite/10 flex items-center justify-center text-traiteur-offwhite/60 hover:text-traiteur-offwhite transition-colors">
              <Icon size={16} />
            </a>
          ))}
        </div>
          <p className="font-body text-xs text-traiteur-offwhite/30 text-center mt-6">© {new Date().getFullYear()} THE K'ROUSEL</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default TraiteurPage;
