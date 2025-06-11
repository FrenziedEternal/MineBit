"use client"

import { useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"

export function useScrollRestoration() {
  const router = useRouter()
  const pathname = usePathname()
  const scrollPosition = useRef<number>(0)

  useEffect(() => {
    // เฉพาะหน้าหลักเท่านั้นที่จะเซฟและกู้คืนตำแหน่ง
    if (pathname === "/") {
      // กู้คืนตำแหน่งการเลื่อนเมื่อเข้าหน้าหลัก
      const restoreScrollPosition = () => {
        const savedPosition = sessionStorage.getItem("homepage-scroll-position")
        if (savedPosition) {
          const position = Number.parseInt(savedPosition, 10)
          // ใช้ setTimeout เพื่อให้หน้าโหลดเสร็จก่อน
          setTimeout(() => {
            window.scrollTo(0, position)
          }, 100)
        }
      }

      // กู้คืนตำแหน่งเมื่อโหลดหน้า
      restoreScrollPosition()

      // บันทึกตำแหน่งเมื่อเลื่อนหน้า
      const handleScroll = () => {
        scrollPosition.current = window.scrollY
      }

      // บันทึกตำแหน่งก่อนออกจากหน้า
      const saveScrollPosition = () => {
        sessionStorage.setItem("homepage-scroll-position", scrollPosition.current.toString())
      }

      // บันทึกตำแหน่งเมื่อมีการเปลี่ยนหน้า
      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          saveScrollPosition()
        }
      }

      // บันทึกตำแหน่งก่อนปิดหน้า
      const handleBeforeUnload = () => {
        saveScrollPosition()
      }

      window.addEventListener("scroll", handleScroll, { passive: true })
      window.addEventListener("beforeunload", handleBeforeUnload)
      document.addEventListener("visibilitychange", handleVisibilityChange)

      return () => {
        saveScrollPosition()
        window.removeEventListener("scroll", handleScroll)
        window.removeEventListener("beforeunload", handleBeforeUnload)
        document.removeEventListener("visibilitychange", handleVisibilityChange)
      }
    } else {
      // หน้าอื่นๆ ให้เริ่มต้นจากด้านบนเสมอ
      window.scrollTo(0, 0)
    }
  }, [pathname])

  const navigateBack = () => {
    // ถ้าอยู่หน้าหลัก ให้บันทึกตำแหน่งปัจจุบันก่อนย้อนกลับ
    if (pathname === "/") {
      sessionStorage.setItem("homepage-scroll-position", scrollPosition.current.toString())
    }
    router.back()
  }

  return { navigateBack }
}
