import { motion } from "framer-motion";
import { ArrowUpRight, Telescope, Rocket, Wrench } from "lucide-react";

const PROJECTS = [
  {
    icon: Telescope,
    text: "Built a pipeline that analyzes astronomical star data to automatically detect and classify variable stars, identifying about 130 candidates now under review by AAVSO.",
    href: "https://github.com/dongdimianlyu/variable-star-project/blob/0e019044be1ac88d3eae091ec9dd0d3eb4e0bb83/README.md",
    label: "View README",
  },
  {
    icon: Rocket,
    text: "Developed an AI-powered platform that helps small business owners and teams turn their goals into daily action plans and smarter inventory decisions.",
    href: "https://openclaw-kit.vercel.app/",
    label: "Visit OpenClaw Kit",
  },
  {
    icon: Wrench,
    text: "Created a developer toolkit of reusable tools that make it faster and easier to build consistent, reliable software.",
    href: "https://ventry20.vercel.app/",
    label: "Visit Ventry",
  },
];

export function Projects() {
  return (
    <section className="bg-bg py-16 md:py-24" id="work">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-xl mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            Featured <span className="font-display italic">projects</span>
          </h2>
          <p className="text-muted md:text-lg">
            A selection of projects I've worked on
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-40px" }}
                className="group relative flex flex-col justify-between bg-surface/40 border border-stroke rounded-3xl p-8 md:p-9 min-h-[320px] transition-colors hover:bg-surface/70"
              >
                {/* Icon Badge */}
                <div className="relative w-12 h-12 rounded-full mb-8 flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full opacity-60 group-hover:opacity-100 accent-gradient transition-opacity" />
                  <span className="absolute inset-[1.5px] bg-bg rounded-full" />
                  <Icon className="relative z-10 w-5 h-5 text-text-primary" strokeWidth={1.75} />
                </div>

                {/* Text */}
                <p className="text-lg md:text-xl leading-relaxed text-text-primary/90 font-display flex-grow">
                  {project.text}
                </p>

                {/* Button */}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex items-center gap-2 self-start mt-8 rounded-full px-5 py-2.5 transition-all hover:scale-105"
                >
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 accent-gradient transition-opacity" />
                  <span className="absolute inset-[1.5px] bg-bg rounded-full" />
                  <span className="relative z-10 text-sm font-medium">{project.label}</span>
                  <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
