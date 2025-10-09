"use client"

import { useState, useEffect } from "react"
import { DiscountModal } from "./discount-modal"

const MAX_VIEWS = 5        // Максимално пати што ќе се покаже
const HIDE_FOR_MS = 1000 * 60 * 60  // 1 час

export function DiscountModalWrapper() {
  const [showDiscountModal, setShowDiscountModal] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const lastTimestamp = parseInt(localStorage.getItem("discountModalTimestamp") || "0")
    const views = parseInt(localStorage.getItem("discountModalViews") || "0")
    const now = Date.now()

    // Проверка дали е дозволено да се покаже
    if (views < MAX_VIEWS && now - lastTimestamp > HIDE_FOR_MS) {
      setShowDiscountModal(true)
    }
  }, [])

  const handleClose = () => {
    setShowDiscountModal(false)

    const now = Date.now()
    const views = parseInt(localStorage.getItem("discountModalViews") || "0")

    localStorage.setItem("discountModalTimestamp", now.toString())
    localStorage.setItem("discountModalViews", (views + 1).toString())
  }

  if (!showDiscountModal) return null

  return (
    <DiscountModal
      setShowDiscountModal={handleClose}
      email={email}
      setEmail={setEmail}
    />
  )
}
