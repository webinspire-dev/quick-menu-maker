import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, PenLine, CreditCard, Banknote, Navigation, Check, Loader2, ThumbsUp, ChefHat, Bike, Package, UtensilsCrossed, ArrowLeft } from "lucide-react";

type CartItem = {
  product: { name: string; price: number; image?: string };
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
type DeliveryPricing = "tiers" | "per_km";

// Restaurant delivery config (owner sets this)
const deliveryConfig = {
  mode: "tiers" as DeliveryPricing,
  maxKm: 8,
  perKmRate: 1.0, // €/km for per_km mode
  tiers: [
    { maxKm: 3, price: 2.0 },
    { maxKm: 5, price: 3.5 },
    { maxKm: 8, price: 5.0 },
  ],
};

const orderSteps = [
  { icon: ThumbsUp, label: "Confirmée" },
  { icon: Check, label: "Acceptée" },
  { icon: ChefHat, label: "En préparation" },
  { icon: Package, label: "Prête" },
  { icon: Bike, label: "En livraison" },
  { icon: UtensilsCrossed, label: "Livrée" },
];

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
  const [orderId] = useState(() => Math.floor(10000000 + Math.random() * 90000000));
  const [distance, setDistance] = useState(2); // km - default

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

  const getDeliveryFee = () => {
    if (distance > deliveryConfig.maxKm) return null; // too far
    if (deliveryConfig.mode === "per_km") {
      return Math.round(distance * deliveryConfig.perKmRate * 100) / 100;
    }
    // tiers mode
    const tier = deliveryConfig.tiers.find((t) => distance <= t.maxKm);
    return tier ? tier.price : null;
  };

  const deliveryFee = getDeliveryFee();
  const isTooFar = deliveryFee === null;
  const grandTotal = total + (deliveryFee ?? 0);

  const address = addressMode === "gps" ? gpsAddress : manualAddress;
  const isValid = name.trim() && phone.trim() && address.trim() && payment && !isTooFar;

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

  const now = new Date();
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("fr-FR");
  const activeStep = 0;

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
              <div className="p-5 space-y-5">
                {/* Header */}
                <button onClick={handleClose} className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <ArrowLeft className="w-4 h-4" /> Retour
                </button>

                {/* Order info card */}
                <div className="bg-muted/50 rounded-2xl p-4 space-y-1">
                  <p className="text-sm text-foreground">
                    Commande : <span className="font-bold text-primary">#{orderId}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{timeStr}, {dateStr}</p>
                  <p className="text-xs text-muted-foreground">
                    Type : <span className="text-foreground font-semibold">Livraison</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Restaurant : <span className="text-foreground font-semibold">Istanbul Kebab</span>
                  </p>
                </div>

                {/* Estimated time */}
                <div className="text-center space-y-1">
                  <p className="text-xs text-muted-foreground">Temps de livraison estimé</p>
                  <p className="text-2xl font-extrabold text-foreground">25-35 min</p>
                </div>

                {/* Thumbs up illustration */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center relative">
                    <span className="text-4xl">👍</span>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                  </div>
                </div>

                {/* Progress steps */}
                <div className="relative flex items-center justify-between px-2">
                  <div className="absolute top-4 left-6 right-6 h-0.5 bg-border" />
                  <div
                    className="absolute top-4 left-6 h-0.5 bg-primary transition-all"
                    style={{ width: `${(activeStep / (orderSteps.length - 1)) * 100}%`, maxWidth: "calc(100% - 48px)" }}
                  />
                  {orderSteps.map((step, i) => {
                    const Icon = step.icon;
                    const done = i <= activeStep;
                    return (
                      <div key={i} className="relative z-10 flex flex-col items-center gap-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          done ? "bg-primary" : "bg-muted border-2 border-border"
                        }`}>
                          <Icon className={`w-4 h-4 ${done ? "text-primary-foreground" : "text-muted-foreground"}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Commande reçue ! Le restaurant prépare votre commande.
                </p>

                {/* Delivery address */}
                <div className="bg-muted/50 rounded-2xl p-4 space-y-2">
                  <h3 className="font-bold text-foreground text-sm">Adresse de livraison</h3>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{address}</span>
                  </div>
                </div>

                {/* Payment info */}
                <div className="bg-muted/50 rounded-2xl p-4 space-y-2">
                  <h3 className="font-bold text-foreground text-sm">Paiement</h3>
                  <p className="text-xs text-muted-foreground">
                    Méthode : <span className="text-foreground font-semibold">{payment === "card" ? "Carte bancaire" : "À la livraison"}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Statut : <span className="text-primary font-semibold">
                      {payment === "cod" ? "Non payé" : "Payé"}
                    </span>
                  </p>
                </div>

                {/* Order details */}
                <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
                  <h3 className="font-bold text-foreground text-sm">Détails de la commande</h3>
                  {cart.map((item, i) => {
                    const itemTotal = (item.product.price + (item.size?.price || 0) + item.supplements.reduce((s, sup) => s + sup.price, 0)) * item.quantity;
                    return (
                      <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                          {item.product.image && (
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                          )}
                          <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-[10px] font-bold text-primary-foreground">{item.quantity}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-foreground text-sm">{item.product.name}</h4>
                          {item.size && <p className="text-xs text-muted-foreground">Taille : {item.size.name}</p>}
                          {item.supplements.length > 0 && (
                            <p className="text-xs text-muted-foreground">+ {item.supplements.map(s => s.name).join(", ")}</p>
                          )}
                          <p className="font-bold text-foreground text-sm mt-0.5">{itemTotal.toFixed(2)} €</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Price breakdown */}
                <div className="border border-border rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Sous-total</span>
                    <span className="text-foreground font-semibold">{total.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Frais de livraison</span>
                    <span className="text-foreground font-semibold">{deliveryFee?.toFixed(2)} €</span>
                  </div>
                  <div className="border-t border-dashed border-border pt-2 flex justify-between">
                    <span className="font-extrabold text-foreground">Total</span>
                    <span className="font-extrabold text-primary text-lg">{grandTotal.toFixed(2)} €</span>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="w-full gradient-warm text-primary-foreground py-4 rounded-2xl font-bold shadow-glow"
                >
                  Fermer
                </button>

                <p className="text-[10px] text-muted-foreground text-center">(Ceci est une démo — aucune commande réelle n'a été passée)</p>
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

                {/* Distance selector */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Distance de livraison</label>
                  <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Distance estimée</span>
                      <span className="text-sm font-bold text-foreground">{distance} km</span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={12}
                      step={0.5}
                      value={distance}
                      onChange={(e) => setDistance(parseFloat(e.target.value))}
                      className="w-full accent-[hsl(var(--primary))]"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>0.5 km</span>
                      <span>Max: {deliveryConfig.maxKm} km</span>
                      <span>12 km</span>
                    </div>
                    {isTooFar ? (
                      <div className="bg-destructive/10 text-destructive text-xs font-semibold rounded-lg px-3 py-2 text-center">
                        ❌ Distance trop éloignée (max {deliveryConfig.maxKm} km). Livraison non disponible.
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Frais de livraison</span>
                        <span className="font-bold text-primary">{deliveryFee?.toFixed(2)} €</span>
                      </div>
                    )}
                    {/* Show tier info */}
                    {deliveryConfig.mode === "tiers" && (
                      <div className="space-y-1 border-t border-border pt-2">
                        <p className="text-[10px] text-muted-foreground font-semibold">Tarifs par zone :</p>
                        {deliveryConfig.tiers.map((tier, i) => (
                          <div key={i} className="flex justify-between text-[10px] text-muted-foreground">
                            <span>≤ {tier.maxKm} km</span>
                            <span className="font-semibold text-foreground">{tier.price.toFixed(2)} €</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-[10px] text-destructive">
                          <span>&gt; {deliveryConfig.maxKm} km</span>
                          <span className="font-semibold">Non disponible</span>
                        </div>
                      </div>
                    )}
                  </div>
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
                  <div className="border-t border-border pt-2 space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Sous-total</span>
                      <span className="font-semibold text-foreground">{total.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>🚚 Frais de livraison ({distance} km)</span>
                      <span className="font-semibold text-foreground">
                        {isTooFar ? "—" : `${deliveryFee?.toFixed(2)} €`}
                      </span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between">
                      <span className="font-extrabold text-foreground">Total</span>
                      <span className="font-extrabold text-primary text-lg">{grandTotal.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={!isValid}
                  className="w-full gradient-warm text-primary-foreground py-4 rounded-2xl font-bold text-base shadow-glow hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmer la commande · {grandTotal.toFixed(2)} €
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