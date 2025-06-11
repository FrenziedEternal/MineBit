"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MessageCircle, CreditCard, Download, CheckCircle, Heart } from "lucide-react"
import Image from "next/image"
import { useScrollRestoration } from "@/hooks/use-scroll-restoration"
import { Footer } from "@/components/footer"

const steps = [
  {
    icon: MessageCircle,
    title: "1. ติดต่อทาง Discord",
    description: "คลิกปุ่มด้านล่างเพื่อเข้าสู่เซิร์ฟเวอร์ Discord ของเรา",
    detail: "พูดคุยกับทีมงานและแจ้งสินค้าที่ต้องการ",
  },
  {
    icon: CreditCard,
    title: "2. ชำระเงิน",
    description: "โอนเงินตามราคาที่แจ้งไว้ในแต่ละสินค้า",
    detail: "รองรับการชำระผ่าน ธนาคาร, TrueMoney, PromptPay",
  },
  {
    icon: CheckCircle,
    title: "3. ยืนยันการสั่งซื้อ",
    description: "ส่งหลักฐานการโอนเงินให้ทีมงาน",
    detail: "ทีมงานจะตรวจสอบและยืนยันคำสั่งซื้อ",
  },
  {
    icon: Download,
    title: "4. รับสินค้า",
    description: "ดาวน์โหลดไฟล์หรือรับลิงค์สินค้า",
    detail: "พร้อมคู่มือการติดตั้งและการใช้งาน",
  },
]

export default function HowToOrderPage() {
  const { navigateBack } = useScrollRestoration()
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
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

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <button onClick={navigateBack} className="text-red-400 hover:text-red-300 flex items-center cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-1" />
            ย้อนกลับ
          </button>
          <span className="text-gray-500">/</span>
          <span className="text-white">วิธีสั่งซื้อ</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">วิธีสั่งซื้อ</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">ขั้นตอนง่าย ๆ เพียง 4 ขั้นตอนเพื่อสั่งซื้อสินค้าจากเรา</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <Card
                key={index}
                className="bg-gray-900/50 border-red-900/30 hover:border-red-500/50 transition-all duration-300"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-red-400">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 mb-2">{step.description}</p>
                  <p className="text-gray-400 text-sm">{step.detail}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Discord Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-r from-red-900/20 to-red-700/20 border-red-500/30">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-red-400 mb-4">พร้อมสั่งซื้อแล้ว?</h2>
              <p className="text-gray-300 mb-6">
                คลิกปุ่มด้านล่างเพื่อเข้าสู่เซิร์ฟเวอร์ Discord ของเรา และเริ่มต้นการสั่งซื้อสินค้าที่คุณต้องการ
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-8 py-3"
                onClick={() => window.open("https://discord.gg/DztQe9Rv49", "_blank")}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                เข้าสู่ Discord Server
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-900/30 border-red-900/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-red-400 mb-2">🔒 ปลอดภัย</h3>
              <p className="text-gray-300 text-sm">การชำระเงินผ่านช่องทางที่ปลอดภัย พร้อมการยืนยันตัวตนจากทีมงาน</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/30 border-red-900/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-red-400 mb-2">⚡ รวดเร็ว</h3>
              <p className="text-gray-300 text-sm">ประมวลผลคำสั่งซื้อและส่งมอบสินค้าภายใน 24 ชั่วโมง</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/30 border-red-900/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-red-400 mb-2">🎮 คุณภาพ</h3>
              <p className="text-gray-300 text-sm">สินค้าทุกชิ้นผ่านการทดสอบและรับประกันคุณภาพ</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
