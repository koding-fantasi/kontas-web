'use client'

import { useTimeout } from '@/hooks/useTimeout'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface DragonLottieProps {
    src: string
    className?: string
}

export default function DragonLottie({ src, className }: DragonLottieProps) {
    const isLoaded = useTimeout(100)

    return (
        <DotLottieReact
            src={src}
            loop
            autoplay
            className={`${className} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
    )
} 