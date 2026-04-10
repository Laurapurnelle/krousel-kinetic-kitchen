import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Calendar, Users, Music, Star, Send, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import foodtruckImg from "@/assets/gallery-foodtruck-event.jpg";

const FoodTruckBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guests: "",
    date: "",
    location: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.eventType || !formData.guests || !formData.date) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setSubmitted(true);
    toast.success("Demande envoyée ! Nous vous recontacterons rapidement.");
  };

  return (
    <section id="food-truck-booking" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-traiteur-olive mb-3">
            Privatisation
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Le Food Truck à Votre Événement
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto">
            Privatisez notre food truck et offrez à vos invités une expérience street food authentique et conviviale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image + Features */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] cinematic-shadow-lg"
            >
              <img
                src={foodtruckImg}
                alt="Réserver le food truck pour votre événement"
                className="w-full h-full object-cover"
                loading="lazy"
                width={640}
                height={640}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-traiteur-forest/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-card-strong rounded-xl p-4 flex items-center gap-3">
                  <Truck className="text-primary flex-shrink-0" size={24} />
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">Food Truck Privatisé</p>
                    <p className="font-body text-xs text-muted-foreground">Mariages, festivals, événements d'entreprise</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                { icon: Users, text: "De 30 à 300 convives" },
                { icon: Calendar, text: "Disponible toute l'année, partout en Belgique" },
                { icon: Music, text: "Ambiance festive & service sur place" },
                { icon: Star, text: "Menu personnalisable selon vos envies" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-traiteur-forest/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-traiteur-forest" />
                  </div>
                  <p className="font-body text-sm text-foreground">{item.text}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", eventType: "", guests: "", date: "", location: "", message: "" }); }}
                  className="font-body text-sm text-traiteur-forest underline underline-offset-4 hover:text-traiteur-forest/80 transition-colors"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-heading text-xl font-bold text-foreground mb-1">Demande de Devis</h3>
                <p className="font-body text-sm text-muted-foreground mb-6">Remplissez ce formulaire et nous vous recontacterons rapidement.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                      <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Type d'événement *</label>
                      <Select value={formData.eventType} onValueChange={(v) => setFormData(p => ({ ...p, eventType: v }))}>
                        <SelectTrigger className="bg-background/50 border-traiteur-forest/20 focus:ring-traiteur-forest">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mariage">Mariage</SelectItem>
                          <SelectItem value="corporate">Événement d'entreprise</SelectItem>
                          <SelectItem value="festival">Festival / Marché</SelectItem>
                          <SelectItem value="anniversaire">Anniversaire</SelectItem>
                          <SelectItem value="prive">Fête privée</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Nombre de convives *</label>
                      <Select value={formData.guests} onValueChange={(v) => setFormData(p => ({ ...p, guests: v }))}>
                        <SelectTrigger className="bg-background/50 border-traiteur-forest/20 focus:ring-traiteur-forest">
                          <SelectValue placeholder="Combien ?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30-50">30 – 50</SelectItem>
                          <SelectItem value="50-100">50 – 100</SelectItem>
                          <SelectItem value="100-150">100 – 150</SelectItem>
                          <SelectItem value="150-200">150 – 200</SelectItem>
                          <SelectItem value="200-300">200 – 300</SelectItem>
                          <SelectItem value="300+">300+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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

                  <div>
                    <label className="font-body text-xs font-medium text-foreground mb-1.5 block">Message / Détails</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                      placeholder="Décrivez vos envies, contraintes, thème..."
                      className="bg-background/50 border-traiteur-forest/20 focus-visible:ring-traiteur-forest min-h-[80px]"
                      maxLength={1000}
                      rows={3}
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
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FoodTruckBooking;
