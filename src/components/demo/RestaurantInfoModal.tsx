import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, Clock, Globe, Instagram, Facebook, Navigation, ExternalLink } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const restaurantInfo = {
  name: "Istanbul Kebab",
  description:
    "Depuis 2015, Istanbul Kebab vous propose une cuisine turque authentique préparée avec des ingrédients frais et de qualité. Notre viande est grillée à la broche chaque jour et nos sauces sont faites maison.",
  address: "12 Rue de la Paix, 75002 Paris",
  phone: "+33 1 42 68 53 00",
  hours: [
    { day: "Lundi", time: "11:00 – 23:00" },
    { day: "Mardi", time: "11:00 – 23:00" },
    { day: "Mercredi", time: "11:00 – 23:00" },
    { day: "Jeudi", time: "11:00 – 23:00" },
    { day: "Vendredi", time: "11:00 – 00:00" },
    { day: "Samedi", time: "11:00 – 00:00" },
    { day: "Dimanche", time: "12:00 – 22:00" },
  ],
  socials: {
    website: "https://istanbul-kebab.fr",
    instagram: "https://instagram.com/istanbulkebab",
    facebook: "https://facebook.com/istanbulkebab",
  },
  coords: { lat: 48.8698, lng: 2.3311 },
};

const RestaurantInfoModal = ({ open, onClose }: Props) => {
  const today = new Date().toLocaleDateString("fr-FR", { weekday: "long" });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);

  const openMaps = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${restaurantInfo.coords.lat},${restaurantInfo.coords.lng}`,
      "_blank"
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-foreground/50 flex items-end justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background w-full max-w-md rounded-t-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-5 space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-foreground">ℹ️ Infos restaurant</h2>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Description */}
              <div className="bg-muted/50 rounded-2xl p-4">
                <p className="text-sm text-foreground leading-relaxed">{restaurantInfo.description}</p>
              </div>

              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden border border-border">
                <iframe
                  title="Carte du restaurant"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${restaurantInfo.coords.lng - 0.005}%2C${restaurantInfo.coords.lat - 0.003}%2C${restaurantInfo.coords.lng + 0.005}%2C${restaurantInfo.coords.lat + 0.003}&layer=mapnik&marker=${restaurantInfo.coords.lat}%2C${restaurantInfo.coords.lng}`}
                  className="w-full h-48 border-0"
                />
                <button
                  onClick={openMaps}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-muted/50 text-sm font-semibold text-primary hover:bg-muted transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Obtenir l'itinéraire
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 bg-muted/50 rounded-2xl p-4">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground text-sm">Adresse</p>
                  <p className="text-sm text-muted-foreground">{restaurantInfo.address}</p>
                </div>
              </div>

              {/* Phone */}
              <a
                href={`tel:${restaurantInfo.phone}`}
                className="flex items-center gap-3 bg-muted/50 rounded-2xl p-4 hover:bg-muted transition-colors"
              >
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-bold text-foreground text-sm">Téléphone</p>
                  <p className="text-sm text-muted-foreground">{restaurantInfo.phone}</p>
                </div>
              </a>

              {/* Hours */}
              <div className="bg-muted/50 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-5 h-5 text-primary" />
                  <p className="font-bold text-foreground text-sm">Horaires d'ouverture</p>
                </div>
                {restaurantInfo.hours.map((h) => (
                  <div
                    key={h.day}
                    className={`flex justify-between text-sm px-2 py-1 rounded-lg ${
                      h.day === todayCapitalized ? "bg-accent font-semibold text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="space-y-2">
                <p className="font-bold text-foreground text-sm">Réseaux sociaux</p>
                <div className="flex gap-2">
                  <a
                    href={restaurantInfo.socials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <Globe className="w-4 h-4" /> Site web
                  </a>
                  <a
                    href={restaurantInfo.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                  <a
                    href={restaurantInfo.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <Facebook className="w-4 h-4" /> Facebook
                  </a>
                </div>
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl border-2 border-border font-bold text-foreground hover:bg-muted transition-colors"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RestaurantInfoModal;
