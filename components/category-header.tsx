"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, ArrowLeft } from "lucide-react"

interface CategoryHeaderProps {
  navigateBack: () => void
  categoryName: string
}

export function CategoryHeader({ navigateBack, categoryName }: CategoryHeaderProps) {
  return (
    <>
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
            <Link href="/favorites">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Heart className="w-4 h-4 mr-2" />
                รายการที่ชอบ
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 mb-8">
        <button onClick={navigateBack} className="text-red-400 hover:text-red-300 flex items-center cursor-pointer">
          <ArrowLeft className="w-4 h-4 mr-1" />
          ย้อนกลับ
        </button>
        <span className="text-gray-500">/</span>
        <span className="text-white">{categoryName}</span>
      </div>
    </>
  )
}
