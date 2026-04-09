import { motion } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  icon: string;
  /** Tailwind col-span / row-span classes */
  span: string;
  accentColor: string;
}

const features: Feature[] = [
  {
    title: "AI Workflow Builder",
    description:
      "Describe what you need in plain English. FlowState's AI maps your intent to production-ready automations in seconds.",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    span: "md:col-span-2 md:row-span-2",
    accentColor: "from-brand-500/20 to-purple-500/10",
  },
  {
    title: "200+ Integrations",
    description:
      "Slack, Notion, Salesforce, GitHub, and everything in between — connected in one click.",
    icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
    span: "md:col-span-1 md:row-span-1",
    accentColor: "from-emerald-500/20 to-teal-500/10",
  },
  {
    title: "Real-Time Logs",
    description: "Every execution traced, every decision explained. Debug with full transparency.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    span: "md:col-span-1 md:row-span-1",
    accentColor: "from-amber-500/20 to-orange-500/10",
  },
  {
    title: "Branching Logic",
    description:
      "If/else, loops, error handlers — build enterprise-grade logic without writing a single line of code.",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
    span: "md:col-span-1 md:row-span-1",
    accentColor: "from-rose-500/20 to-pink-500/10",
  },
  {
    title: "Team Collaboration",
    description:
      "Shared workspaces, role-based access, and version history so your whole team stays in sync.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    span: "md:col-span-1 md:row-span-1",
    accentColor: "from-sky-500/20 to-cyan-500/10",
  },
  {
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified. End-to-end encryption, SSO, and audit logs built in from day one.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    span: "md:col-span-1 md:row-span-1",
    accentColor: "from-brand-500/20 to-indigo-500/10",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function BentoGrid() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-copy-primary tracking-tight">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
              ship faster
            </span>
          </h2>
          <p className="mt-4 text-lg text-copy-secondary max-w-2xl mx-auto">
            A complete automation platform that grows with your team — from
            first workflow to enterprise scale.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className={`group relative rounded-2xl lg:rounded-3xl border border-surface-border bg-white/[0.03] backdrop-blur-sm p-6 lg:p-8 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/[0.08] transition-all duration-300 ${feature.span}`}
            >
              {/* Accent Gradient Glow */}
              <div
                className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${feature.accentColor} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-surface-border flex items-center justify-center mb-5">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-400"
                  >
                    <path d={feature.icon} />
                  </svg>
                </div>

                <h3 className="text-xl lg:text-2xl font-semibold text-copy-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-copy-secondary leading-relaxed text-sm lg:text-base">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
