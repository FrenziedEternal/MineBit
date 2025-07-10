"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, FileText, Shield, DollarSign, Edit, RefreshCw, Clock, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { useScrollRestoration } from "@/hooks/use-scroll-restoration"
import { Footer } from "@/components/footer"

const terms = [
  {
    icon: Shield,
    title: "1. ห้ามจำหน่ายหรือแจกจ่ายซ้ำ",
    content:
      "ห้ามมิให้มีการจำหน่ายหรือแจกจ่ายต่อผลิตภัณฑ์จากร้าน MineBit Store ไม่ว่ากรณีใดทั้งสิ้น ทางร้านมีใบอนุญาต (License) ที่สามารถดำเนินการทางกฎหมายกับผู้ที่ละเมิดสิทธิ์ได้ทุกเมื่อ",
  },
  {
    icon: DollarSign,
    title: "2. การกำหนดราคา",
    content: "ราคาผลิตภัณฑ์อาจมีการเปลี่ยนแปลง (เพิ่มหรือลด) ตามข้อตกลงระหว่างร้าน MineBit Store และลูกค้าหรือผู้ใช้บริการแต่ละราย",
  },
  {
    icon: Edit,
    title: "3. การแก้ไขงาน",
    content: "ลูกค้าสามารถขอแก้ไขงานได้ฟรีจำนวน 1–5 ครั้ง ขึ้นอยู่กับลักษณะและขนาดของงาน ตามที่ได้ตกลงไว้กับทางร้านในแต่ละกรณี",
  },
  {
    icon: RefreshCw,
    title: "4. การอัปเดตผลิตภัณฑ์",
    content:
      "ลูกค้าที่ซื้อผลิตภัณฑ์เวอร์ชันก่อนหน้า มีสิทธิ์ขอรับการอัปเดตเวอร์ชันใหม่ได้โดยไม่เสียค่าใช้จ่าย ยกเว้นกรณีที่ผลิตภัณฑ์มีการเปลี่ยนแปลงอย่างมีนัยสำคัญ ซึ่งอาจมีค่าใช้จ่ายเพิ่มเติม",
  },
  {
    icon: Clock,
    title: "5. ระยะเวลาในการจัดทำสินค้ากำหนดเอง",
    content:
      "ในกรณีที่ลูกค้าสั่งผลิตภัณฑ์เฉพาะตามความต้องการ โปรดรอรับสินค้าอย่างใจเย็น เพื่อให้ทางร้านสามารถจัดทำผลิตภัณฑ์ที่มีคุณภาพสูงในราคาที่เหมาะสม ซึ่งแตกต่างจากสินค้าที่มีการลดคุณภาพแต่ตั้งราคาสูงเกินจริง",
  },
  {
    icon: AlertTriangle,
    title: "6. เงื่อนไขเพิ่มเติม",
    content:
      "เงื่อนไขอื่นๆ ที่นอกเหนือจากที่ระบุไว้ข้างต้น จะมีการชี้แจงเพิ่มเติมตามความเหมาะสมของแต่ละสถานการณ์ เพื่อให้เกิดความเป็นธรรมกับทั้งผู้ให้บริการและผู้ใช้บริการทุกฝ่าย",
  },
]

export default function TermsOfServicePage() {
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
          <span className="text-white">ข้อกำหนดการใช้บริการ</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              ข้อกำหนดการให้บริการสินค้าต่างๆ
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            เงื่อนไขและข้อกำหนดสำหรับการใช้บริการและการซื้อสินค้าจาก MineBit Store
          </p>
        </div>

        {/* Terms */}
        <div className="max-w-4xl mx-auto space-y-8">
          {terms.map((term, index) => {
            const IconComponent = term.icon
            return (
              <Card
                key={index}
                className="bg-gray-900/50 border-red-900/30 hover:border-red-500/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-red-400 mb-3">{term.title}</h3>
                      <div className="bg-gray-800/50 border-l-4 border-red-500 pl-4 py-2">
                        <p className="text-gray-300 leading-relaxed">{term.content}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Contact Section */}
        <div className="max-w-2xl mx-auto mt-16">
          <Card className="bg-gradient-to-r from-red-900/20 to-red-700/20 border-red-500/30">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-red-400 mb-4">มีคำถามเพิ่มเติม?</h2>
              <p className="text-gray-300 mb-6">หากคุณมีข้อสงสัยเกี่ยวกับข้อกำหนดการให้บริการ สามารถติดต่อทีมงานได้ทาง Discord</p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-8 py-3"
                onClick={() => window.open("https://discord.gg/DztQe9Rv49", "_blank")}
              >
                ติดต่อทีมงาน
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
