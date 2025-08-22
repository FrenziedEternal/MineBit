"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Trash2 } from "lucide-react"
import { getFavorites, removeFromFavorites } from "@/lib/favorites"
import { useScrollRestoration } from "@/hooks/use-scroll-restoration"
import { ImageWithSkeleton } from "@/components/image-with-skeleton"
import { getProductsForFavorites } from "@/lib/products-data"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { LanguageToggle } from "@/components/language-toggle"

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { navigateBack } = useScrollRestoration()
  const { t, formatPrice } = useLanguage()

  const allProducts = getProductsForFavorites(t)

  useEffect(() => {
    // โหลดรายการที่ชอบจาก localStorage
    const favorites = getFavorites()
    setFavoriteIds(favorites)
    setIsLoading(false)
  }, [])

  const handleRemoveFromFavorites = (productId: string) => {
    removeFromFavorites(productId)
    setFavoriteIds((prev) => prev.filter((id) => id !== productId))
  }

  const favoriteProducts = favoriteIds.map((id) => ({ id, ...allProducts[id] })).filter((product) => product.name) // กรองเฉพาะสินค้าที่มีข้อมูล

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-300">{t("ui.loading")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-red-900/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ImageWithSkeleton
                src="https://xv1t4wfzjkn6kzdb.public.blob.vercel-storage.com/logo/IMG_0699-RRFqZDmOBPBuboVbW5g0rj0XhGf0KN.png"
                alt="MineBit Store Logo"
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
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Heart className="w-4 h-4 mr-2 fill-white" />
                {t("favorites")} ({favoriteIds.length})
              </Button>
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
          <span className="text-white">{t("favorites")}</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              {t("favorites.title")}
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            {t("favorites.count")} ({favoriteProducts.length} {t("favorites.items")})
          </p>
        </div>

        {/* Favorites Content */}
        {favoriteProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-400 mb-2">{t("favorites.empty")}</h2>
            <p className="text-gray-500 mb-8">{t("favorites.emptyDesc")}</p>
            <Link href="/">
              <Button className="bg-red-600 hover:bg-red-700 text-white">{t("favorites.startShopping")}</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-gray-900/50 border-red-900/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group overflow-hidden"
              >
                <div className="relative h-48">
                  <Link href={`/product/${product.id}`}>
                    <ImageWithSkeleton
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </Link>
                  <div className="absolute top-2 left-2 flex gap-1">
                    {product.tags.map((tag) => (
                      <Badge key={tag} className="bg-red-600/80 text-white text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-black/50 border-red-500/50 text-red-400 hover:bg-red-500/20"
                    onClick={() => handleRemoveFromFavorites(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <div className="cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <span className="text-red-400 font-bold text-lg">{formatPrice(product.price)}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{product.category}</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
