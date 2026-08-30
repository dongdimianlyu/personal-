import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { ArrowUpRight, X } from "lucide-react";
import { useLenis } from "../context/LenisContext";
import { useLenisRaf } from "../hooks/useLenisRaf";
import { READER_LENIS_OPTIONS } from "../lib/lenis-config";
import { INSIGHT_UI, type InsightLocale } from "../data/insight-locale";
import type { Insight } from "../data/insights";
import { getScrollRevealViewport } from "./ScrollReveal";
import { LanguageToggle } from "./LanguageToggle";

interface InsightReaderProps {
  insight: Insight | null;
  locale: InsightLocale;
  onLocaleChange: (locale: InsightLocale) => void;
  onClose: () => void;
}


export function InsightReader({
  insight,
  locale,
  onLocaleChange,
  onClose,
}: InsightReaderProps) {
  const { pause, resume } = useLenis();
  const ui = INSIGHT_UI[locale];
  const readingFont = locale === "zh" ? "font-reading-zh" : "font-reading";
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [readerLenis, setReaderLenis] = useState<Lenis | null>(null);

  const reveal = useMemo(
    () => ({
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      viewport: getScrollRevealViewport(scrollRef),
      transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] as const },
    }),
    []
  );

  useLenisRaf(readerLenis);

  useEffect(() => {
    if (!insight) return;

    pause();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      resume();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [insight, onClose, pause, resume]);

  useEffect(() => {
    if (!insight || !scrollRef.current || !contentRef.current) return;

    const instance = new Lenis({
      ...READER_LENIS_OPTIONS,
      wrapper: scrollRef.current,
      content: contentRef.current,
    });

    setReaderLenis(instance);

    const onScroll = ({ progress }: { progress: number }) => {
      setScrollProgress(progress);
    };

    instance.on("scroll", onScroll);
    instance.scrollTo(0, { immediate: true });

    return () => {
      instance.off("scroll", onScroll);
      instance.destroy();
      setReaderLenis(null);
      setScrollProgress(0);
    };
  }, [insight, locale]);

  let paragraphIndex = 0;

  return (
    <AnimatePresence>
      {insight && (
        <motion.div
          key={`${insight.id}-${locale}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9998] bg-bg/95 backdrop-blur-xl"
          data-lenis-prevent
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-20 origin-left accent-gradient"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />

          <div ref={scrollRef} className="h-full overflow-hidden overscroll-contain touch-pan-y">
            <div ref={contentRef}>
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-10 py-5 bg-bg/80 backdrop-blur-md border-b border-stroke/50">
                <button
                  type="button"
                  onClick={onClose}
                  className="group flex items-center gap-2 text-sm text-muted hover:text-text-primary transition-colors"
                >
                  <span className="w-8 h-8 rounded-full border border-stroke flex items-center justify-center group-hover:border-text-primary/40 transition-colors">
                    <X className="w-4 h-4" />
                  </span>
                  {ui.back}
                </button>
                <div className="flex items-center gap-4">
                  <LanguageToggle locale={locale} onChange={onLocaleChange} />
                  <span className="text-xs text-muted uppercase tracking-[0.3em] hidden sm:block">
                    {ui.headerLabel}
                  </span>
                </div>
              </div>

              <article
                className={`max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-20 ${readingFont}`}
              >
                <motion.header
                  {...reveal}
                  className="mb-12 md:mb-16"
                >
                  <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6 font-body">
                    {insight.subtitle}
                  </p>
                  <h1
                    className={`text-4xl md:text-6xl tracking-tight leading-[1.1] mb-6 ${
                      locale === "zh"
                        ? "font-reading-zh font-medium"
                        : "font-display italic"
                    }`}
                  >
                    {insight.title}
                  </h1>
                  <div className="w-16 h-px accent-gradient" />
                </motion.header>

                <div className="space-y-8">
                  {insight.sections.map((section, i) => {
                    if (section.type === "paragraph") {
                      const isFirst = paragraphIndex === 0;
                      paragraphIndex += 1;

                      return (
                        <motion.p
                          key={i}
                          {...reveal}
                          className={`text-[1.125rem] md:text-[1.25rem] leading-[1.85] tracking-[0.01em] text-text-primary/88 ${
                            isFirst && locale === "en" ? "insight-drop-cap" : ""
                          }`}
                        >
                          {section.content}
                        </motion.p>
                      );
                    }

                    if (section.type === "divider") {
                      return (
                        <motion.div
                          key={i}
                          {...reveal}
                          className="flex items-center gap-4 py-2"
                        >
                          <div className="w-12 h-px bg-stroke" />
                          <div className="w-1.5 h-1.5 rounded-full bg-text-primary/30" />
                          <div className="flex-1 h-px bg-stroke/50" />
                        </motion.div>
                      );
                    }

                    if (section.type === "image" && section.src) {
                      return (
                        <motion.figure
                          key={i}
                          {...reveal}
                          className="my-10 md:my-14"
                        >
                          <div className="overflow-hidden rounded-2xl border border-stroke">
                            <img
                              src={section.src}
                              alt={section.alt ?? ""}
                              className="w-full h-56 md:h-80 object-cover"
                            />
                          </div>
                          {section.alt && (
                            <figcaption className="mt-3 text-xs text-muted text-center italic font-body">
                              {section.alt}
                            </figcaption>
                          )}
                        </motion.figure>
                      );
                    }

                    if (section.type === "pullquote" && section.content) {
                      return (
                        <motion.blockquote
                          key={i}
                          {...reveal}
                          className="border-l-2 border-text-primary/30 pl-6 md:pl-8 py-2 my-10"
                        >
                          <p
                            className={`text-2xl md:text-3xl text-text-primary/90 leading-snug ${
                              locale === "zh"
                                ? "font-reading-zh font-medium"
                                : "font-display italic"
                            }`}
                          >
                            {section.content}
                          </p>
                        </motion.blockquote>
                      );
                    }

                    if (section.type === "aside" && section.content) {
                      return (
                        <motion.aside
                          key={i}
                          {...reveal}
                          className="bg-surface/60 border border-stroke rounded-2xl p-6 md:p-8 my-10"
                        >
                          {section.label && (
                            <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4 font-body">
                              {section.label}
                            </p>
                          )}

                          {(section.songTitle || section.artist) && (
                            <div className="mb-5 pb-5 border-b border-stroke/60">
                              {section.songTitle && (
                                <p className="text-xl md:text-2xl font-display italic text-text-primary mb-1">
                                  {section.songTitle}
                                </p>
                              )}
                              {section.artist && (
                                <p className="text-sm text-muted font-body">
                                  {section.artist}
                                </p>
                              )}
                            </div>
                          )}

                          <div
                            className={`text-[1.0625rem] md:text-[1.125rem] leading-[1.85] tracking-[0.01em] text-text-primary/78 whitespace-pre-line ${
                              section.songTitle ? "italic" : ""
                            }`}
                          >
                            {section.content}
                          </div>

                          {section.spotifyUrl && (
                            <a
                              href={section.spotifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/spotify relative inline-flex items-center gap-2 mt-6 rounded-full px-5 py-2.5 transition-all hover:scale-105"
                            >
                              <span className="absolute inset-0 rounded-full opacity-0 group-hover/spotify:opacity-100 accent-gradient transition-opacity" />
                              <span className="absolute inset-[1.5px] bg-surface rounded-full" />
                              <span className="relative z-10 text-sm font-medium font-body">
                                {ui.listenSpotify}
                              </span>
                              <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform group-hover/spotify:translate-x-0.5 group-hover/spotify:-translate-y-0.5" />
                            </a>
                          )}
                        </motion.aside>
                      );
                    }

                    if (section.type === "table" && section.headers && section.rows) {
                      return (
                        <motion.div
                          key={i}
                          {...reveal}
                          className="my-10 overflow-x-auto"
                        >
                          {section.caption && (
                            <p className="text-sm text-muted mb-4 font-body italic">
                              {section.caption}
                            </p>
                          )}
                          <table className="w-full border-collapse rounded-2xl overflow-hidden border border-stroke">
                            <thead>
                              <tr className="bg-surface/80">
                                {section.headers.map((header, hi) => (
                                  <th
                                    key={hi}
                                    className="text-left text-xs uppercase tracking-[0.2em] text-muted font-body px-5 py-4 border-b border-stroke"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {section.rows.map((row, ri) => (
                                <tr
                                  key={ri}
                                  className={`border-b border-stroke/50 last:border-b-0 transition-colors hover:bg-surface/40 ${
                                    ri === section.rows!.length - 1
                                      ? "font-medium text-text-primary"
                                      : "text-text-primary/85"
                                  }`}
                                >
                                  {row.map((cell, ci) => (
                                    <td
                                      key={ci}
                                      className={`px-5 py-4 text-[1.0625rem] ${
                                        ci > 0
                                          ? "tabular-nums font-mono text-sm"
                                          : readingFont
                                      }`}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </motion.div>
                      );
                    }

                    if (section.type === "formula" && section.lines) {
                      return (
                        <motion.div
                          key={i}
                          {...reveal}
                          className="my-10"
                        >
                          {section.label && (
                            <p className="text-xs text-muted uppercase tracking-[0.3em] mb-3 font-body">
                              {section.label}
                            </p>
                          )}
                          <div className="insight-formula bg-surface/60 border border-stroke rounded-2xl px-6 py-5 md:px-8 md:py-6">
                            {section.lines.map((line, li) => (
                              <p
                                key={li}
                                className={`font-mono text-sm md:text-[0.9375rem] leading-relaxed tabular-nums ${
                                  line.startsWith("─")
                                    ? "text-stroke my-2 select-none"
                                    : "text-text-primary/90"
                                }`}
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        </motion.div>
                      );
                    }

                    return null;
                  })}
                </div>

                <motion.div
                  {...reveal}
                  className="mt-16 md:mt-24 pt-8 border-t border-stroke flex justify-center"
                >
                  <button
                    type="button"
                    onClick={onClose}
                    className="group relative rounded-full text-sm px-7 py-3.5 border border-stroke text-text-primary hover:border-transparent transition-all hover:scale-105 overflow-hidden font-body"
                  >
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 accent-gradient transition-opacity" />
                    <span className="absolute inset-[2px] bg-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 font-medium">{ui.close}</span>
                  </button>
                </motion.div>
              </article>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
