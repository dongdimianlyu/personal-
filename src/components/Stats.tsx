import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STATS = [
  { number: "4+", label: "Years Experience", sublabel: "In Software Engineering" },
  { number: "12+", label: "Projects Done", sublabel: "In last 5 years." },
  { number: "1m+", label: "Seconds Lived", sublabel: "With a long story to tell" },
];

export function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24">
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
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Stats & Facts</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            Making an <span className="font-display italic text-text-primary/90">impact</span>
          </h2>
          <p className="text-muted md:text-lg">
            The numbers
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-40px" }}
              className={cn(
                "flex flex-col gap-6",
                // 3rd card spans 2 cols on small screens, 1 col on large
                i === 2 ? "sm:col-span-2 lg:col-span-1" : ""
              )}
            >
              {/* Number */}
              <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tighter tabular-nums bg-clip-text text-transparent bg-gradient-to-b from-text-primary to-text-primary/50">
                {stat.number}
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-stroke relative overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "0%" }}
                  transition={{ duration: 1.4, delay: 0.4 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="absolute inset-0 bg-text-primary/30"
                />
              </div>

              {/* Label & Sublabel */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">{stat.label}</h3>
                <p className="text-sm text-muted">{stat.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
