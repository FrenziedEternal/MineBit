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

  const product = getProductById(params.id)
  const allProducts = getAllProducts()

  const { navigateBack } = useScrollRestoration()

  useEffect(() => {
    // ตรวจสอบสถานะรายการที่ชอบเมื่อโหลดหน้า
    if (product) {
      setIsFavorited(isFavorite(params.id))
    }
  }, [params.id, product])

  // ล้าง timeout เมื่อ component unmount
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
          <h1 className="text-4xl font-bold text-red-400 mb-4">ไม่พบสินค้า</h1>
          <p className="text-gray-300 mb-8">ขออภัย ไม่พบสินค้าที่คุณต้องการ</p>
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับหน้าหลัก
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToFavorites = () => {
    // ล้าง timeout เก่าถ้ามี
    if (favoriteTimeoutRef.current) {
      clearTimeout(favoriteTimeoutRef.current)
    }

    const newFavoriteStatus = toggleFavorite(params.id)
    setIsFavorited(newFavoriteStatus)

    const message = newFavoriteStatus ? "✅ เพิ่มลงรายการที่ชอบแล้ว!" : "❌ ลบออกจากรายการที่ชอบแล้ว!"

    // แสดงการแจ้งเตือน
    setFavoriteNotification({
      show: true,
      message,
      isVisible: false,
    })

    // เริ่มแอนิเมชัน slide-in
    setTimeout(() => {
      setFavoriteNotification((prev) => ({
        ...prev,
        isVisible: true,
      }))
    }, 10)

    // เริ่มแอนิเมชัน slide-out หลังจาก 2.5 วินาที
    favoriteTimeoutRef.current = setTimeout(() => {
      setFavoriteNotification((prev) => ({
        ...prev,
        isVisible: false,
      }))

      // ซ่อนการแจ้งเตือนหลังจากแอนิเมชันเสร็จ
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
      // ลองใช้ Web Share API ก่อน (สำหรับมือถือ)
      if (navigator.share) {
        await navigator.share({
          title: `${product.name} - MineBit Store`,
          text: `ดู ${product.name} ใน MineBit Store - ${product.description}`,
          url: currentUrl,
        })
      } else {
        // ถ้าไม่รองรับ Web Share API ให้คัดลอกลิงค์
        await navigator.clipboard.writeText(currentUrl)
      }
    } catch (error) {
      // ถ้าเกิดข้อผิดพลาด ให้ลองคัดลอกลิงค์อีกครั้ง
      try {
        await navigator.clipboard.writeText(currentUrl)
      } catch (clipboardError) {
        // ถ้าคัดลอกไม่ได้ ให้แสดงข้อความแจ้งเตือน
        console.error("ไม่สามารถคัดลอกลิงค์ได้:", clipboardError)
        // สร้าง text area ชั่วคราวเพื่อคัดลอก (fallback method)
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
            <Link href="/favorites">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Heart className="w-4 h-4 mr-2" />
                รายการที่ชอบ
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <button onClick={navigateBack} className="text-red-400 hover:text-red-300 flex items-center cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-1" />
            ย้อนกลับ
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
                  <span className="text-sm text-gray-400 ml-2">โดย {product.author}</span>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>
            </div>

            <Separator className="bg-red-900/30" />

            {/* Price and Actions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-red-400">฿{product.price}</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-red-900/30 transition-colors ${
                      isFavorited ? "text-red-400 bg-red-500/10" : "text-gray-400"
                    }`}
                    onClick={handleAddToFavorites}
                    title={isFavorited ? "ลบออกจากรายการที่ชอบ" : "เพิ่มลงรายการที่ชอบ"}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-400" : ""}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-900/30 text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                    onClick={handleShareProduct}
                    title="แชร์สินค้า"
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
                  {isFavorited ? "อยู่ในรายการที่ชอบ" : "เพิ่มลงรายการที่ชอบ"}
                </Button>
                <Button
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500/10"
                  onClick={() => window.open("https://discord.gg/DztQe9Rv49", "_blank")}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  ติดต่อสั่งซื้อ
                </Button>
              </div>
            </div>

            <Separator className="bg-red-900/30" />

            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-red-400">คุณสมบัติเด่น</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
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
              <h3 className="text-xl font-semibold mb-2 text-red-400">ความเข้ากันได้</h3>
              <p className="text-gray-300">{product.compatibility}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold mb-8">
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">สินค้าอื่นๆแนะนำ</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts
              .filter((p) => p.id !== Number(params.id))
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
                        {relatedProduct.tags.map((tag) => (
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
                      <span className="text-red-400 font-bold text-sm">฿{relatedProduct.price}</span>
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
  )
}
