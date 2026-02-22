import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, PenLine, CreditCard, Banknote, Navigation, Check, Loader2 } from "lucide-react";

type CartItem = {
  product: { name: string; price: number };
  size?: { name: string; price: number };
  supplements: { name: string; price: number }[];
  quantity: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
};

type AddressMode = "gps" | "manual" | null;
type PaymentMethod = "card" | "cod" | null;

const CheckoutModal = ({ open, onClose, cart, total }: Props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressMode, setAddressMode] = useState<AddressMode>(null);
  const [manualAddress, setManualAddress] = useState("");
  const [gpsAddress, setGpsAddress] = useState("");
  const [gpsLoading, setGpsLoading] = useState(false);
  const [extraInfo, setExtraInfo] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleGps = () => {
    setAddressMode("gps");
    setGpsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsAddress(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
          setGpsLoading(false);
        },
        () => {
          setGpsAddress("Position non disponible");
          setGpsLoading(false);
        },
        { timeout: 8000 }
      );
    } else {
      setGpsAddress("Géolocalisation non supportée");
      setGpsLoading(false);
    }
  };

  const address = addressMode === "gps" ? gpsAddress : manualAddress;
  const isValid = name.trim() && phone.trim() && address.trim() && payment;

  const handleSubmit = () => {
    if (!isValid) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    if (submitted) {
      setName("");
      setPhone("");
      setAddressMode(null);
      setManualAddress("");
      setGpsAddress("");
      setExtraInfo("");
      setPayment(null);
      setSubmitted(false);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-foreground/50 flex items-end justify-center"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background w-full max-w-md rounded-t-3xl max-h-[90vh] overflow-y-auto"
          >
            {submitted ? (
              <div className="p-6 text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-extrabold text-foreground">Commande confirmée ! 🎉</h2>
                <p className="text-sm text-muted-foreground">
                  Merci <span className="font-semibold text-foreground">{name}</span>, votre commande de{" "}
                  <span className="font-bold text-primary">{total.toFixed(2)} €</span> a été envoyée.
                </p>
                <p className="text-xs text-muted-foreground">(Ceci est une démo — aucune commande réelle n'a été passée)</p>
                <button
                  onClick={handleClose}
                  className="mt-4 w-full gradient-warm text-primary-foreground py-3 rounded-2xl font-bold shadow-glow"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <div className="p-5 space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-foreground">📋 Passer commande</h2>
                  <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-foreground">Nom complet</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jean Dupont"
                    className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-foreground">Numéro de téléphone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 12 34 56 78"
                    type="tel"
                    className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Adresse de livraison</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleGps}
                      className={`flex items-center gap-2 justify-center p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                        addressMode === "gps"
                          ? "border-primary bg-accent text-primary"
                          : "border-border text-muted-foreground hover:border-muted-foreground"
                      }`}
                    >
                      <Navigation className="w-4 h-4" />
                      📍 Position GPS
                    </button>
                    <button
                      onClick={() => setAddressMode("manual")}
                      className={`flex items-center gap-2 justify-center p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                        addressMode === "manual"
                          ? "border-primary bg-accent text-primary"
                          : "border-border text-muted-foreground hover:border-muted-foreground"
                      }`}
                    >
                      <PenLine className="w-4 h-4" />
                      ✍️ Manuelle
                    </button>
                  </div>

                  {addressMode === "gps" && (
                    <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-4 py-3 text-sm">
                      {gpsLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          <span className="text-muted-foreground">Localisation en cours…</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-foreground">{gpsAddress}</span>
                        </>
                      )}
                    </div>
                  )}

                  {addressMode === "manual" && (
                    <input
                      value={manualAddress}
                      onChange={(e) => setManualAddress(e.target.value)}
                      placeholder="12 Rue de la Paix, 75002 Paris"
                      className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  )}
                </div>

                {/* Extra info */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-foreground">Informations supplémentaires</label>
                  <textarea
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                    placeholder="Bâtiment B, 3e étage, code d'entrée 1234…"
                    rows={2}
                    className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                {/* Payment */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Mode de paiement</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPayment("card")}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        payment === "card"
                          ? "border-primary bg-accent"
                          : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        payment === "card" ? "border-primary bg-primary" : "border-muted-foreground"
                      }`}>
                        {payment === "card" && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-semibold text-foreground">💳 Carte bancaire</span>
                    </button>
                    <button
                      onClick={() => setPayment("cod")}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        payment === "cod"
                          ? "border-primary bg-accent"
                          : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        payment === "cod" ? "border-primary bg-primary" : "border-muted-foreground"
                      }`}>
                        {payment === "cod" && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <Banknote className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-semibold text-foreground">💵 Paiement à la livraison</span>
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                  <h3 className="text-sm font-bold text-foreground">Récapitulatif</h3>
                  {cart.map((item, i) => (
                    <div key={i} className="flex justify-between text-xs text-muted-foreground">
                      <span>{item.quantity}x {item.product.name}{item.size ? ` (${item.size.name})` : ""}</span>
                      <span className="font-semibold text-foreground">
                        {((item.product.price + (item.size?.price || 0) + item.supplements.reduce((s, sup) => s + sup.price, 0)) * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-extrabold text-foreground">Total</span>
                    <span className="font-extrabold text-primary text-lg">{total.toFixed(2)} €</span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={!isValid}
                  className="w-full gradient-warm text-primary-foreground py-4 rounded-2xl font-bold text-base shadow-glow hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmer la commande · {total.toFixed(2)} €
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
