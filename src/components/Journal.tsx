import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ENTRIES = [
  { title: "The Future of Generative Art in 2026", image: "/explorations/planet.jpeg", readTime: "6 min read", date: "Feb 13, 2026" },
  { title: "Designing for the Next Billion Users", image: "/explorations/cubes.jpeg", readTime: "5 min read", date: "Feb 06, 2026" },
  { title: "The Psychology of Minimalist Motion", image: "/explorations/ascii.jpeg", readTime: "6 min read", date: "Feb 03, 2026" },
  { title: "The Importance of Mobile-First Design", image: "/explorations/smoke.jpeg", readTime: "5 min read", date: "Jan 31, 2026" },
];

export function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1000px] mx-auto px-6 md:px-10 lg:px-16">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
              Recent <span className="font-display italic">thoughts</span>
            </h2>
            <p className="text-muted md:text-lg">
              Writing about design, technology, and the intersection of both.
            </p>
          </div>

          <button className="hidden md:inline-flex group relative items-center gap-2 rounded-full px-6 py-3 transition-all hover:scale-105">
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity" />
            <span className="absolute inset-[1.5px] bg-bg rounded-full" />
            <span className="relative z-10 text-sm font-medium">View all</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Entries */}
        <div className="flex flex-col gap-4">
          {ENTRIES.map((entry, i) => (
            <motion.a
              key={entry.title}
              href="#"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-colors cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full overflow-hidden border border-stroke/50 group-hover:border-stroke transition-colors">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Title */}
              <div className="flex-grow">
                <h3 className="text-lg md:text-2xl font-medium transition-transform duration-300 group-hover:translate-x-1">
                  {entry.title}
                </h3>
              </div>

              {/* Dotted Line (Desktop) */}
              <div className="hidden lg:block flex-grow h-px bg-stroke/30 border-t border-dashed border-stroke mx-4" />

              {/* Meta */}
              <div className="flex items-center gap-6 text-sm text-muted shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                <div className="flex items-center gap-3">
                  <span>{entry.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-stroke" />
                  <span>{entry.date}</span>
                </div>

                {/* Arrow Circle */}
                <div className="w-10 h-10 rounded-full border border-stroke flex items-center justify-center transition-colors duration-300 group-hover:bg-text-primary group-hover:text-bg">
                  <ArrowRight className="w-4 h-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
