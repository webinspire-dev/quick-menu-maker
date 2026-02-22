import { motion } from "framer-motion";
import { UtensilsCrossed, Package, QrCode, ShoppingCart } from "lucide-react";

const steps = [
  {
    icon: UtensilsCrossed,
    step: "1",
    title: "Create Your Menu",
    desc: "Set up your restaurant profile and customize your menu design in minutes.",
  },
  {
    icon: Package,
    step: "2",
    title: "Add Your Products",
    desc: "Add dishes with photos, prices, and options like sizes and extras.",
  },
  {
    icon: QrCode,
    step: "3",
    title: "Generate QR Code",
    desc: "Get a unique QR code. Print it and place it on your tables.",
  },
  {
    icon: ShoppingCart,
    step: "4",
    title: "Receive Orders",
    desc: "Customers scan, browse, and order. You get notified instantly.",
  },
];

const SolutionSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
          The Simplest Way to Go <span className="text-primary">Digital</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Four easy steps to transform your restaurant experience.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="relative text-center"
          >
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
              <s.icon className="w-8 h-8 text-primary" />
              <span className="absolute -top-2 -right-2 w-7 h-7 gradient-warm rounded-full text-primary-foreground text-xs font-bold flex items-center justify-center">
                {s.step}
              </span>
            </div>
            <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
