"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "th" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  formatPrice: (price: number) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation mappings
const translations = {
  th: {
    // Header & Navigation
    favorites: "รายการที่ชอบ",
    language: "ภาษา",
    "nav.back": "ย้อนกลับ",
    "nav.home": "หน้าหลัก",
    "nav.goBack": "Go Back",

    // Hero Section
    "hero.description": "ร้านจำหน่ายสินค้าในเกม Minecraft Bedrock ในไทยที่คัดสรรสินค้าคุณภาพสูง พร้อมราคาย่อมเยาเป็นมิตรกับลูกค้า",
    "hero.terms": "ข้อกำหนดการใช้บริการ",
    "hero.howto": "วิธีสั่งซื้อ",
    "banner.message": "📌 เว็บไซต์นี้เพื่อแสดงสินค้าตัวอย่างเท่านั้น เข้าร่วมกลุ่ม Discord ของเราเพื่อติดต่อสั่งซื้อสินค้าต่างๆ",

    // Categories
    "categories.title": "หมวดหมู่สินค้า",
    "categories.addons": "แอดออน",
    "categories.addons.desc": "เพิ่มฟีเจอร์ใหม่ให้กับเกม",
    "categories.resource-packs": "รีซอสแพ็ค",
    "categories.resource-packs.desc": "เปลี่ยนการแสดงผลภาพ",
    "categories.maps": "แมพ",
    "categories.maps.desc": "โลกและสิ่งก่อสร้าง",
    "categories.commands": "คอมมานด์",
    "categories.commands.desc": "คำสั่งและระบบพื้นฐานทั่วไป",
    "categories.apps": "แอพเสริม",
    "categories.apps.desc": "เครื่องมือช่วยเหลือนอกเกม",
    "categories.websites": "เว็บไซต์",
    "categories.websites.desc": "ระบบเว็บไซต์ต่างๆตามความชอบ",
    "categories.items": "รายการ",
    "categories.locked": "ล็อคอยู่",
    "categories.lockedDesc": "หมวดหมู่นี้ยังไม่เปิดให้บริการ",

    "category.addons.name": "แอดออน",
    "category.addons.description": "เพิ่มฟีเจอร์ใหม่และความสามารถพิเศษให้กับเกม Minecraft ของคุณ",
    "category.resource-packs.name": "รีซอสแพ็ค",
    "category.resource-packs.description": "เปลี่ยนเท็กซ์เจอร์และการแสดงผลภาพในเกมให้สวยงาม",
    "category.maps.name": "แมพ",
    "category.maps.description": "โลกและสิ่งก่อสร้างใหม่สำหรับการผจญภัย",
    "category.commands.name": "คอมมานด์",
    "category.commands.description": "คำสั่งและระบบพิเศษสำหรับเซิร์ฟเวอร์",
    "category.apps.name": "แอพเสริม",
    "category.apps.description": "เครื่องมือช่วยเหลือและแอพพลิเคชันนอกเกม",
    "category.websites.name": "เว็บไซต์",
    "category.websites.description": "ระบบเว็บไซต์ต่างๆ ตามความต้องการ",

    // Featured Products
    "featured.title": "สินค้าแนะนำ",

    // Reviews
    "reviews.title": "รีวิวจากลูกค้า",

    // Product Pages
    "product.notFound": "ไม่พบสินค้า",
    "product.notFoundDesc": "ขออภัย ไม่พบสินค้าที่คุณต้องการ",
    "product.backToHome": "กลับหน้าหลัก",
    "product.features": "คุณสมบัติเด่น",
    "product.compatibility": "ความเข้ากันได้",
    "product.recommended": "สินค้าอื่นๆแนะนำ",
    "product.addToFavorites": "เพิ่มลงรายการที่ชอบ",
    "product.removeFromFavorites": "ลบออกจากรายการที่ชอบ",
    "product.contactToOrder": "ติดต่อสั่งซื้อ",
    "product.loading": "กำลังโหลด...",
    "product.by": "โดย",
    "product.shareProduct": "แชร์สินค้า",
    "product.inFavorites": "อยู่ในรายการที่ชอบ",
    "product.addedToFavorites": "✅ เพิ่มลงรายการที่ชอบแล้ว!",
    "product.removedFromFavorites": "❌ ลบออกจากรายการที่ชอบแล้ว!",

    // Category Pages
    "category.notFound": "ไม่พบหมวดหมู่",
    "category.sortBy": "เรียงตาม",
    "category.filterByTags": "กรองตามแท็ก",
    "category.tagKnowledge": "เกร็ดความรู้",
    "category.tagKnowledgeAbout": "🎓 เกร็ดความรู้เกี่ยวกับแท็ก:",
    "category.noProducts": "ไม่พบสินค้า",
    "category.changeFilter": "ลองเปลี่ยนเงื่อนไขการกรองหรือล้างตัวกรอง",
    "category.allTags": "แท็กทั้งหมด",
    "category.clearFilters": "ล้างตัวกรอง",
    "category.sortPrice": "ราคา",
    "category.sortName": "ชื่อ",
    "category.sortNewest": "ใหม่ล่าสุด",
    "category.sortPriceLow": "ราคาต่ำ - สูง",
    "category.sortPriceHigh": "ราคาสูง - ต่ำ",
    "category.sortNameAZ": "ชื่อ A-Z",
    "category.filtered": "กรองแล้ว:",
    "category.items": "รายการ",

    // Tag Descriptions
    "tag.BP": "Behavior Pack - แอดออนที่ใช้แค่แพ็คดาต้าหรือ Behavior Pack เท่านั้น",
    "tag.BP_RP": "Behavior Pack & Resource Pack - แอดออนที่ใช้ทั้งแพ็คดาต้าและแพ็คภาพ",
    "tag.RP": "Resource Pack - แพ็คที่เปลี่ยนเท็กซ์เจอร์และภาพในเกม",
    "tag.Map": "แมพ - โลกและสถานที่ใหม่สำหรับการผจญภัย",
    "tag.CMD": "Command - คำสั่งและฟังก์ชันพิเศษ",
    "tag.APP": "Application - แอพพลิเคชันเสริมนอกเกม",
    "tag.WEB": "Website - เว็บไซต์รูปแบบต่างๆที่สั่งทำ หรือเอกลักษณ์เฉพาะตามที่ลงขาย",
    "tag.Beta-API": "Beta-API - ต้องเปิดใช้งาน Experimental ที่ชื่อว่า Beta-API",
    "tag.No_Beta-API": "No Beta-API - ไม่ต้องเปิดใช้งาน Experimental ใดๆ",

    // Favorites Page
    "favorites.title": "รายการที่ชอบ",
    "favorites.count": "สินค้าที่คุณชื่นชอบทั้งหมด",
    "favorites.items": "รายการ",
    "favorites.empty": "ยังไม่มีสินค้าที่ชอบ",
    "favorites.emptyDesc": "เริ่มเลือกสินค้าที่คุณชื่นชอบกันเถอะ!",
    "favorites.startShopping": "เริ่มช้อปปิ้ง",

    // Terms of Service
    "terms.title": "ข้อกำหนดการให้บริการสินค้าต่างๆ",
    "terms.subtitle": "เงื่อนไขและข้อกำหนดสำหรับการใช้บริการและการซื้อสินค้าจาก MineBit Store",
    "terms.breadcrumb": "ข้อกำหนดการใช้บริการ",
    "terms.term1.title": "1. ห้ามจำหน่ายหรือแจกจ่ายซ้ำ",
    "terms.term1.content":
      "ห้ามมิให้มีการจำหน่ายหรือแจกจ่ายต่อผลิตภัณฑ์จากร้าน MineBit Store ไม่ว่ากรณีใดทั้งสิ้น ทางร้านมีใบอนุญาต (License) ที่สามารถดำเนินการทางกฎหมายกับผู้ที่ละเมิดสิทธิ์ได้ทุกเมื่อ",
    "terms.term2.title": "2. การกำหนดราคา",
    "terms.term2.content":
      "ราคาผลิตภัณฑ์อาจมีการเปลี่ยนแปลง (เพิ่มหรือลด) ตามข้อตกลงระหว่างร้าน MineBit Store และลูกค้าหรือผู้ใช้บริการแต่ละราย",
    "terms.term3.title": "3. การแก้ไขงาน",
    "terms.term3.content":
      "ลูกค้าสามารถขอแก้ไขงานได้ฟรีจำนวน 1–5 ครั้ง ขึ้นอยู่กับลักษณะและขนาดของงาน ตามที่ได้ตกลงไว้กับทางร้านในแต่ละกรณี",
    "terms.term4.title": "4. การอัปเดตผลิตภัณฑ์",
    "terms.term4.content":
      "ลูกค้าที่ซื้อผลิตภัณฑ์เวอร์ชันก่อนหน้า มีสิทธิ์ขอรับการอัปเดตเวอร์ชันใหม่ได้โดยไม่เสียค่าใช้จ่าย ยกเว้นกรณีที่ผลิตภัณฑ์มีการเปลี่ยนแปลงอย่างมีนัยสำคัญ ซึ่งอาจมีค่าใช้จ่ายเพิ่มเติม",
    "terms.term5.title": "5. การกำหนดระยะเวลาในการจัดทำสินค้า",
    "terms.term5.content":
      "ในกรณีที่ลูกค้าสั่งผลิตภัณฑ์เฉพาะตามความต้องการ โปรดรอรับสินค้าอย่างใจเย็น เพื่อให้ทางร้านสามารถจัดทำผลิตภัณฑ์ที่มีคุณภาพสูงในราคาที่เหมาะสม ซึ่งแตกต่างจากสินค้าที่มีการลดคุณภาพแต่ตั้งราคาสูงเกินจริง",
    "terms.term6.title": "6. เงื่อนไขเพิ่มเติม",
    "terms.term6.content":
      "เงื่อนไขอื่นๆ ที่นอกเหนือจากที่ระบุไว้ข้างต้น จะมีการชี้แจงเพิ่มเติมตามความเหมาะสมของแต่ละสถานการณ์ เพื่อให้เกิดความเป็นธรรมกับทั้งผู้ให้บริการและผู้ใช้บริการทุกฝ่าย",
    "terms.questions": "มีคำถามเพิ่มเติม?",
    "terms.questionsDesc": "หากคุณมีข้อสงสัยเกี่ยวกับข้อกำหนดการให้บริการ สามารถติดต่อทีมงานได้ทาง Discord",
    "terms.contactTeam": "ติดต่อทีมงาน",

    // How to Order
    "howto.title": "วิธีสั่งซื้อ",
    "howto.subtitle": "สั่งซื้อง่ายๆเพียง 4 ขั้นตอนเพื่อรับสินค้าจากเรา",
    "howto.breadcrumb": "สั่งซื้อ",
    "howto.step1.title": "1. ติดต่อทาง Discord",
    "howto.step1.desc": "คลิกปุ่มด้านล่างเพื่อเข้าสู่เซิร์ฟเวอร์ Discord ของเรา",
    "howto.step1.detail": "พูดคุยกับทีมงานและแจ้งสินค้าที่ต้องการ",
    "howto.step2.title": "2. ชำระเงิน",
    "howto.step2.desc": "โอนเงินตามราคาที่แจ้งไว้ในแต่ละสินค้า",
    "howto.step2.detail": "รองรับการชำระผ่าน ธนาคาร, TrueMoney, PromptPay",
    "howto.step3.title": "3. ยืนยันการสั่งซื้อ",
    "howto.step3.desc": "ส่งหลักฐานการโอนเงินให้ทีมงาน",
    "howto.step3.detail": "ทีมงานจะตรวจสอบและยืนยันคำสั่งซื้อ",
    "howto.step4.title": "4. รับสินค้า",
    "howto.step4.desc": "ดาวน์โหลดไฟล์หรือรับลิงค์สินค้า",
    "howto.step4.detail": "พร้อมคู่มือการติดตั้งและการใช้งาน",
    "howto.ready": "พร้อมสั่งซื้อแล้ว?",
    "howto.readyDesc": "คลิกปุ่มด้านล่างเพื่อเข้าสู่เซิร์ฟเวอร์ Discord ของเรา และเริ่มต้นการสั่งซื้อสินค้าที่คุณต้องการ",
    "howto.joinDiscord": "เข้าสู่ Discord Server",
    "howto.secure": "🔒 ปลอดภัย",
    "howto.secureDesc": "การชำระเงินผ่านช่องทางที่ปลอดภัย พร้อมการยืนยันตัวตนจากทีมงาน",
    "howto.fast": "⚡ รวดเร็ว",
    "howto.fastDesc": "ประมวลผลคำสั่งซื้อและส่งมอบสินค้าภายใน 24 ชั่วโมง",
    "howto.quality": "🎮 คุณภาพ",
    "howto.qualityDesc": "สินค้าทุกชิ้นผ่านการทดสอบและรับประกันคุณภาพ",

    // Footer
    "footer.about": "เกี่ยวกับเรา",
    "footer.about.desc": "MineBit Store เป็นร้านขายสินค้าดิจิทัลสำหรับ Minecraft Bedrock ที่มุ่งเน้นคุณภาพและบริการที่ดีเยี่ยม",
    "footer.links": "ลิงก์ที่เป็นประโยชน์",
    "footer.contact": "ติดต่อเรา",
    "footer.support": "สนับสนุน",
    "footer.copyright": "© 2025 MineBit Store. สงวนลิขสิทธิ์ทั้งหมด",
    "footer.tagline": "ร้านขายของ Minecraft Bedrock ของไทย | แอดออน แมพ รีซอสแพ็ค คอมมานด์ แอพเสริม",

    // Common UI Elements
    "ui.loading": "กำลังโหลด...",
    "ui.error": "เกิดข้อผิดพลาด",
    "ui.retry": "ลองใหม่",
    "ui.close": "ปิด",
    "ui.save": "บันทึก",
    "ui.cancel": "ยกเลิก",
    "ui.confirm": "ยืนยัน",
    "ui.delete": "ลบ",
    "ui.edit": "แก้ไข",
    "ui.view": "ดู",
    "ui.more": "เพิ่มเติม",

    // SEO and Meta
    "meta.home": "หน้าหลัก",
    "meta.checkStatus": "ตรวจสอบสถานะรายการที่ชอบเมื่อโหลดหน้า",
    "meta.clearTimeout": "ล้าง timeout เมื่อ component unmount",
    "meta.clearOldTimeout": "ล้าง timeout เก่าถ้ามี",
    "meta.showNotification": "แสดงการแจ้งเตือน",
    "meta.startSlideIn": "เริ่มแอนิเมชัน slide-in",
    "meta.startSlideOut": "เริ่มแอนิเมชัน slide-out หลังจาก 2.5 วินาที",
    "meta.hideAfterAnimation": "ซ่อนการแจ้งเตือนหลังจากแอนิเมชันเสร็จ",
    "meta.tryWebShare": "ลองใช้ Web Share API ก่อน (สำหรับมือถือ)",
    "meta.fallbackCopy": "ถ้าไม่รองรับ Web Share API ให้คัดลอกลิงค์",
    "meta.errorFallback": "ถ้าเกิดข้อผิดพลาด ให้ลองคัดลอกลิงค์อีกครั้ง",
    "meta.cannotCopy": "ไม่สามารถคัดลอกลิงค์ได้:",
    "meta.createTempTextArea": "สร้าง text area ชั่วคราวเพื่อคัดลอก (fallback method)",

    // Product Names
    "product.1.name": "Luxury Leaderboard",
    "product.2.name": "ยังไม่มีสินค้า",
    "product.3.name": "Savage Impaler",
    "product.4.name": "Player Honor",
    "product.5.name": "Frenzied Crafting",
    "product.6.name": "ยังไม่มีสินค้า",
    "product.7.name": "ยังไม่มีสินค้า",
    "product.8.name": "ยังไม่มีสินค้า",
    "product.9.name": "ยังไม่มีสินค้า",
    "product.10.name": "ยังไม่มีสินค้า",
    "product.11.name": "ยังไม่มีสินค้า",
    "product.12.name": "ยังไม่มีสินค้า",
    "product.13.name": "ยังไม่มีสินค้า",
    "product.14.name": "Gacha Plus V.1",
    "product.15.name": "รับทำเว็บไซต์ตามสั่ง",
    "product.16.name": "ระบบรีวิวแบบให้คะแนนดาว",
    "product.17.name": "Bed Fella | ร่างกาย",
    "product.18.name": "ThaiTech Ring",
    "product.19.name": "BitCommands",
    "product.20.name": "MineBit Display",
    "product.21.name": "Bed Fella | ผมปลิว",
    "product.22.name": "Great Amulets",

    // Product Descriptions
    "product.1.description":
      "ระบบลีดเดอร์บอร์ดและข้อความลอยที่ไม่เหมือนใครที่ไหน ระบบที่จะทำให้เซิร์ฟเวอร์ของคุณดูมืออาชีพและน่าประทับใจมากขึ้น",
    "product.2.description": "...",
    "product.3.description":
      "รีซอสแพ็คอัปเกรดทะลุใจที่มาพร้อมกับความสามารถในการเบี่ยงเบนข้อจำกัดรีซอสแพ็คภายนอกในกรณีที่แมพหรือเซิร์ฟเวอร์บางแห่งห้ามใช้รีซอสแพ็คภายนอก",
    "product.4.description": "แก้ไขชื่อผู้เล่นและยศได้อย่างอิสระ และมาพร้อมกับระบบแบนคำหยาบในแชท",
    "product.5.description":
      "กำหนดเปอร์เซ็นต์ความสำเร็จในการคราฟไอเทม และกำหนดจำนวนไอเทมที่ใช้ในการคราฟ แม้กระทั่งหลายร้อยไอเทมในครั้งเดียว",
    "product.6.description": "...",
    "product.7.description": "...",
    "product.8.description": "...",
    "product.9.description": "...",
    "product.10.description": "...",
    "product.11.description": "...",
    "product.12.description": "...",
    "product.13.description": "...",
    "product.14.description": "ระบบสุ่มแบบกาชาขั้นสูงที่มาพร้อมกับอัตราการสุ่มขั้นสูงและระบบไอเทมรับประกัน",
    "product.15.description": "รับทำเว็บไซต์ตามสั่งในรูปแบบต่างๆ ตามโครงการที่กำหนดและข้อตกลงที่ตกลงกัน",
    "product.16.description": "รับทำเว็บไซต์ตามสั่งในรูปแบบต่างๆ ตามโครงการที่กำหนดและข้อตกลงที่ตกลงกัน",
    "product.17.description": "ศัลยกรรม บรรดาลร่างกายดั่งใจหวัง🔥",
    "product.18.description": "แหวนลายไทยเรืองแสงที่ส่องแสงสีแดงสว่าง ตำนานเล่าว่าแหวนวงนี้ไม่ชอบให้คนใส่นอน",
    "product.19.description": "เพิ่มคำสั่งใหม่ๆ ได้อย่างอิสระในโลกของคุณ เพื่อความสะดวกในการดำเนินการต่างๆ",
    "product.20.description": "แสดงตัวเลขความเสียหายและอีกมากมายโดยไม่ต้องใช้รีซอสแพ็คใดๆ",
    "product.21.description": "ผมที่พลิ้วไหวอย่างสง่างามให้รัศมีดุจราชินีแห่งดวงจันทร์",
    "product.22.description": "สวมใส่ไอเทมในช่องเครื่องรางได้ โดยช่องเครื่องรางแยกจากช่องไอเทมปกติ",

    // Product Features
    "product.1.features.0": "ป้องกันคำสั่ง kill @e",
    "product.1.features.1": "ไม่ต้องใช้ Resource Pack",
    "product.1.features.2": "ป้องกัน Player Offline ในลีดเดอร์บอร์ด",
    "product.1.features.3": "ข้อความลอยที่สวยงามและปรับแต่งได้",
    "product.1.features.4": "ระบบลีดเดอร์บอร์ดแบบเรียลไทม์",

    "product.2.features.0": "xxx",

    "product.3.features.0": "เบี่ยงเบนการป้องกันรีซอสแพ็คภายนอกในแมพ",
    "product.3.features.1": "มองเห็นเอนทิตี้ผ่านกำแพงในทุกรูปแบบ",

    "product.4.features.0": "แก้ไขชื่อผู้เล่นได้อย่างอิสระ",
    "product.4.features.1": "แก้ไขยศผู้เล่นได้อย่างอิสระ",
    "product.4.features.2": "แบนคำหยาบในการพิมพ์แชท",
    "product.4.features.3": "ปรับปรุงการแสดงผลแชทเพื่อการส่งข้อความที่ดีขึ้น",

    "product.5.features.0": "กำหนดบล็อกโต๊ะคราฟติ้ง",
    "product.5.features.1": "กำหนดเปอร์เซ็นต์โอกาสสำเร็จในการคราฟไอเทม",
    "product.5.features.2": "กำหนดจำนวนไอเทมที่จะคราฟ",
    "product.5.features.3": "ทำให้ชีวิตยากขึ้นสำหรับเกษตรกรในโลกของคุณ",

    "product.6.features.0": "xxx",
    "product.7.features.0": "xxx",
    "product.8.features.0": "xxx",
    "product.9.features.0": "xxx",
    "product.10.features.0": "xxx",
    "product.11.features.0": "xxx",
    "product.12.features.0": "xxx",
    "product.13.features.0": "xxx",

    "product.14.features.0": "กำหนดอัตราการสุ่มขั้นสูง",
    "product.14.features.1": "ดูอัตราการสุ่มสำหรับแต่ละหมวดหมู่ไอเทม",
    "product.14.features.2": "สุ่มกาชาตามอัตราโดยไม่มีบั๊กเปอร์เซ็นต์",

    "product.15.features.0": "โดเมนฟรีถาวร",
    "product.15.features.1": "สามารถเชื่อมต่อกับหน้าเว็บอื่นได้",
    "product.15.features.2": "ฐานข้อมูลฟรีถาวรรวมอยู่ด้วย",
    "product.15.features.3": "กำหนดหลายสิ่งได้อย่างอิสระ",
    "product.15.features.4": "ออกแบบตอบสนองสำหรับทุกแพลตฟอร์ม",
    "product.15.features.5": "กำหนดชื่อโดเมนที่กำหนดเองได้สูงสุด 50 ชื่อ",
    "product.15.features.6": "ใช้งานง่ายและรวดเร็ว ออกแบบได้ดี",
    "product.15.features.7": "สามารถติดตั้งเป็นแอพในหลายแพลตฟอร์มได้",
    "product.15.features.8": "สามารถสร้างหน้าที่เฉพาะแอดมินเข้าถึงได้",

    "product.16.features.0": "ฐานข้อมูลสำหรับการจัดการและบำรุงรักษา",
    "product.16.features.1": "ป้องกันคอมเมนต์สแปมจากภายนอก",
    "product.16.features.2": "แผงแอดมินสำหรับจัดการด้านต่างๆ",
    "product.16.features.3": "สามารถรวมหรือแสดงในเว็บไซต์อื่นได้",
    "product.16.features.4": "แสดงจำนวนผู้รีวิวทั้งหมดพร้อมสรุปรายละเอียด",
    "product.16.features.5": "ดึงข้อมูลผู้คอมเมนต์จาก Discord user ID อย่างปลอดภัย",

    "product.17.features.0": "ชุดเกราะที่สวมใส่ได้สำหรับส่วนร่างกายใดก็ได้ เช่น หัว ตัว ขา เท้า",
    "product.17.features.1": "ไม่ใช้ player.json ในรีซอสแพ็ค",
    "product.17.features.2": "รองรับแอนิเมชันอื่นๆ เช่น Actions & Stuff",
    "product.17.features.3": "หน้าอกไม่เป็นบล็อก",
    "product.17.features.4": "แอนิเมชันหน้าอกเด้งเพื่อสร้างความน่าเกรงขาม",
    "product.17.features.5": "สามารถทำเป็นสกินเกราะในเกมได้",
    "product.17.features.6": "กรอกตาซ้ายขวา",
    "product.17.features.7": "เอียงหัวตามที่หัน",
    "product.17.features.8": "พาร์ติเคิลตามคน smooth แบบไม่ใช้ player json",
    "product.17.features.9": "อื่นๆเพิ่มเติมสอบถาม",
    

    "product.18.features.0": "ชุดเกราะที่สวมใส่ได้สำหรับส่วนร่างกายใดก็ได้ เช่น หัว ตัว ขา เท้า",
    "product.18.features.1": "ไม่ใช้ player.json ในรีซอสแพ็ค",
    "product.18.features.2": "รองรับแอนิเมชันอื่นๆ เช่น Actions & Stuff",
    "product.18.features.3": "เรืองแสงในที่มืด",
    "product.18.features.4": "สามารถเปลี่ยนดีไซน์แหวนได้หากลูกค้าให้มา",
    "product.18.features.5": "สามารถทำเป็นสกินเกราะในเกมได้",

    "product.19.features.0": "กำหนดคำสั่งหลายคำสั่ง",
    "product.19.features.1": "กำหนดว่าใครสามารถใช้คำสั่งแต่ละคำสั่งได้",
    "product.19.features.2": "ข้อความที่กำหนดเองแสดงเมื่อเข้า/ออกจากโลก",
    "product.19.features.3": "ใช้งานง่าย เช่น /hub หรือ /mb:hub",

    "product.20.features.0": "ไม่ต้องใช้รีซอสแพ็ค",
    "product.20.features.1": "แสดงความเสียหายที่สร้าง (สูงสุดตามขีดจำกัดเกม 2.1 พันล้าน)",
    "product.20.features.2": "แสดงพลังชีวิตที่ฟื้นฟู (สูงสุดตามขีดจำกัดเกม 2.1 พันล้าน)",
    "product.20.features.3": "แสดงพลังชีวิตและชื่อเหนือหัว",
    "product.20.features.4": "แบนคำหยาบในแชทเกม",
    "product.20.features.5": "ยศเหนือหัวและในแชทเกม",

    "product.21.features.0": "ออร่าเหมือนราชินี",
    "product.21.features.1": "แอนิเมชันเมื่อตัวละครเคลื่อนไหว",
    "product.21.features.2": "กำหนดตำแหน่งผมได้",
    "product.21.features.3": "กำหนดแอนิเมชันได้",
    "product.21.features.4": "ผมไม่กลิทช์เข้าไปในตัวเมื่อมองขึ้นหรือลง",

    "product.22.features.0": "สวมใส่ไอเทมในช่องเครื่องราง",
    "product.22.features.1": "รับความสามารถต่างๆ จากไอเทมที่สวมใส่",
    "product.22.features.2": "ช่องเครื่องรางแยกจากช่องไอเทมปกติ",
  },
  en: {
    // Header & Navigation
    favorites: "Favorites",
    language: "Language",
    "nav.back": "Go Back",
    "nav.home": "Home",
    "nav.goBack": "Go Back",

    // Hero Section
    "hero.description":
      "Thailand's premier Minecraft Bedrock digital store offering high-quality products with affordable prices and excellent customer service",
    "hero.terms": "Terms of Service",
    "hero.howto": "How to Order",
    "banner.message": "📌 This website is for product showcase only. Join our Discord group to contact us for purchasing various products",

    // Categories
    "categories.title": "Product Categories",
    "categories.addons": "Add-ons",
    "categories.addons.desc": "Add new features to your game",
    "categories.resource-packs": "Resource Packs",
    "categories.resource-packs.desc": "Change visual appearance",
    "categories.maps": "Maps",
    "categories.maps.desc": "Worlds and constructions",
    "categories.commands": "Commands",
    "categories.commands.desc": "Commands and basic systems",
    "categories.apps": "Apps",
    "categories.apps.desc": "External helper tools",
    "categories.websites": "Websites",
    "categories.websites.desc": "Various website systems as preferred",
    "categories.items": "items",
    "categories.locked": "Locked",
    "categories.lockedDesc": "This category is not yet available",

    "category.addons.name": "Add-ons",
    "category.addons.description": "Add new features and special abilities to your Minecraft game",
    "category.resource-packs.name": "Resource Packs",
    "category.resource-packs.description": "Change textures and visual appearance in your game",
    "category.maps.name": "Maps",
    "category.maps.description": "New worlds and constructions for adventure",
    "category.commands.name": "Commands",
    "category.commands.description": "Commands and special systems for servers",
    "category.apps.name": "Apps",
    "category.apps.description": "Helper tools and external applications",
    "category.websites.name": "Websites",
    "category.websites.description": "Various website systems according to needs",

    // Featured Products
    "featured.title": "Featured Products",

    // Reviews
    "reviews.title": "Customer Reviews",

    // Product Pages
    "product.notFound": "Product Not Found",
    "product.notFoundDesc": "Sorry, the product you're looking for was not found",
    "product.backToHome": "Back to Home",
    "product.features": "Key Features",
    "product.compatibility": "Compatibility",
    "product.recommended": "Other Recommended Products",
    "product.addToFavorites": "Add to Favorites",
    "product.removeFromFavorites": "Remove from Favorites",
    "product.contactToOrder": "Contact to Order",
    "product.loading": "Loading...",
    "product.by": "by",
    "product.shareProduct": "Share Product",
    "product.inFavorites": "In Favorites",
    "product.addedToFavorites": "✅ Added to Favorites!",
    "product.removedFromFavorites": "❌ Removed from Favorites!",

    // Category Pages
    "category.notFound": "Category Not Found",
    "category.sortBy": "Sort By",
    "category.filterByTags": "Filter by Tags",
    "category.tagKnowledge": "Tag Knowledge",
    "category.tagKnowledgeAbout": "🎓 Tag Knowledge Tips:",
    "category.noProducts": "No Products Found",
    "category.changeFilter": "Try changing filter conditions or clear filters",
    "category.allTags": "All Tags",
    "category.clearFilters": "Clear Filters",
    "category.sortPrice": "Price",
    "category.sortName": "Name",
    "category.sortNewest": "Newest",
    "category.sortPriceLow": "Price Low - High",
    "category.sortPriceHigh": "Price High - Low",
    "category.sortNameAZ": "Name A-Z",
    "category.filtered": "Filtered:",
    "category.items": "items",

    // Tag Descriptions
    "tag.BP": "Behavior Pack - Add-on that uses only data pack or Behavior Pack",
    "tag.BP_RP": "Behavior Pack & Resource Pack - Add-on that uses both data pack and resource pack",
    "tag.RP": "Resource Pack - Pack that changes textures and visuals in the game",
    "tag.Map": "Map - New worlds and locations for adventure",
    "tag.CMD": "Command - Commands and special functions",
    "tag.APP": "Application - External supplementary applications",
    "tag.WEB": "Website - Various website formats made to order or unique characteristics as sold",
    "tag.Beta-API": "Beta-API - Requires enabling Experimental feature called Beta-API",
    "tag.No_Beta-API": "No Beta-API - Does not require enabling any Experimental features",

    // Favorites Page
    "favorites.title": "Favorites",
    "favorites.count": "All your favorite products",
    "favorites.items": "items",
    "favorites.empty": "No Favorite Products Yet",
    "favorites.emptyDesc": "Start choosing your favorite products!",
    "favorites.startShopping": "Start Shopping",

    // Terms of Service
    "terms.title": "Terms of Service for Various Products",
    "terms.subtitle": "Terms and conditions for using services and purchasing products from MineBit Store",
    "terms.breadcrumb": "Terms of Service",
    "terms.term1.title": "1. Prohibition of Resale or Redistribution",
    "terms.term1.content":
      "It is strictly prohibited to resell or redistribute products from MineBit Store under any circumstances. The store has licenses that allow legal action against copyright infringers at any time.",
    "terms.term2.title": "2. Pricing Policy",
    "terms.term2.content":
      "Product prices may change (increase or decrease) according to agreements between MineBit Store and individual customers or service users.",
    "terms.term3.title": "3. Work Revisions",
    "terms.term3.content":
      "Customers can request free revisions 1-5 times, depending on the nature and size of the work, as agreed with the store in each case.",
    "terms.term4.title": "4. Product Updates",
    "terms.term4.content":
      "Customers who purchase previous versions of products are entitled to receive new version updates at no additional cost, except in cases where products have significant changes, which may incur additional costs.",
    "terms.term5.title": "5. Custom Product Development Time",
    "terms.term5.content":
      "In cases where customers order custom products according to their needs, please wait patiently for the products so that the store can create high-quality products at reasonable prices, which differs from products with reduced quality but overpriced.",
    "terms.term6.title": "6. Additional Terms",
    "terms.term6.content":
      "Other conditions beyond those specified above will be clarified additionally as appropriate for each situation to ensure fairness for both service providers and all service users.",
    "terms.questions": "Have More Questions?",
    "terms.questionsDesc": "If you have any questions about the terms of service, you can contact the team via Discord",
    "terms.contactTeam": "Contact Team",

    // How to Order
    "howto.title": "How to Order",
    "howto.subtitle": "Easy ordering in just 4 steps to receive products from us",
    "howto.breadcrumb": "Order",
    "howto.step1.title": "1. Contact via Discord",
    "howto.step1.desc": "Click the button below to enter our Discord server",
    "howto.step1.detail": "Talk to the team and specify the products you want",
    "howto.step2.title": "2. Payment",
    "howto.step2.desc": "Transfer money according to the price specified for each product",
    "howto.step2.detail": "Supports payment via Bank, TrueMoney, PromptPay",
    "howto.step3.title": "3. Order Confirmation",
    "howto.step3.desc": "Send payment proof to the team",
    "howto.step3.detail": "The team will verify and confirm the order",
    "howto.step4.title": "4. Receive Products",
    "howto.step4.desc": "Download files or receive product links",
    "howto.step4.detail": "Complete with installation and usage manuals",
    "howto.ready": "Ready to Order?",
    "howto.readyDesc": "Click the button below to enter our Discord server and start ordering the products you want",
    "howto.joinDiscord": "Join Discord Server",
    "howto.secure": "🔒 Secure",
    "howto.secureDesc": "Payment through secure channels with identity verification from the team",
    "howto.fast": "⚡ Fast",
    "howto.fastDesc": "Process orders and deliver products within 24 hours",
    "howto.quality": "🎮 Quality",
    "howto.qualityDesc": "All products are tested and quality guaranteed",

    // Footer
    "footer.about": "About Us",
    "footer.about.desc":
      "MineBit Store is a digital store for Minecraft Bedrock focused on quality and excellent service",
    "footer.links": "Useful Links",
    "footer.contact": "Contact Us",
    "footer.support": "Support",
    "footer.copyright": "© 2025 MineBit Store. All rights reserved",
    "footer.tagline": "Thailand's Minecraft Bedrock Store | Add-ons Maps Resource Packs Commands Apps",

    // Common UI Elements
    "ui.loading": "Loading...",
    "ui.error": "An Error Occurred",
    "ui.retry": "Try Again",
    "ui.close": "Close",
    "ui.save": "Save",
    "ui.cancel": "Cancel",
    "ui.confirm": "Confirm",
    "ui.delete": "Delete",
    "ui.edit": "Edit",
    "ui.view": "View",
    "ui.more": "More",

    // SEO and Meta
    "meta.home": "Home",
    "meta.checkStatus": "Check favorite status when page loads",
    "meta.clearTimeout": "Clear timeout when component unmounts",
    "meta.clearOldTimeout": "Clear old timeout if exists",
    "meta.showNotification": "Show notification",
    "meta.startSlideIn": "Start slide-in animation",
    "meta.startSlideOut": "Start slide-out animation after 2.5 seconds",
    "meta.hideAfterAnimation": "Hide notification after animation completes",
    "meta.tryWebShare": "Try Web Share API first (for mobile)",
    "meta.fallbackCopy": "If Web Share API not supported, copy link",
    "meta.errorFallback": "If error occurs, try copying link again",
    "meta.cannotCopy": "Cannot copy link:",
    "meta.createTempTextArea": "Create temporary text area for copying (fallback method)",

    // Product Names
    "product.1.name": "Luxury Leaderboard",
    "product.2.name": "No Products Yet",
    "product.3.name": "Savage Impaler",
    "product.4.name": "Player Honor",
    "product.5.name": "Frenzied Crafting",
    "product.6.name": "No Products Yet",
    "product.7.name": "No Products Yet",
    "product.8.name": "No Products Yet",
    "product.9.name": "No Products Yet",
    "product.10.name": "No Products Yet",
    "product.11.name": "No Products Yet",
    "product.12.name": "No Products Yet",
    "product.13.name": "No Products Yet",
    "product.14.name": "Gacha Plus V.1",
    "product.15.name": "Custom Website Development",
    "product.16.name": "Star Rating Review System",
    "product.17.name": "Bed Fella | Body",
    "product.18.name": "ThaiTech Ring",
    "product.19.name": "BitCommands",
    "product.20.name": "MineBit Display",
    "product.21.name": "Bed Fella | Smooth Hair Movement",
    "product.22.name": "Great Amulets",

    // Product Descriptions
    "product.1.description":
      "Floating text and ultimate leaderboard system unlike anywhere else. A system that will make your server look more professional and impressive.",
    "product.2.description": "...",
    "product.3.description":
      "Mind-piercing resource pack upgrade that comes with the ability to bypass external resource pack restrictions in cases where certain maps or servers prohibit external resource packs.",
    "product.4.description": "Freely edit player names and ranks, and includes a system to ban profanity in chat.",
    "product.5.description":
      "Set success percentage for item crafting and configure the number of items used in crafting - even hundreds of items at once.",
    "product.6.description": "...",
    "product.7.description": "...",
    "product.8.description": "...",
    "product.9.description": "...",
    "product.10.description": "...",
    "product.11.description": "...",
    "product.12.description": "...",
    "product.13.description": "...",
    "product.14.description": "Ultimate gacha random system with advanced rates and guaranteed item mechanics.",
    "product.15.description":
      "Custom website development in various formats according to project brief and agreed specifications.",
    "product.16.description":
      "Custom website development in various formats according to project brief and agreed specifications.",
    "product.17.description": "Body Modification – Reshape your form just the way you desire🔥",
    "product.18.description":
      "Thai-patterned glowing ring that shines bright red light. Legend says this ring doesn't like its wearer to lie down.",
    "product.19.description": "Add new commands freely to your world for convenience in various operations.",
    "product.20.description": "Display damage numbers and much more without needing any resource packs.",
    "product.21.description": "Hair that sways gracefully, giving an aura like a moon queen.",
    "product.22.description": "Wear items in amulet slots, with amulet slots separate from regular inventory slots.",

    // Product Features
    "product.1.features.0": "Protection against kill @e commands",
    "product.1.features.1": "No Resource Pack required",
    "product.1.features.2": "Protection against Player Offline in leaderboard",
    "product.1.features.3": "Beautiful and customizable floating text",
    "product.1.features.4": "Real-time leaderboard system",

    "product.2.features.0": "xxx",

    "product.3.features.0": "Bypass protection against external resource packs on maps",
    "product.3.features.1": "See entities through walls in all forms",

    "product.4.features.0": "Freely edit player names",
    "product.4.features.1": "Freely edit player ranks",
    "product.4.features.2": "Ban profanity in chat typing",
    "product.4.features.3": "Improved chat display for better messaging",

    "product.5.features.0": "Configure crafting table blocks",
    "product.5.features.1": "Set percentage chance for successful item crafting",
    "product.5.features.2": "Configure number of items to craft",
    "product.5.features.3": "Make life harder for farmers in your world",

    "product.6.features.0": "xxx",
    "product.7.features.0": "xxx",
    "product.8.features.0": "xxx",
    "product.9.features.0": "xxx",
    "product.10.features.0": "xxx",
    "product.11.features.0": "xxx",
    "product.12.features.0": "xxx",
    "product.13.features.0": "xxx",
    
    "product.14.features.0": "Configure advanced random rates",
    "product.14.features.1": "View random rates for each item category",
    "product.14.features.2": "Random gacha based on rates without percentage bugs",

    "product.15.features.0": "Free permanent domain",
    "product.15.features.1": "Can connect to other web pages",
    "product.15.features.2": "Free permanent database included",
    "product.15.features.3": "Configure many things freely",
    "product.15.features.4": "Responsive design for all platforms",
    "product.15.features.5": "Configure up to 50 custom domain names",
    "product.15.features.6": "Easy to use and fast, well-designed",
    "product.15.features.7": "Can be installed as an app on multiple platforms",
    "product.15.features.8": "Can create admin-only accessible pages",

    "product.16.features.0": "Database for management and maintenance",
    "product.16.features.1": "Protection against external spam comments",
    "product.16.features.2": "Admin panel for managing various aspects",
    "product.16.features.3": "Can be integrated or displayed on other websites",
    "product.16.features.4": "Shows total number of reviewers with detailed summary",
    "product.16.features.5": "Securely pulls commenter data from Discord user ID",

    "product.17.features.0": "Wearable armor set for any body part like head, body, legs, feet",
    "product.17.features.1": "Does not use player.json in resource pack",
    "product.17.features.2": "Supports other animations like Actions & Stuff",
    "product.17.features.3": "Non-blocky chest appearance",
    "product.17.features.4": "Bouncy chest animation for intimidation effect",
    "product.17.features.5": "Can be made into in-game armor skin",
    "product.17.features.6": "Left and right eye tracking",
    "product.17.features.7": "Head tilting based on direction",
    "product.17.features.8": "Smooth particle following without player json",
    "product.17.features.9": "Additional features available upon inquiry",

    "product.18.features.0": "Wearable armor set for any body part like head, body, legs, feet",
    "product.18.features.1": "Does not use player.json in resource pack",
    "product.18.features.2": "Supports other animations like Actions & Stuff",
    "product.18.features.3": "Glows in the dark",
    "product.18.features.4": "Can change ring design if customer provides one",
    "product.18.features.5": "Can be made into in-game armor skin",

    "product.19.features.0": "Configure multiple commands",
    "product.19.features.1": "Set who can use each command",
    "product.19.features.2": "Custom messages displayed when entering/leaving the world",
    "product.19.features.3": "Easy to use like /hub or /mb:hub",

    "product.20.features.0": "No resource pack required",
    "product.20.features.1": "Display damage dealt (up to game limit of 2.1 billion)",
    "product.20.features.2": "Display health recovered (up to game limit of 2.1 billion)",
    "product.20.features.3": "Display health and names above heads",
    "product.20.features.4": "Ban profanity in game chat",
    "product.20.features.5": "Ranks above heads and in game chat",

    "product.21.features.0": "Aura like a queen",
    "product.21.features.1": "Animation when character moves",
    "product.21.features.2": "Configurable hair position",
    "product.21.features.3": "Configurable animations",
    "product.21.features.4": "Hair doesn't glitch into body when looking up or down",

    "product.22.features.0": "Wear items in amulet slots",
    "product.22.features.1": "Receive various abilities from worn items",
    "product.22.features.2": "Amulet slots separate from regular inventory slots",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("th")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "th" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when changed
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  // Price formatting function
  const formatPrice = (price: number): string => {
    if (language === "en") {
      // Convert THB to USD (1 USD = 35 THB)
      const usdPrice = (price / 35).toFixed(2)
      return `$${usdPrice}`
    }
    return `฿${price}`
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
