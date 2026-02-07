'use client'

interface ScrollToButtonProps {
  targetId: string
  children: React.ReactNode
  className?: string
}

export function ScrollToButton({ targetId, children, className }: ScrollToButtonProps) {
  const handleClick = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
