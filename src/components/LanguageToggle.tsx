import type { InsightLocale } from "../data/insight-locale";

interface LanguageToggleProps {
  locale: InsightLocale;
  onChange: (locale: InsightLocale) => void;
  className?: string;
}

export function LanguageToggle({
  locale,
  onChange,
  className = "",
}: LanguageToggleProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full border border-stroke p-0.5 text-xs font-body ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => onChange("en")}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          locale === "en"
            ? "bg-stroke/60 text-text-primary"
            : "text-muted hover:text-text-primary"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChange("zh")}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          locale === "zh"
            ? "bg-stroke/60 text-text-primary"
            : "text-muted hover:text-text-primary"
        }`}
      >
        中文
      </button>
    </div>
  );
}
