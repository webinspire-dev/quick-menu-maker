import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Minus, ShoppingBag, X, Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type Supplement = { name: string; price: number };
type SizeOption = { name: string; price: number };
type Product = {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
  sizes?: SizeOption[];
  supplements?: Supplement[];
};
type Category = { name: string; emoji: string; products: Product[] };

const menu: Category[] = [
  {
    name: "Kebabs",
    emoji: "🥙",
    products: [
      {
        id: 1, name: "Kebab Classique", desc: "Viande grillée, salade, tomate, oignon, sauce au choix", price: 7.5,
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop",
        sizes: [{ name: "Normal", price: 0 }, { name: "XL", price: 2 }, { name: "Méga", price: 3.5 }],
        supplements: [{ name: "Double viande", price: 2.5 }, { name: "Fromage", price: 1 }, { name: "Œuf", price: 1 }, { name: "Frites dans le kebab", price: 1.5 }],
      },
      {
        id: 2, name: "Kebab Poulet", desc: "Poulet mariné, salade fraîche, sauce blanche", price: 7.5,
        image: "https://images.unsplash.com/photo-1561651188-d207bbec4ec3?w=400&h=300&fit=crop",
        sizes: [{ name: "Normal", price: 0 }, { name: "XL", price: 2 }],
        supplements: [{ name: "Double viande", price: 2.5 }, { name: "Fromage", price: 1 }, { name: "Avocat", price: 1.5 }],
      },
      {
        id: 3, name: "Durum", desc: "Wrap galette fine, viande kebab, crudités", price: 8,
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop",
        sizes: [{ name: "Normal", price: 0 }, { name: "XL", price: 2.5 }],
        supplements: [{ name: "Double viande", price: 2.5 }, { name: "Fromage", price: 1 }],
      },
    ],
  },
  {
    name: "Burgers",
    emoji: "🍔",
    products: [
      {
        id: 4, name: "Smash Burger", desc: "Steak smashé, cheddar fondant, sauce maison", price: 8.5,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
        sizes: [{ name: "Simple", price: 0 }, { name: "Double", price: 3 }, { name: "Triple", price: 5 }],
        supplements: [{ name: "Bacon", price: 1.5 }, { name: "Cheddar extra", price: 1 }, { name: "Œuf", price: 1 }, { name: "Jalapeños", price: 0.5 }],
      },
      {
        id: 5, name: "Chicken Burger", desc: "Filet de poulet croustillant, salade, sauce", price: 8,
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop",
        sizes: [{ name: "Simple", price: 0 }, { name: "Double", price: 2.5 }],
        supplements: [{ name: "Bacon", price: 1.5 }, { name: "Fromage", price: 1 }, { name: "Avocat", price: 1.5 }],
      },
    ],
  },
  {
    name: "Tacos",
    emoji: "🌮",
    products: [
      {
        id: 6, name: "Tacos Français", desc: "Galette, viande, frites, sauce fromagère", price: 8,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
        sizes: [{ name: "Simple", price: 0 }, { name: "Double", price: 2 }, { name: "Triple", price: 4 }],
        supplements: [{ name: "Viande supp.", price: 2 }, { name: "Cordon bleu", price: 2 }, { name: "Nuggets", price: 1.5 }, { name: "Sauce supp.", price: 0.5 }],
      },
      {
        id: 7, name: "Tacos Mixte", desc: "Mélange viandes, frites, sauce au choix", price: 9,
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
        sizes: [{ name: "Simple", price: 0 }, { name: "Double", price: 2.5 }],
        supplements: [{ name: "Viande supp.", price: 2 }, { name: "Fromage", price: 1 }],
      },
    ],
  },
  {
    name: "Boissons",
    emoji: "🥤",
    products: [
      { id: 8, name: "Coca-Cola", desc: "33cl", price: 2, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop" },
      { id: 9, name: "Ice Tea Pêche", desc: "33cl", price: 2, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop" },
      { id: 10, name: "Eau Minérale", desc: "50cl", price: 1.5, image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop" },
    ],
  },
];

type CartItem = {
  product: Product;
  size?: SizeOption;
  supplements: Supplement[];
  quantity: number;
};

const Demo = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [selectedSupps, setSelectedSupps] = useState<Supplement[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const openProduct = (p: Product) => {
    setSelectedProduct(p);
    setSelectedSize(p.sizes?.[0] || null);
    setSelectedSupps([]);
    setQuantity(1);
  };

  const toggleSupp = (s: Supplement) => {
    setSelectedSupps((prev) =>
      prev.find((x) => x.name === s.name) ? prev.filter((x) => x.name !== s.name) : [...prev, s]
    );
  };

  const getItemPrice = () => {
    if (!selectedProduct) return 0;
    const base = selectedProduct.price + (selectedSize?.price || 0);
    const suppsTotal = selectedSupps.reduce((sum, s) => sum + s.price, 0);
    return (base + suppsTotal) * quantity;
  };

  const addToCart = () => {
    if (!selectedProduct) return;
    setCart((prev) => [
      ...prev,
      { product: selectedProduct, size: selectedSize || undefined, supplements: selectedSupps, quantity },
    ]);
    setSelectedProduct(null);
  };

  const cartTotal = cart.reduce((sum, item) => {
    const base = item.product.price + (item.size?.price || 0);
    const supps = item.supplements.reduce((s, sup) => s + sup.price, 0);
    return sum + (base + supps) * item.quantity;
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-muted/30 max-w-md mx-auto relative">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="font-extrabold text-foreground text-lg">Istanbul Kebab 🔥</h1>
            <p className="text-xs text-muted-foreground">Ouvert · Livraison 30min</p>
          </div>
          <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full font-medium">DÉMO</span>
        </div>
      </div>

      {/* Category tabs */}
      <div className="sticky top-[57px] z-30 bg-background border-b border-border">
        <div className="flex overflow-x-auto gap-1 px-3 py-2 no-scrollbar">
          {menu.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === i
                  ? "gradient-warm text-primary-foreground shadow-glow"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="px-4 py-4 pb-24 space-y-3">
        <h2 className="font-bold text-foreground text-lg">
          {menu[activeCategory].emoji} {menu[activeCategory].name}
        </h2>
        {menu[activeCategory].products.map((p) => (
          <motion.button
            key={p.id}
            layout
            onClick={() => openProduct(p)}
            className="w-full bg-card rounded-2xl shadow-card overflow-hidden flex text-left hover:shadow-elevated transition-shadow"
          >
            <img src={p.image} alt={p.name} className="w-28 h-28 object-cover" />
            <div className="flex-1 p-3 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-foreground text-sm">{p.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{p.desc}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-extrabold text-primary">{p.price.toFixed(2)} €</span>
                <span className="w-7 h-7 rounded-full gradient-warm flex items-center justify-center">
                  <Plus className="w-4 h-4 text-primary-foreground" />
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Product detail modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 flex items-end justify-center"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background w-full max-w-md rounded-t-3xl max-h-[85vh] overflow-y-auto"
            >
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-48 object-cover" />
              <div className="p-5 space-y-5">
                <div>
                  <h2 className="text-xl font-extrabold text-foreground">{selectedProduct.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{selectedProduct.desc}</p>
                  <p className="text-lg font-extrabold text-primary mt-2">À partir de {selectedProduct.price.toFixed(2)} €</p>
                </div>

                {/* Size selection (obligatoire) */}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div>
                    <h3 className="font-bold text-foreground text-sm mb-2 flex items-center gap-2">
                      📏 Taille <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Obligatoire</span>
                    </h3>
                    <div className="space-y-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size.name}
                          onClick={() => setSelectedSize(size)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                            selectedSize?.name === size.name
                              ? "border-primary bg-accent"
                              : "border-border hover:border-muted-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedSize?.name === size.name ? "border-primary bg-primary" : "border-muted-foreground"
                            }`}>
                              {selectedSize?.name === size.name && <Check className="w-3 h-3 text-primary-foreground" />}
                            </div>
                            <span className="font-semibold text-foreground text-sm">{size.name}</span>
                          </div>
                          <span className="text-sm font-bold text-muted-foreground">
                            {size.price > 0 ? `+${size.price.toFixed(2)} €` : "Inclus"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Supplements (optionnel) */}
                {selectedProduct.supplements && selectedProduct.supplements.length > 0 && (
                  <div>
                    <h3 className="font-bold text-foreground text-sm mb-2 flex items-center gap-2">
                      ➕ Suppléments <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Optionnel</span>
                    </h3>
                    <div className="space-y-2">
                      {selectedProduct.supplements.map((supp) => {
                        const active = selectedSupps.find((s) => s.name === supp.name);
                        return (
                          <button
                            key={supp.name}
                            onClick={() => toggleSupp(supp)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                              active ? "border-primary bg-accent" : "border-border hover:border-muted-foreground"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                                active ? "border-primary bg-primary" : "border-muted-foreground"
                              }`}>
                                {active && <Check className="w-3 h-3 text-primary-foreground" />}
                              </div>
                              <span className="font-semibold text-foreground text-sm">{supp.name}</span>
                            </div>
                            <span className="text-sm font-bold text-primary">+{supp.price.toFixed(2)} €</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground text-sm">Quantité</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 rounded-full border-2 border-border flex items-center justify-center hover:bg-muted">
                      <Minus className="w-4 h-4 text-foreground" />
                    </button>
                    <span className="font-extrabold text-foreground text-lg w-6 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 rounded-full gradient-warm flex items-center justify-center">
                      <Plus className="w-4 h-4 text-primary-foreground" />
                    </button>
                  </div>
                </div>

                {/* Add to cart */}
                <button
                  onClick={addToCart}
                  className="w-full gradient-warm text-primary-foreground py-4 rounded-2xl font-bold text-base shadow-glow hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Ajouter · {getItemPrice().toFixed(2)} €
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart FAB */}
      {cartCount > 0 && !selectedProduct && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 max-w-md mx-auto"
        >
          <button
            onClick={() => setShowCart(true)}
            className="w-full gradient-warm text-primary-foreground py-4 rounded-2xl font-bold text-base shadow-glow flex items-center justify-center gap-3"
          >
            <ShoppingBag className="w-5 h-5" />
            Voir le panier ({cartCount}) · {cartTotal.toFixed(2)} €
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}

      {/* Cart drawer */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background shadow-elevated overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-extrabold text-foreground">🛒 Panier</h2>
                  <button onClick={() => setShowCart(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Panier vide</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, i) => (
                      <div key={i} className="bg-muted/50 rounded-xl p-4">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-bold text-foreground text-sm">{item.product.name}</h4>
                            {item.size && <p className="text-xs text-muted-foreground">Taille: {item.size.name}</p>}
                            {item.supplements.length > 0 && (
                              <p className="text-xs text-muted-foreground">+ {item.supplements.map((s) => s.name).join(", ")}</p>
                            )}
                            <p className="text-xs text-muted-foreground">Qté: {item.quantity}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="font-bold text-primary text-sm">
                              {((item.product.price + (item.size?.price || 0) + item.supplements.reduce((s, sup) => s + sup.price, 0)) * item.quantity).toFixed(2)} €
                            </span>
                            <button
                              onClick={() => setCart((prev) => prev.filter((_, idx) => idx !== i))}
                              className="text-xs text-destructive hover:underline"
                            >
                              Retirer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-border pt-4 flex justify-between items-center">
                      <span className="font-extrabold text-foreground text-lg">Total</span>
                      <span className="font-extrabold text-primary text-xl">{cartTotal.toFixed(2)} €</span>
                    </div>
                    <button className="w-full gradient-warm text-primary-foreground py-4 rounded-2xl font-bold shadow-glow hover:opacity-90 transition-opacity">
                      Commander (Démo)
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Demo;
