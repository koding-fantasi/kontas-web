'use client'

import { IconArrowDown, IconHeartFilled } from '@tabler/icons-react'

export default function ScrollDownIndicator() {
    const handleClick = () => {
        const featuresSection = document.getElementById('features-section')
        if (featuresSection) {
            const offset = 80 // utk mengcompensate navbar height + extra space
            const elementPosition = featuresSection.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }

    return (
        <button 
            onClick={handleClick}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[var(--primary-from)] transition-colors group cursor-pointer z-20 px-4 text-center"
        >
            <p className="text-sm md:text-lg font-medium">
                Discover why developers <IconHeartFilled className="inline w-4 md:w-5 h-4 md:h-5 text-[#FF4B4B]" /> Kontas
            </p>
            <IconArrowDown 
                className="w-5 md:w-6 h-5 md:h-6 animate-bounce group-hover:translate-y-1 transition-transform" 
                stroke={2}
            />
        </button>
    )
} 