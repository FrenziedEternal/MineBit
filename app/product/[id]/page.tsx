"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Heart, Share2, Star, MessageCircle } from "lucide-react"
import { isFavorite, toggleFavorite } from "@/lib/favorites"
import { useScrollRestoration } from "@/hooks/use-scroll-restoration"
import { ImageWithSkeleton } from "@/components/image-with-skeleton"
import { SimpleImage } from "@/components/simple-image"
import { ImageGallery } from "@/components/image-gallery"
import { getProductById, getAllProducts } from "@/lib/products-data"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import Head from "next/head"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [favoriteNotification, setFavoriteNotification] = useState<{
    show: boolean
    message: string
    isVisible: boolean
  }>({
    show: false,
    message: "",
    isVisible: false,
  })
  const shareTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const favoriteTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { t, formatPrice } = useLanguage()

  const product = getProductById(params.id, t)
  const allProducts = getAllProducts(t)

  const { navigateBack } = useScrollRestoration()

  useEffect(() => {
    if (product) {
      setIsFavorited(isFavorite(params.id))
    }
  }, [params.id, product])

  useEffect(() => {
    return () => {
      if (favoriteTimeoutRef.current) {
        clearTimeout(favoriteTimeoutRef.current)
      }
    }
  }, [])

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">{t("product.notFound")}</h1>
          <p className="text-gray-300 mb-8">{t("product.notFoundDesc")}</p>
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("product.backToHome")}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToFavorites = () => {
    if (favoriteTimeoutRef.current) {
      clearTimeout(favoriteTimeoutRef.current)
    }

    const newFavoriteStatus = toggleFavorite(params.id)
    setIsFavorited(newFavoriteStatus)

    const message = newFavoriteStatus ? t("product.addedToFavorites") : t("product.removedFromFavorites")

    setFavoriteNotification({
      show: true,
      message,
      isVisible: false,
    })

    setTimeout(() => {
      setFavoriteNotification((prev) => ({
        ...prev,
        isVisible: true,
      }))
    }, 10)

    favoriteTimeoutRef.current = setTimeout(() => {
      setFavoriteNotification((prev) => ({
        ...prev,
        isVisible: false,
      }))

      setTimeout(() => {
        setFavoriteNotification({
          show: false,
          message: "",
          isVisible: false,
        })
      }, 300)
    }, 2500)
  }

  const handleShareProduct = async () => {
    const currentUrl = window.location.href

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${product.name} - MineBit Store`,
          text: `${t("ui.view")} ${product.name} ${t("nav.home")} MineBit Store - ${product.description}`,
          url: currentUrl,
        })
      } else {
        await navigator.clipboard.writeText(currentUrl)
      }
    } catch (error) {
      try {
        await navigator.clipboard.writeText(currentUrl)
      } catch (clipboardError) {
        console.error(t("meta.cannotCopy"), clipboardError)
        const textArea = document.createElement("textarea")
        textArea.value = currentUrl
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
      }
    }
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>
          {product.name} - MineBit Store | {product.category} Minecraft Bedrock คุณภาพสูง
        </title>
        <meta
          name="description"
          content={`${product.description} ราคา ${formatPrice(product.price)} จาก MineBit Store ร้านขายของ Minecraft Bedrock อันดับ 1 ของไทย`}
        />
        <meta
          name="keywords"
          content={`${product.name}, ${product.category}, ${product.tags.join(", ")}, Minecraft Bedrock, MineBit Store, ${product.author}`}
        />
        <link rel="canonical" href={`https://minebit-store.vercel.app/product/${params.id}`} />

        {/* Open Graph */}
        <meta property="og:title" content={`${product.name} - MineBit Store`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:url" content={`https://minebit-store.vercel.app/product/${params.id}`} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={product.images[0]} />
        <meta property="product:price:amount" content={product.price.toString()} />
        <meta property="product:price:currency" content="THB" />

        {/* Twitter */}
        <meta name="twitter:title" content={`${product.name} - MineBit Store`} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.images[0]} />
      </Head>

      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Favorite Notification */}
        {favoriteNotification.show && (
          <div
            className={`fixed top-28 right-4 z-50 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${
              favoriteNotification.isVisible
                ? "translate-x-0 opacity-100 scale-100"
                : "translate-x-full opacity-0 scale-95"
            }`}
          >
            <div className="flex items-center space-x-2">
              <span>{favoriteNotification.message}</span>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="border-b border-red-900/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <ImageWithSkeleton
                  src="/minebit-store-logo-new.png"
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
              <div className="flex items-center space-x-3">
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
            <span className="text-red-400">{product.category}</span>
            <span className="text-gray-500">/</span>
            <span className="text-white">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <ImageGallery images={product.images} productName={product.name} className="w-full" />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                    {product.name}
                  </span>
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-red-500 text-red-500" />
                    <span className="text-sm text-gray-400 ml-2">
                      {t("product.by")} {product.author}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>
              </div>

              <Separator className="bg-red-900/30" />

              {/* Price and Actions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-red-400">{formatPrice(product.price)}</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-red-900/30 transition-colors ${
                        isFavorited ? "text-red-400 bg-red-500/10" : "text-gray-400"
                      }`}
                      onClick={handleAddToFavorites}
                      title={isFavorited ? t("product.removeFromFavorites") : t("product.addToFavorites")}
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-400" : ""}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-900/30 text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors bg-transparent"
                      onClick={handleShareProduct}
                      title={t("product.shareProduct")}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className={`flex-1 transition-all ${
                      isFavorited
                        ? "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
                        : "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
                    } text-white`}
                    onClick={handleAddToFavorites}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFavorited ? "fill-white" : ""}`} />
                    {isFavorited ? t("product.inFavorites") : t("product.addToFavorites")}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                    onClick={() => window.open("https://discord.gg/DztQe9Rv49", "_blank")}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {t("product.contactToOrder")}
                  </Button>
                </div>
              </div>

              <Separator className="bg-red-900/30" />

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-red-400">{t("product.features")}</h3>
                <ul className="space-y-2">
                  {(product.features || []).map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator className="bg-red-900/30" />

              {/* Compatibility */}
              <div>
                <h3 className="text-xl font-semibold mb-2 text-red-400">{t("product.compatibility")}</h3>
                <p className="text-gray-300">{product.compatibility}</p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <section className="mt-16">
            <h3 className="text-2xl font-bold mb-8">
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                {t("product.recommended")}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts
                .filter((p) => p.id !== Number(params.id))
                .filter((p) => p.name !== "ยังไม่มีสินค้า" && p.name !== "No Products Yet")
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                    <Card className="bg-gray-900/50 border-red-900/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group cursor-pointer overflow-hidden">
                      <div className="relative h-32">
                        <SimpleImage
                          src={relatedProduct.images[0] || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          width={300}
                          height={200}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          sizes="300px"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          {(relatedProduct.tags || []).map((tag) => (
                            <Badge key={tag} className="bg-red-600/80 text-white text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h4 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors line-clamp-1 mb-1">
                          {relatedProduct.name}
                        </h4>
                        <span className="text-red-400 font-bold text-sm">{formatPrice(relatedProduct.price)}</span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
