import { motion } from "framer-motion";
import { FileX, DollarSign, QrCode, Globe } from "lucide-react";

const problems = [
  {
    icon: FileX,
    title: "Paper Menus Are Outdated",
    desc: "Customers expect digital. Paper menus get dirty, torn, and ignored.",
  },
  {
    icon: DollarSign,
    title: "Hard to Update Prices",
    desc: "Every price change means reprinting. Wasted time and money.",
  },
  {
    icon: QrCode,
    title: "No QR Code",
    desc: "Competitors already use QR menus. Don't get left behind.",
  },
  {
    icon: Globe,
    title: "No Online Presence",
    desc: "Without a digital menu, you're invisible to new customers.",
  },
];

const ProblemSection = () => (
  <section className="py-20 bg-muted/50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
          Still Using Paper Menus?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your restaurant is losing customers every day. Here's why.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {problems.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-card text-center"
          >
            <div className="w-14 h-14 gradient-warm rounded-xl flex items-center justify-center mx-auto mb-4">
              <p.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
