"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, Grid, List, X, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useScrollRestoration } from "@/hooks/use-scroll-restoration"
import { CategoryHeader } from "@/components/category-header"
import { ProductGrid } from "@/components/product-grid"
import { categoriesData, getProductsByCategory } from "@/lib/products-data"
import { Footer } from "@/components/footer"
import Head from "next/head"

// คำอธิบายแท็ก
const tagDescriptions = {
  BP: "Behavior Pack - แอดออนที่ใช้แค่แพ็คดาต้าหรือ Behavior Pack เท่านั้น",
  "BP & RP": "Behavior Pack & Resource Pack - แอดออนที่ใช้ทั้งแพ็คดาต้าและแพ็คภาพ",
  RP: "Resource Pack - แพ็คที่เปลี่ยนเท็กซ์เจอร์และภาพในเกม",
  Map: "แมพ - โลกและสถานที่ใหม่สำหรับการผจญภัย",
  CMD: "Command - คำสั่งและฟังก์ชันพิเศษ",
  APP: "Application - แอพพลิเคชันเสริมนอกเกม",
  WEB: "Website - เว็บไซต์รูปแบบต่างๆที่สั่งทำ หรือเอกลักษณ์เฉพาะตามที่ลงขาย",
}

// SEO metadata สำหรับแต่ละหมวดหมู่
const getCategoryMetadata = (slug: string) => {
  const category = categoriesData[slug as keyof typeof categoriesData]
  if (!category) return {}

  const metadataMap = {
    addons: {
      title: "แอดออน Minecraft Bedrock - MineBit Store | ร้านขายแอดออนคุณภาพสูง",
      description:
        "ซื้อแอดออน Minecraft Bedrock คุณภาพสูงราคาดี พร้อมฟีเจอร์ใหม่และความสามารถพิเศษ BP, BP & RP จาก MineBit Store ร้านขายแอดออนอันดับ 1 ของไทย",
      keywords: "แอดออน Minecraft, Minecraft Bedrock Addon, BP, Behavior Pack, Resource Pack, แอดออนไทย, ขายแอดออน",
    },
    "resource-packs": {
      title: "รีซอสแพ็ค Minecraft Bedrock - MineBit Store | เปลี่ยนการแสดงผลเกม",
      description:
        "ดาวน์โหลดรีซอสแพ็ค Minecraft Bedrock เปลี่ยนเท็กซ์เจอร์และการแสดงผลเกมให้สวยงาม จาก MineBit Store ราคาย่อมเยา",
      keywords: "รีซอสแพ็ค, Resource Pack, Minecraft Texture, เท็กซ์เจอร์ Minecraft, RP",
    },
    maps: {
      title: "แมพ Minecraft Bedrock - MineBit Store | โลกและสิ่งก่อสร้างใหม่",
      description: "สำรวจแมพ Minecraft Bedrock ใหม่ๆ โลกและสิ่งก่อสร้างสุดเจ๋ง จาก MineBit Store ร้านขายแมพ Minecraft คุณภาพสูง",
      keywords: "แมพ Minecraft, Minecraft Map, โลก Minecraft, สิ่งก่อสร้าง Minecraft, Map Bedrock",
    },
    commands: {
      title: "คอมมานด์ Minecraft Bedrock - MineBit Store | คำสั่งและระบบพิเศษ",
      description:
        "ใช้คอมมานด์ Minecraft Bedrock เพิ่มคำสั่งและระบบพิเศษในเกม จาก MineBit Store ร้านขายคอมมานด์ Minecraft ที่ดีที่สุด",
      keywords: "คอมมานด์ Minecraft, Minecraft Command, CMD, คำสั่ง Minecraft, ระบบ Minecraft",
    },
    apps: {
      title: "แอพเสริม Minecraft - MineBit Store | เครื่องมือช่วยเหลือนอกเกม",
      description: "ดาวน์โหลดแอพเสริม Minecraft เครื่องมือช่วยเหลือการจัดการและพัฒนาเกม จาก MineBit Store ร้านขายแอพ Minecraft",
      keywords: "แอพเสริม Minecraft, Minecraft Tools, เครื่องมือ Minecraft, APP, แอพพลิเคชัน",
    },
    websites: {
      title: "รับทำเว็บไซต์ - MineBit Store | ระบบเว็บไซต์ตามความต้องการ",
      description: "รับทำเว็บไซต์รูปแบบต่างๆ ระบบรีวิว เว็บไซต์ส่วนตัว จาก MineBit Store โดเมนฟรีถาวร ฐานข้อมูลฟรี",
      keywords: "รับทำเว็บไซต์, เว็บไซต์, Website, ระบบรีวิว, โดเมนฟรี, WEB",
    },
  }

  return metadataMap[slug as keyof typeof metadataMap] || {}
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showTagInfo, setShowTagInfo] = useState(false)

  const category = categoriesData[params.slug as keyof typeof categoriesData]
  const products = getProductsByCategory(params.slug)
  const { navigateBack } = useScrollRestoration()

  // SEO metadata
  const categoryMeta = getCategoryMetadata(params.slug)

  // รวบรวมแท็กทั้งหมดในหมวดนี้
  const availableTags = useMemo(() => {
    if (!category) return []
    return category.availableTags || []
  }, [category])

  // กรองและเรียงสินค้า
  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return []

    let filtered = products

    // กรองตามแท็ก
    if (selectedTags.length > 0) {
      filtered = filtered.filter((product) => selectedTags.some((tag) => product.tags.includes(tag)))
    }

    // เรียงลำดับ
    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price)
      case "name":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return filtered
    }
  }, [products, selectedTags, sortBy])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSelectedTags([])
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">ไม่พบหมวดหมู่</h1>
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700">กลับหน้าหลัก</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{categoryMeta.title}</title>
        <meta name="description" content={categoryMeta.description} />
        <meta name="keywords" content={categoryMeta.keywords} />
        <link rel="canonical" href={`https://minebit-store.vercel.app/category/${params.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={categoryMeta.title} />
        <meta property="og:description" content={categoryMeta.description} />
        <meta property="og:url" content={`https://minebit-store.vercel.app/category/${params.slug}`} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:title" content={categoryMeta.title} />
        <meta name="twitter:description" content={categoryMeta.description} />
      </Head>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: category.name,
            description: category.description,
            url: `https://minebit-store.vercel.app/category/${params.slug}`,
            mainEntity: {
              "@type": "ItemList",
              name: `${category.name} - MineBit Store`,
              numberOfItems: products?.length || 0,
              itemListElement:
                products?.slice(0, 10).map((product, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Product",
                    name: product.name,
                    description: product.description,
                    url: `https://minebit-store.vercel.app/product/${product.id}`,
                    offers: {
                      "@type": "Offer",
                      price: product.price,
                      priceCurrency: "THB",
                      availability: "https://schema.org/InStock",
                    },
                  },
                })) || [],
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
                {
                  "@type": "ListItem",
                  position: 2,
                  name: category.name,
                  item: `https://minebit-store.vercel.app/category/${params.slug}`,
                },
              ],
            },
          }),
        }}
      />

      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <CategoryHeader navigateBack={navigateBack} categoryName={category.name} />

        <div className="container mx-auto px-4 pb-8">
          {/* Sort Control */}
          <div className="mb-6">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-gray-900/50 border-red-900/30">
                <SelectValue placeholder="เรียงตาม" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">ใหม่ล่าสุด</SelectItem>
                <SelectItem value="price-low">ราคาต่ำ - สูง</SelectItem>
                <SelectItem value="price-high">ราคาสูง - ต่ำ</SelectItem>
                <SelectItem value="name">ชื่อ A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                {category.name}
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">{category.description}</p>
          </div>

          {/* Tags Filter */}
          {availableTags.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold text-red-400">กรองตามแท็ก:</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTagInfo(!showTagInfo)}
                  className="border-red-900/30 text-gray-400 hover:bg-red-500/10"
                >
                  <Info className="w-4 h-4 mr-1" />
                  เกร็ดความรู้
                </Button>
              </div>

              {/* Tag Info Panel */}
              {showTagInfo && (
                <div className="mb-4 p-4 bg-gray-900/50 border border-red-900/30 rounded-lg">
                  <h4 className="text-red-400 font-semibold mb-3">🎓 เกร็ดความรู้เกี่ยวกับแท็ก:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {availableTags.map((tag) => (
                      <div key={tag} className="flex items-start space-x-2">
                        <Badge className="bg-red-600/80 text-white text-xs flex-shrink-0">{tag}</Badge>
                        <span className="text-gray-300">{tagDescriptions[tag as keyof typeof tagDescriptions]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className={`${
                      selectedTags.includes(tag)
                        ? "bg-red-600 border-red-600 text-white"
                        : "border-red-900/30 text-gray-400 hover:bg-red-500/10"
                    }`}
                  >
                    {tag}
                  </Button>
                ))}
                {selectedTags.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="border-red-900/30 text-gray-400"
                  >
                    <X className="w-4 h-4 mr-1" />
                    ล้างตัวกรอง
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Selected Tags Display */}
          {selectedTags.length > 0 && (
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-2">กรองแล้ว: {filteredAndSortedProducts.length} รายการ</p>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <Badge key={tag} className="bg-red-600/80 text-white">
                    {tag}
                    <button onClick={() => toggleTag(tag)} className="ml-1 hover:text-red-200">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`${
                  viewMode === "grid" ? "bg-red-600 border-red-600 text-white" : "border-red-900/30 text-gray-400"
                }`}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("list")}
                className={`${
                  viewMode === "list" ? "bg-red-600 border-red-600 text-white" : "border-red-900/30 text-gray-400"
                }`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid/List */}
          {filteredAndSortedProducts.length === 0 && selectedTags.length > 0 ? (
            <div className="text-center py-16">
              <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-400 mb-2">ไม่พบสินค้า</h2>
              <p className="text-gray-500 mb-4">ลองเปลี่ยนเงื่อนไขการกรองหรือล้างตัวกรอง</p>
              <Button onClick={clearFilters} className="bg-red-600 hover:bg-red-700">
                ล้างตัวกรอง
              </Button>
            </div>
          ) : (
            <ProductGrid products={filteredAndSortedProducts} viewMode={viewMode} />
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
