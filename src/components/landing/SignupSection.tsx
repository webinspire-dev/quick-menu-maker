import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

const planOptions = ["Free", "Pro", "Business"];

const SignupSection = () => {
  const [form, setForm] = useState({
    restaurantName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    plan: "Free",
  });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder
    alert("Account creation will be available soon! Thanks for your interest.");
  };

  return (
    <section id="signup" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              Create Your <span className="text-primary">Menu Now</span>
            </h2>
            <p className="text-muted-foreground">
              Start for free. No credit card required.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-8 shadow-elevated space-y-5"
          >
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Restaurant Name
              </label>
              <input
                type="text"
                required
                value={form.restaurantName}
                onChange={(e) => update("restaurantName", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="e.g. Pizza Palace"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Owner Name
              </label>
              <input
                type="text"
                required
                value={form.ownerName}
                onChange={(e) => update("ownerName", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@restaurant.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Phone
              </label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="+1 234 567 890"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Min. 6 characters"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Select Plan
              </label>
              <div className="grid grid-cols-3 gap-3">
                {planOptions.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => update("plan", p)}
                    className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                      form.plan === p
                        ? "gradient-warm text-primary-foreground border-transparent"
                        : "border-border bg-background text-foreground hover:border-primary/40"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full gradient-warm text-primary-foreground py-4 rounded-xl text-base font-bold shadow-glow hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              Create My Menu Now <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> No credit card required for free plan
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default SignupSection;
