import { createContext, useContext, useState, useCallback } from "react";

export type Locale = "ko" | "en";

interface LanguageContextValue {
  locale: Locale;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "ko",
  toggle: () => {},
});

function getInitialLocale(): Locale {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  return lang === "en" ? "en" : "ko";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  const toggle = useCallback(() => {
    setLocale((prev) => (prev === "ko" ? "en" : "ko"));
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
