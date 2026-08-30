import { INSIGHTS } from "./insights";
import { INSIGHTS_ZH } from "./insights.zh";
import type { Insight } from "./insights";

export type InsightLocale = "en" | "zh";

export const INSIGHT_UI = {
  en: {
    sectionEyebrow: "Writings",
    sectionTitle: "Genius",
    sectionTitleItalic: "insights",
    sectionDescription:
      "Reflections on beauty, music, and the things that point beyond themselves.",
    read: "Read",
    essayLabel: (index: number) => `Essay ${String(index + 1).padStart(2, "0")}`,
    back: "Back",
    close: "Close",
    headerLabel: "Genius Insights",
    listenSpotify: "Listen on Spotify",
    finis: "finis",
  },
  zh: {
    sectionEyebrow: "文集",
    sectionTitle: "天才",
    sectionTitleItalic: "洞见",
    sectionDescription: "关于美、音乐，以及那些指向自身之外事物的沉思。",
    read: "阅读",
    essayLabel: (index: number) => `文章 ${String(index + 1).padStart(2, "0")}`,
    back: "返回",
    close: "关闭",
    headerLabel: "天才洞见",
    listenSpotify: "在 Spotify 收听",
    finis: "终",
  },
} as const;

export function getInsights(locale: InsightLocale): Insight[] {
  return locale === "zh" ? INSIGHTS_ZH : INSIGHTS;
}

export function getInsightById(
  id: string,
  locale: InsightLocale
): Insight | undefined {
  return getInsights(locale).find((insight) => insight.id === id);
}
