import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    desc: "Perfect to get started",
    features: ["1 restaurant", "Up to 20 products", "QR code", "Basic template", "Community support"],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "19",
    desc: "For growing restaurants",
    features: [
      "1 restaurant",
      "Unlimited products",
      "Custom options & extras",
      "All templates",
      "Analytics dashboard",
      "Multi-language",
      "Priority support",
    ],
    cta: "Go Pro",
    highlighted: true,
  },
  {
    name: "Business",
    price: "49",
    desc: "For multi-location chains",
    features: [
      "Up to 10 restaurants",
      "Everything in Pro",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "Advanced analytics",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const PricingSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground">No hidden fees. Cancel anytime.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`rounded-2xl p-8 flex flex-col ${
                p.highlighted
                  ? "gradient-warm text-primary-foreground shadow-glow scale-[1.03]"
                  : "bg-card shadow-card"
              }`}
            >
              <h3 className={`text-lg font-bold mb-1 ${p.highlighted ? "" : "text-foreground"}`}>{p.name}</h3>
              <p className={`text-sm mb-4 ${p.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{p.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-black">${p.price}</span>
                <span className={`text-sm ${p.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>/month</span>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${p.highlighted ? "text-primary-foreground" : "text-primary"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollTo("signup")}
                className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  p.highlighted
                    ? "bg-background text-foreground hover:bg-muted"
                    : "gradient-warm text-primary-foreground shadow-glow hover:opacity-90"
                }`}
              >
                {p.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
