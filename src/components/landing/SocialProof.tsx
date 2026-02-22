import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Marco R.", role: "Pizza Place Owner", text: "We set up our menu in 3 minutes. Orders increased 40% the first week!" },
  { name: "Aisha K.", role: "Kebab Shop Owner", text: "My customers love scanning the QR code. No more printing costs!" },
  { name: "Pierre D.", role: "Bistro Owner", text: "The multi-language feature is a game changer for our tourist area." },
];

const SocialProof = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
          Loved by <span className="text-primary">Restaurant Owners</span>
        </h2>
        <p className="text-lg text-muted-foreground">Join 2,000+ restaurants already using MenuFlow.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-card"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground mb-4 text-sm leading-relaxed">"{t.text}"</p>
            <div>
              <p className="font-bold text-foreground text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
