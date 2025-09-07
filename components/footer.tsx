"use client"

import { ImageWithSkeleton } from "@/components/image-with-skeleton"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900/50 border-t border-red-900/30 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ImageWithSkeleton
              src="/minebit-store-logo-new.png"
              alt="MineBit Store Logo"
              width={24}
              height={24}
              className="w-6 h-6"
              loading="lazy"
              sizes="24px"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              MineBit Store
            </span>
          </div>
          <p className="text-gray-400 text-sm">{t("footer.copyright")}</p>
          <p className="text-gray-500 text-xs mt-2">{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
  )
}
