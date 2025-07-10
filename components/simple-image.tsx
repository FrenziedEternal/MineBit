"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface SimpleImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  loading?: "lazy" | "eager"
  sizes?: string
}

export function SimpleImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  loading = "lazy",
  sizes,
}: SimpleImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Skeleton Loading */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse">
          <div className="h-full w-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Actual Image - แสดงเต็มขนาดปกติ */}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-opacity duration-300 w-full h-full object-cover",
          isLoading ? "opacity-0" : "opacity-100",
        )}
        priority={priority}
        loading={loading}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
