"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Use a state to toggle the theme



export function ModeToggle() {
  const { setTheme } = useTheme()
  const currentTheme = useTheme().systemTheme
  const [theme, setThemes] = React.useState(currentTheme)
  

  return (
        <Button onClick={() => {
            // If the current theme is light, set it to dark. else, set it to light
            setTheme(theme === "light" ? "dark" : "light")
            setThemes(theme === "light" ? "dark" : "light")
          }}  variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
  )
}
