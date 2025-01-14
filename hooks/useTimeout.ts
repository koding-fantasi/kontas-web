import { useState, useEffect } from 'react'

export function useTimeout(delay: number) {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true)
        }, delay)

        return () => clearTimeout(timer)
    }, [delay])

    return isLoaded
} 