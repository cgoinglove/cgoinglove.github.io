import { useLanguage } from "@/context/language";
import { Button } from "@/components/ui/button";
import { Globe2 } from "lucide-react";

export function LanguageToggle() {
  const { toggle } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="fixed top-4 right-4 z-50 size-8 text-xs font-bold font-mono hover:bg-input"
    >
      <Globe2/>
    </Button>
  );
}
