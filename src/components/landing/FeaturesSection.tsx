import { motion } from "framer-motion";
import {
  Infinity,
  SlidersHorizontal,
  Palette,
  Languages,
  BarChart3,
  RefreshCw,
} from "lucide-react";

const features = [
  { icon: Infinity, title: "Unlimited Products", desc: "Add as many items as you need. No limits on your creativity." },
  { icon: SlidersHorizontal, title: "Custom Options", desc: "Sizes, sauces, extras—let customers customize exactly how they want." },
  { icon: Palette, title: "Beautiful Templates", desc: "Professional designs that match your restaurant's brand." },
  { icon: Languages, title: "Multi-Language", desc: "Serve international customers with automatic translations." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Track views, popular items, and customer behavior in real time." },
  { icon: RefreshCw, title: "Instant Updates", desc: "Change prices or items anytime. Updates go live immediately." },
];

const FeaturesSection = () => (
  <section id="features" className="py-20 bg-muted/50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
          Everything You Need to <span className="text-primary">Succeed</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Powerful features designed for restaurant owners, not developers.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow group"
          >
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4 group-hover:gradient-warm transition-all">
              <f.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
