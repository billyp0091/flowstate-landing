import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px] animate-glow-pulse [animation-delay:2s]" />
        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-surface-border backdrop-blur-sm text-sm text-copy-secondary mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Now in Public Beta
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-copy-primary tracking-tight leading-[1.1] max-w-4xl mx-auto"
        >
          Automate any workflow{" "}
          <span className="bg-gradient-to-r from-brand-400 via-brand-500 to-purple-500 bg-clip-text text-transparent">
            with AI precision
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-6 text-lg sm:text-xl text-copy-secondary max-w-2xl mx-auto leading-relaxed"
        >
          FlowState connects your tools, learns your patterns, and builds
          automations that actually work — no code, no complexity, just results.
        </motion.p>

        {/* CTA Group */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#signup"
            className="group relative px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-brand-500 to-purple-500 rounded-2xl shadow-xl shadow-brand-500/25 hover:shadow-2xl hover:shadow-brand-500/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Building for Free
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </a>
          <a
            href="#demo"
            className="px-8 py-4 text-base font-semibold text-copy-primary bg-white/5 border border-surface-border rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
          >
            Watch Demo
          </a>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <div className="flex -space-x-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-surface-base bg-gradient-to-br from-brand-300 to-purple-400"
                style={{ opacity: 1 - i * 0.12 }}
              />
            ))}
          </div>
          <p className="text-sm text-copy-secondary">
            <span className="font-semibold text-copy-primary">2,400+</span>{" "}
            teams already in flow
          </p>
        </motion.div>
      </div>
    </section>
  );
}
