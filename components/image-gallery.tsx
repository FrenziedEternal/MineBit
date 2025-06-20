"use client"

import type React from "react"

import { useState } from "react"
import { SimpleImage } from "@/components/simple-image"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  images: string[]
  productName: string
  className?: string
}

export function ImageGallery({ images, productName, className }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState(0)

  const openModal = (index: number) => {
    setModalImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const nextImage = () => {
    setModalImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setModalImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeModal()
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
  }

  // เพิ่มฟังก์ชันตรวจสอบว่าเป็นวิดีโอหรือไม่
  const isVideo = (src: string) => {
    return src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg")
  }

  return (
    <>
      <div className={cn("space-y-4", className)}>
        {/* Main Image */}
        <div className="relative group">
          <div
            className="relative h-96 cursor-pointer overflow-hidden rounded-lg border border-red-900/30 hover:border-red-500/50 transition-colors"
            onClick={() => openModal(selectedImageIndex)}
          >
            {isVideo(images[selectedImageIndex]) ? (
              <video
                src={images[selectedImageIndex]}
                className="w-full h-full object-cover"
                controls
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <SimpleImage
                src={images[selectedImageIndex] || "/placeholder.svg"}
                alt={`${productName} - รูปที่ ${selectedImageIndex + 1}`}
                width={600}
                height={400}
                className="w-full h-full object-cover"
                priority
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}

            {/* Zoom Overlay - แสดงเฉพาะรูปภาพ */}
            {!isVideo(images[selectedImageIndex]) && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full p-3">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "relative h-20 cursor-pointer rounded border-2 transition-all overflow-hidden",
                  selectedImageIndex === index
                    ? "border-red-500 ring-2 ring-red-500/50"
                    : "border-red-900/30 hover:border-red-500/50",
                )}
                onClick={() => setSelectedImageIndex(index)}
              >
                {isVideo(image) ? (
                  <video src={image} className="w-full h-full object-cover" muted preload="metadata" />
                ) : (
                  <SimpleImage
                    src={image || "/placeholder.svg"}
                    alt={`${productName} - รูปย่อที่ ${index + 1}`}
                    width={150}
                    height={100}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    sizes="150px"
                  />
                )}

                {/* Selected Overlay */}
                {selectedImageIndex === index && (
                  <div className="absolute inset-0 bg-red-500/20 border-2 border-red-500 rounded" />
                )}

                {/* Video Icon Overlay */}
                {isVideo(image) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Modal Image */}
          <div
            className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 z-20 bg-black/70 border-white/30 text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
              onClick={closeModal}
            >
              <X className="w-4 h-4" />
            </Button>
            {isVideo(images[modalImageIndex]) ? (
              <video
                src={images[modalImageIndex]}
                className="max-w-full max-h-full object-contain rounded-lg"
                controls
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <SimpleImage
                src={images[modalImageIndex] || "/placeholder.svg"}
                alt={`${productName} - รูปที่ ${modalImageIndex + 1}`}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain rounded-lg"
                priority
                loading="eager"
                sizes="80vw"
              />
            )}

            {/* Modal Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
              {modalImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 border-white/20 text-white hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 border-white/20 text-white hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Thumbnail Strip in Modal */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/50 p-2 rounded-lg max-w-md overflow-x-auto">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative w-12 h-8 cursor-pointer rounded border flex-shrink-0 overflow-hidden",
                    modalImageIndex === index ? "border-red-500" : "border-white/30",
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    setModalImageIndex(index)
                  }}
                >
                  {isVideo(image) ? (
                    <>
                      <video src={image} className="w-full h-full object-cover" muted preload="metadata" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <SimpleImage
                      src={image || "/placeholder.svg"}
                      alt={`${productName} - รูปย่อที่ ${index + 1}`}
                      width={48}
                      height={32}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      sizes="48px"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
