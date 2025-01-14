'use client'

import { useTimeout } from '@/hooks/useTimeout'
import { DotLottieReact, DotLottie } from '@lottiefiles/dotlottie-react'
import { useEffect, useState } from 'react'

interface CongratsLottieProps {
    isVisible: boolean
    onComplete?: () => void
    topPosition: number
}

export default function CongratsLottie({ isVisible, onComplete, topPosition }: CongratsLottieProps) {
    const isLoaded = useTimeout(100)
    const [dotLottie, setDotLottie] = useState<DotLottie | null>(null)

    useEffect(() => {
        if (dotLottie) {
            const handleComplete = () => {
                if (onComplete) onComplete()
            }
            
            dotLottie.addEventListener('complete', handleComplete)
            
            return () => {
                dotLottie.removeEventListener('complete', handleComplete)
            }
        }
    }, [dotLottie, onComplete])

    if (!isVisible) return null

    return (
        <div 
            className="fixed z-50 flex items-center justify-center pointer-events-none"
            style={{ 
                height: '600px',
                left: 0,
                right: 0,
                top: `${topPosition - 275}px`, // nilai tengah antara -300 dan -200
            }}
        >
            <DotLottieReact
                src="/assets/lottie-congrats/congrats3.lottie"
                autoplay
                loop={false}
                dotLottieRefCallback={setDotLottie}
                className={`w-full h-full max-w-[600px] max-h-[600px] transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    )
} 