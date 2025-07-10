import { ImageWithSkeleton } from "@/components/image-with-skeleton"

export function Footer() {
  return (
    <footer className="bg-gray-900/50 border-t border-red-900/30 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ImageWithSkeleton
              src="https://xv1t4wfzjkn6kzdb.public.blob.vercel-storage.com/logo/IMG_0699-RRFqZDmOBPBuboVbW5g0rj0XhGf0KN.png"
              alt="MineBit Store Logo"
              width={24}
              height={24}
              className="w-6 h-6"
              loading="lazy"
              sizes="24px"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              MineBit Store
            </span>
          </div>
          <p className="text-gray-400 text-sm">© 2025 MineBit Store. All rights reserved.</p>
          <p className="text-gray-500 text-xs mt-2">
            ร้านขายของ Minecraft Bedrock ของไทย | แอดออน แมพ รีซอสแพ็ค คอมมานด์ แอพเสริม
          </p>
        </div>
      </div>
    </footer>
  )
}
