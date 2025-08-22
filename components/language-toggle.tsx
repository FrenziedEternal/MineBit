"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "th" ? "en" : "th")
  }

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
    >
      <Globe className="w-4 h-4 mr-2" />
      {language === "th" ? "EN" : "TH"}
    </Button>
  )
}
