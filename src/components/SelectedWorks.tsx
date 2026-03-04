import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PROJECTS = [
  { slug: "variable-stars-project", title: "discovered 136 novel variable astrophysical objects", image: "/projects/8JeeV5CgKcEmLBs42PJQzf%20(1).jpg", gradient: "from-violet-500 via-fuchsia-400/60 via-indigo-500/60 to-transparent" },
  { slug: "urban-architecture", title: "Urban Architecture", image: "/projects/building.png", gradient: "from-sky-500 via-blue-400/60 to-transparent" },
  { slug: "human-perspective", title: "Human Perspective", image: "/projects/person.png", gradient: "from-emerald-500 via-emerald-300/60 via-teal-500/60 to-transparent" },
  { slug: "brand-identity", title: "Brand Identity", image: "/projects/Screenshot%202026-03-04%20at%2010.05.16%E2%80%AFPM.png", gradient: "from-amber-500 via-amber-300/60 via-orange-500/60 to-transparent" },
];

export function SelectedWorks() {
  return (
    <section className="bg-bg py-12 md:py-16" id="work">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-20"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
              Featured <span className="font-display italic">projects</span>
            </h2>
            <p className="text-muted md:text-lg">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          <button className="hidden md:inline-flex group relative items-center gap-2 rounded-full px-6 py-3 transition-all hover:scale-105">
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity" />
            <span className="absolute inset-[1.5px] bg-bg rounded-full" />
            <span className="relative z-10 text-sm font-medium">View all work</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className={cn(
                "group relative bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer",
                // Alternate column spans: 7/5/5/7
                i % 4 === 0 || i % 4 === 3 ? "md:col-span-7" : "md:col-span-5",
                "aspect-[4/3] md:aspect-auto md:h-[400px] lg:h-[500px]"
              )}
            >
              {/* Halftone Overlay */}
              <div 
                className="absolute inset-0 z-10 opacity-20 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "4px 4px"
                }}
              />

              {/* Colorful Gradient (visible on hover) */}
              <div 
                className={cn(
                  "absolute inset-0 z-10 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  project.gradient
                )}
              />

              {/* Background Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Hover Overlay */}
              <div className="absolute inset-0 z-20 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-all duration-500 flex items-center justify-center">
                {/* Hover Label */}
                <div className="relative transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 animate-gradient-shift accent-gradient" />
                  <div className="relative bg-white text-black px-6 py-3 rounded-full flex items-center gap-2">
                    <span className="text-sm font-medium">View —</span>
                    <span className="font-display italic text-lg">{project.title}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
