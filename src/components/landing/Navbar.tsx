import { motion } from "framer-motion";
import { Menu, ArrowRight } from "lucide-react";
import { useState } from "react";

const navLinks = ["Features", "Pricing", "FAQ"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <span className="text-xl font-extrabold text-foreground tracking-tight">
          Menu<span className="text-primary">Flow</span>
        </span>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => scrollTo("signup")}
            className="gradient-warm text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold shadow-glow hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-b border-border px-4 pb-4 flex flex-col gap-3"
        >
          {navLinks.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              className="text-sm font-medium text-muted-foreground hover:text-foreground py-2"
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => scrollTo("signup")}
            className="gradient-warm text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold"
          >
            Get Started
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
