import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Do I need technical skills?", a: "Not at all! If you can use a smartphone, you can set up your menu. Our platform is designed for simplicity." },
  { q: "Is there really a free plan?", a: "Yes! The free plan includes up to 20 products, a QR code, and a basic template. No credit card required." },
  { q: "Can I update my menu anytime?", a: "Absolutely. Changes go live instantly. Update prices, add items, or change photos whenever you want." },
  { q: "Do my customers need an app?", a: "No. Customers simply scan the QR code with their phone camera and see your menu in their browser." },
  { q: "What if I have multiple locations?", a: "Our Business plan supports up to 10 restaurants under one account with centralized management." },
  { q: "Can I cancel anytime?", a: "Yes, there are no contracts. You can upgrade, downgrade, or cancel at any time." },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl shadow-soft overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-semibold text-foreground text-sm">{f.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${openIdx === i ? "rotate-180" : ""}`}
                />
              </button>
              {openIdx === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-6 pb-4"
                >
                  <p className="text-sm text-muted-foreground">{f.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
