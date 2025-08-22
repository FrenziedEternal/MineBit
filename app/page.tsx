"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Zap, Map, Code, Puzzle, Smartphone, FileText, Globe } from "lucide-react"
import { useScrollRestoration } from "@/hooks/use-scroll-restoration"
import { ImageWithSkeleton } from "@/components/image-with-skeleton"
import { getFeaturedProducts } from "@/lib/products-data"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { LanguageToggle } from "@/components/language-toggle"

export default function HomePage() {
  useScrollRestoration()
  const { t, formatPrice } = useLanguage()

  // ใช้ข้อมูลจาก products-data.ts
  const featuredProducts = getFeaturedProducts(t)

  const categories = [
    {
      id: "addons",
      name: t("categories.addons"),
      description: t("categories.addons.desc"),
      icon: Puzzle,
      count: 10,
      gradient: "from-red-500 to-pink-600",
    },
    {
      id: "resource-packs",
      name: t("categories.resource-packs"),
      description: t("categories.resource-packs.desc"),
      icon: Zap,
      count: 1,
      gradient: "from-red-600 to-orange-500",
    },
    {
      id: "maps",
      name: t("categories.maps"),
      description: t("categories.maps.desc"),
      icon: Map,
      count: 2,
      gradient: "from-red-500 to-red-700",
    },
    {
      id: "commands",
      name: t("categories.commands"),
      description: t("categories.commands.desc"),
      icon: Code,
      count: 3,
      gradient: "from-pink-500 to-red-600",
    },
    {
      id: "apps",
      name: t("categories.apps"),
      description: t("categories.apps.desc"),
      icon: Smartphone,
      count: 3,
      gradient: "from-red-700 to-red-900",
    },
    {
      id: "websites",
      name: t("categories.websites"),
      description: t("categories.websites.desc"),
      icon: Globe,
      count: 2,
      gradient: "from-red-500 to-red-800",
    },
  ]

  const randomizeCategory = () => {
    const categoryIds = ["addons", "resource-packs", "maps", "commands", "apps", "websites"]
    const randomIndex = Math.floor(Math.random() * categoryIds.length)
    const randomCategory = categoryIds[randomIndex]

    // บันทึกตำแหน่งัจจุบันก่อนไปหน้าอื่น
    const currentPosition = window.scrollY
    sessionStorage.setItem("homepage-scroll-position", currentPosition.toString())

    // นำทางไปยังหมวดหมู่ที่สุ่มได้
    window.location.href = `/category/${randomCategory}`
  }

  const handleLinkClick = () => {
    // บันทึกตำแหน่งปัจจุบันก่อนไปหน้าอื่น
    const currentPosition = window.scrollY
    sessionStorage.setItem("homepage-scroll-position", currentPosition.toString())
  }

  return (
    <>
      {/* Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "MineBit Store - หน้าหลัก",
            description: "ร้านขายแอดออน แมพ รีซอสแพ็ค คอมมานด์ และแอพเสริม Minecraft Bedrock คุณภาพสูง",
            url: "https://minebit-store.vercel.app",
            mainEntity: {
              "@type": "ItemList",
              name: "หมวดหมู่สินค้า MineBit Store",
              itemListElement: categories.map((category, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: category.name,
                description: category.description,
                url: `https://minebit-store.vercel.app/category/${category.id}`,
              })),
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "หน้าหลัก",
                  item: "https://minebit-store.vercel.app",
                },
              ],
            },
          }),
        }}
      />

      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <header className="border-b border-red-900/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <ImageWithSkeleton
                  src="https://xv1t4wfzjkn6kzdb.public.blob.vercel-storage.com/logo/IMG_0699-RRFqZDmOBPBuboVbW5g0rj0XhGf0KN.png"
                  alt="MineBit Store - ร้านขายของ Minecraft Bedrock ของไทย"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                  priority
                  loading="eager"
                  sizes="32px"
                />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  MineBit Store
                </h1>
              </Link>
              <div className="flex items-center gap-3">
                <LanguageToggle />
                <Link href="/favorites" onClick={handleLinkClick}>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    {t("favorites")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-black/50"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523dc2626%22%20fillOpacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  MineBit
                </span>
                <br />
                <span className="text-white">Store</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{t("hero.description")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/terms-of-service" onClick={handleLinkClick}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-8 py-3"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    {t("hero.terms")}
                  </Button>
                </Link>
                <Link href="/how-to-order" onClick={handleLinkClick}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-red-500 text-red-400 hover:bg-red-500/10 px-8 py-3 bg-transparent"
                  >
                    {t("hero.howto")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-gray-900/30">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                {t("categories.title")}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Link key={category.id} href={`/category/${category.id}`} onClick={handleLinkClick}>
                    <Card className="bg-gray-900/50 border-red-900/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div
                            className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors">
                              {category.name}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              {category.count} {t("categories.items")}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">{category.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                {t("featured.title")}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} onClick={handleLinkClick}>
                  <Card className="bg-gray-900/50 border-red-900/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group cursor-pointer overflow-hidden">
                    <div className="relative h-48">
                      <ImageWithSkeleton
                        src={product.images[0] || "/placeholder.svg"}
                        alt={`${product.name} - ${product.category} สำหรับ Minecraft Bedrock`}
                        width={300}
                        height={200}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        {product.tags.map((tag) => (
                          <Badge key={tag} className="bg-red-600/80 text-white text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
                          {product.name}
                        </h4>
                        <span className="text-red-400 font-bold text-lg">{formatPrice(product.price)}</span>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-2">{product.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 bg-gray-900/30">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                {t("reviews.title")}
              </span>
            </h3>

            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-900/50 border border-red-900/30 rounded-lg overflow-hidden">
                <iframe
                  src="https://minebit-reviews.vercel.app/reviews"
                  className="w-full h-96 md:h-[500px] lg:h-[600px]"
                  title="MineBit Store Reviews"
                  loading="lazy"
                  style={{
                    border: "none",
                    background: "transparent",
                  }}
                  onError={(e) => {
                    console.log("iframe failed to load:", e)
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
