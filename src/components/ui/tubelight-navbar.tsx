import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Home, User, FolderOpen, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // IntersectionObserver to track active section
    const sectionIds = items.map(item => item.url.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matchedItem = items.find(
              item => item.url === `#${entry.target.id}`
            )
            if (matchedItem) {
              setActiveTab(matchedItem.name)
            }
          }
        })
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
    }
  }, [items])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault()
    setActiveTab(item.name)
    const el = document.querySelector(item.url)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 sm:top-0 left-1/2 -translate-x-1/2 z-50 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => handleClick(e, item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}

// Pre-configured navbar for the portfolio
export default function PortfolioNavBar() {
  const navItems: NavItem[] = [
    { name: "Home", url: "#home", icon: Home },
    { name: "Sobre", url: "#about", icon: User },
    { name: "Projetos", url: "#projects", icon: FolderOpen },
  ]

  return <NavBar items={navItems} />
}
