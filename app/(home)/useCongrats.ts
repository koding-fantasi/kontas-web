import { useState, useRef, useEffect } from 'react'

export function useCongrats() {
    const [showCongrats, setShowCongrats] = useState(false)
    const [congratsPosition, setCongratsPosition] = useState(0)
    const commandRef = useRef<HTMLDivElement>(null)

    const updatePosition = () => {
        if (commandRef.current) {
            const rect = commandRef.current.getBoundingClientRect()
            setCongratsPosition(rect.top)
        }
    }

    useEffect(() => {
        updatePosition()
        
        window.addEventListener('scroll', updatePosition)
        window.addEventListener('resize', updatePosition)
        
        return () => {
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('resize', updatePosition)
        }
    }, [])

    const handleCopy = () => {
        navigator.clipboard.writeText('bun create kontas@latest my-app')
        setShowCongrats(true)
    }

    return {
        showCongrats,
        setShowCongrats,
        congratsPosition,
        commandRef,
        handleCopy
    }
} 