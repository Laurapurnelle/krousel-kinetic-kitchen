import { motion } from "framer-motion";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="bg-foreground py-16 px-6">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="font-heading text-3xl font-bold text-background mb-2">THE K'ROUSEL</h2>
        <p className="font-body text-sm text-background/60 tracking-wide">
          Artisan Street Food & Traiteur sur Mesure — Liège, Belgique
        </p>
        <p className="font-body text-xs text-background/40 mt-1">
          Par Kassandra Lorquet
        </p>
      </motion.div>

      <div className="flex items-center justify-center gap-6 mb-10">
        {[Instagram, Facebook, Mail, Phone].map((Icon, i) => (
          <motion.a
            key={i}
            href="#"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background/60 hover:text-background hover:bg-background/20 transition-colors"
          >
            <Icon size={18} />
          </motion.a>
        ))}
      </div>

      <div className="border-t border-background/10 pt-6 text-center">
        <p className="font-body text-xs text-background/30">
          © {new Date().getFullYear()} THE K'ROUSEL. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
