import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { INSIGHTS } from "../data/insights";
import { InsightReader } from "./InsightReader";

export function GeniusInsights() {
  const [activeInsightId, setActiveInsightId] = useState<string | null>(null);
  const activeInsight =
    INSIGHTS.find((insight) => insight.id === activeInsightId) ?? null;

  return (
    <>
      <section className="bg-bg py-16 md:py-24" id="insights">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-xl mb-16 md:mb-24"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Writings
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
              Genius <span className="font-display italic">insights</span>
            </h2>
            <p className="text-muted md:text-lg">
              Reflections on beauty, music, and the things that point beyond
              themselves.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6 md:gap-8">
            {INSIGHTS.map((insight, i) => (
              <motion.button
                key={insight.id}
                type="button"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, margin: "-40px" }}
                onClick={() => setActiveInsightId(insight.id)}
                className="group relative w-full text-left overflow-hidden rounded-3xl border border-stroke min-h-[280px] md:min-h-[340px] transition-all hover:border-text-primary/20 hover:scale-[1.01]"
              >
                <img
                  src={insight.coverImage}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-bg/40 md:to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />

                <div className="relative z-10 flex flex-col justify-between h-full min-h-[280px] md:min-h-[340px] p-8 md:p-12">
                  <div className="max-w-xl">
                    <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">
                      Essay {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-3xl md:text-5xl font-display italic tracking-tight text-text-primary mb-4 leading-tight">
                      {insight.title}
                    </h3>
                    <p className="text-sm md:text-base text-text-primary/70 leading-relaxed">
                      {insight.teaser}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-8 text-sm text-text-primary/80 group-hover:text-text-primary transition-colors">
                    <span className="relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 border border-stroke/80 bg-bg/40 backdrop-blur-sm group-hover:border-transparent transition-all">
                      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity" />
                      <span className="absolute inset-[1.5px] bg-bg/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative z-10 font-medium">Read essay</span>
                      <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <InsightReader
        insight={activeInsight}
        onClose={() => setActiveInsightId(null)}
      />
    </>
  );
}
