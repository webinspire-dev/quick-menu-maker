import { motion } from "framer-motion";
import { ArrowRight, Play, Zap, Smartphone, Clock } from "lucide-react";
import heroMockup from "@/assets/hero-mockup.png";

const badges = [
  { icon: Clock, label: "5 min setup" },
  { icon: Zap, label: "No tech skills needed" },
  { icon: Smartphone, label: "100% mobile optimized" },
];

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 gradient-warm-soft opacity-60" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" /> Trusted by 2,000+ restaurants
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] mb-6">
              Create Your Online Menu{" "}
              <span className="text-primary">in 5 Minutes</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              No website needed. Get your QR code instantly. Start receiving digital orders today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <button
                onClick={() => scrollTo("signup")}
                className="gradient-warm text-primary-foreground px-8 py-4 rounded-xl text-base font-bold shadow-glow hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                Create Free Account <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="/demo"
                className="bg-background border-2 border-border text-foreground px-8 py-4 rounded-xl text-base font-bold hover:bg-muted transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 text-primary" /> See Demo
              </a>
            </div>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {badges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-background shadow-soft rounded-full px-4 py-2 text-sm font-medium text-foreground"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="animate-float">
              <img
                src={heroMockup}
                alt="MenuFlow digital menu preview on mobile phone"
                className="w-72 sm:w-80 lg:w-96 drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
