"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, FileText, Shield, DollarSign, Edit, RefreshCw, Clock, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { useScrollRestoration } from "@/hooks/use-scroll-restoration"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { LanguageToggle } from "@/components/language-toggle"

export default function TermsOfServicePage() {
  const { navigateBack } = useScrollRestoration()
  const { t } = useLanguage()

  const terms = [
    {
      icon: Shield,
      title: t("terms.term1.title"),
      content: t("terms.term1.content"),
    },
    {
      icon: DollarSign,
      title: t("terms.term2.title"),
      content: t("terms.term2.content"),
    },
    {
      icon: Edit,
      title: t("terms.term3.title"),
      content: t("terms.term3.content"),
    },
    {
      icon: RefreshCw,
      title: t("terms.term4.title"),
      content: t("terms.term4.content"),
    },
    {
      icon: Clock,
      title: t("terms.term5.title"),
      content: t("terms.term5.content"),
    },
    {
      icon: AlertTriangle,
      title: t("terms.term6.title"),
      content: t("terms.term6.content"),
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-red-900/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="https://xv1t4wfzjkn6kzdb.public.blob.vercel-storage.com/logo/IMG_0699-RRFqZDmOBPBuboVbW5g0rj0XhGf0KN.png"
                alt="MineBit Store Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                MineBit Store
              </h1>
            </Link>
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <Link href="/favorites">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Heart className="w-4 h-4 mr-2" />
                  {t("favorites")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <button onClick={navigateBack} className="text-red-400 hover:text-red-300 flex items-center cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t("nav.back")}
          </button>
          <span className="text-gray-500">/</span>
          <span className="text-white">{t("terms.breadcrumb")}</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              {t("terms.title")}
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("terms.subtitle")}</p>
        </div>

        {/* Terms */}
        <div className="max-w-4xl mx-auto space-y-8">
          {terms.map((term, index) => {
            const IconComponent = term.icon
            return (
              <Card
                key={index}
                className="bg-gray-900/50 border-red-900/30 hover:border-red-500/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-red-400 mb-3">{term.title}</h3>
                      <div className="bg-gray-800/50 border-l-4 border-red-500 pl-4 py-2">
                        <p className="text-gray-300 leading-relaxed">{term.content}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Contact Section */}
        <div className="max-w-2xl mx-auto mt-16">
          <Card className="bg-gradient-to-r from-red-900/20 to-red-700/20 border-red-500/30">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-red-400 mb-4">{t("terms.questions")}</h2>
              <p className="text-gray-300 mb-6">{t("terms.questionsDesc")}</p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-8 py-3"
                onClick={() => window.open("https://discord.gg/DztQe9Rv49", "_blank")}
              >
                {t("terms.contactTeam")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
