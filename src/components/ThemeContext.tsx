"use client"

import { useEffect, useState } from "react"


interface ThemeContextProps {
  children: React.ReactNode
}

export default function ThemeContext({ children }: ThemeContextProps) {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    setTheme(getActiveTheme())
  }, [])

  function getActiveTheme() {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "dark");
    }
    return localStorage.getItem("theme")!!;
  }

  return(
    <div className={theme}>{children}</div>
  )
}