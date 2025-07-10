"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageWithSkeletonProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  loading?: "lazy" | "eager"
  sizes?: string
}

export function ImageWithSkeleton({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  loading = "lazy",
  sizes,
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Skeleton Loading */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800/50 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-gray-800/30 via-gray-700/50 to-gray-800/30 animate-shimmer">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-800/80 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="w-8 h-8 mx-auto mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-xs">ไม่สามารถโหลดรูปได้</p>
          </div>
        </div>
      )}

      {/* Actual Image */}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt || "MineBit Store - ร้านขายของ Minecraft Bedrock คุณภาพสูง"}
        width={width}
        height={height}
        className={cn(
          "transition-all duration-500 ease-in-out optimized-image",
          isLoading ? "opacity-0 scale-110" : "opacity-100",
          className,
        )}
        priority={priority}
        loading={loading}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
      />
    </div>
  )
}
