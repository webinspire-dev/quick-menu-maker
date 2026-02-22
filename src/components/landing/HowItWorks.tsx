import { motion } from "framer-motion";
import { UserPlus, Package, QrCode } from "lucide-react";

const steps = [
  { icon: UserPlus, step: "01", title: "Create Account", desc: "Sign up in seconds. No credit card required." },
  { icon: Package, step: "02", title: "Add Products", desc: "Upload your menu items with photos and prices." },
  { icon: QrCode, step: "03", title: "Share QR Code", desc: "Print your QR code and start receiving orders." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
          How It <span className="text-primary">Works</span>
        </h2>
        <p className="text-lg text-muted-foreground">Three simple steps. That's it.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <div className="w-20 h-20 gradient-warm rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-glow">
              <s.icon className="w-10 h-10 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-primary">{s.step}</span>
            <h3 className="text-xl font-bold text-foreground mt-1 mb-2">{s.title}</h3>
            <p className="text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
