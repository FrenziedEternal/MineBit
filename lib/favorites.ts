"use client"

// ฟังก์ชันจัดการรายการที่ชอบ
export const getFavorites = (): string[] => {
  if (typeof window === "undefined") return []

  try {
    const favorites = localStorage.getItem("minebit-store-favorites")
    return favorites ? JSON.parse(favorites) : []
  } catch (error) {
    console.error("Error getting favorites:", error)
    return []
  }
}

export const addToFavorites = (productId: string): void => {
  if (typeof window === "undefined") return

  try {
    const favorites = getFavorites()
    if (!favorites.includes(productId)) {
      const newFavorites = [...favorites, productId]
      localStorage.setItem("minebit-store-favorites", JSON.stringify(newFavorites))
    }
  } catch (error) {
    console.error("Error adding to favorites:", error)
  }
}

export const removeFromFavorites = (productId: string): void => {
  if (typeof window === "undefined") return

  try {
    const favorites = getFavorites()
    const newFavorites = favorites.filter((id) => id !== productId)
    localStorage.setItem("minebit-store-favorites", JSON.stringify(newFavorites))
  } catch (error) {
    console.error("Error removing from favorites:", error)
  }
}

export const isFavorite = (productId: string): boolean => {
  const favorites = getFavorites()
  return favorites.includes(productId)
}

export const toggleFavorite = (productId: string): boolean => {
  const isCurrentlyFavorite = isFavorite(productId)

  if (isCurrentlyFavorite) {
    removeFromFavorites(productId)
    return false
  } else {
    addToFavorites(productId)
    return true
  }
}
