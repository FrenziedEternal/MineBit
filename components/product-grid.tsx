import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SimpleImage } from "@/components/simple-image"

interface Product {
  id: number
  name: string
  price: number
  tags: string[]
  images: string[] // Changed from image to images
  description: string
  category: string
}

interface ProductGridProps {
  products: Product[]
  viewMode: "grid" | "list"
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-400 mb-2">ไม่พบสินค้า</h2>
        <p className="text-gray-500 mb-4">ลองเปลี่ยนเงื่อนไขการกรองหรือล้างตัวกรอง</p>
      </div>
    )
  }

  return (
    <div
      className={
        viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-8"
      }
    >
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          {viewMode === "grid" ? (
            <Card className="bg-gray-900/50 border-red-900/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group cursor-pointer overflow-hidden">
              <div className="relative h-48">
                <SimpleImage
                  src={product.images?.[0] || "/placeholder.svg?height=200&width=300"}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-full"
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
                  <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <span className="text-red-400 font-bold text-lg">฿{product.price}</span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-900/50 border-red-900/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group cursor-pointer overflow-hidden">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="relative flex-shrink-0 w-full sm:w-32 md:w-40 lg:w-48 h-32 sm:h-24 md:h-28 lg:h-32">
                    <SimpleImage
                      src={product.images?.[0] || "/placeholder.svg?height=200&width=300"}
                      alt={product.name}
                      width={192}
                      height={128}
                      className="w-full h-full rounded object-cover"
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {product.tags.map((tag) => (
                        <Badge key={tag} className="bg-red-600/80 text-white text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-2 sm:space-y-0">
                      <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-red-400 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <span className="text-red-400 font-bold text-lg md:text-xl flex-shrink-0 sm:ml-4">
                        ฿{product.price}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm md:text-base line-clamp-2 md:line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </Link>
      ))}
    </div>
  )
}
