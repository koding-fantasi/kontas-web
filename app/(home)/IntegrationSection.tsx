"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const partners = [
    {
        name: 'Next.js',
        logo: '/assets/framework-logo/next.png',
        desc: 'Build full-stack apps with Kontas & Next.js',
        color: 'hover:text-black dark:hover:text-white'
    },
    {
        name: 'ElysiaJS',
        logo: '/assets/framework-logo/elysia.svg',
        desc: 'Create blazing fast APIs with Kontas & Elysia',
        color: 'hover:text-purple-500'
    },
    {
        name: 'Hono',
        logo: '/assets/framework-logo/hono.png',
        desc: 'Develop lightweight backends with Kontas & Hono',
        color: 'hover:text-blue-500'
    },
    {
        name: 'Bun',
        logo: '/assets/framework-logo/bun.svg',
        desc: 'Supercharge your apps with Bun',
        color: 'hover:text-orange-500'
    },
    {
        name: 'Express',
        logo: '/assets/framework-logo/ex.svg',
        desc: 'Build robust APIs with Kontas & Express',
        color: 'hover:text-green-500'
    }
]

export default function IntegrationSection() {
    const [currentPartner, setCurrentPartner] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentPartner((prev) => (prev + 1) % partners.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="min-h-screen flex items-center justify-center relative z-20 py-32">
            {/* Background reveal effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="max-w-7xl mx-auto h-full px-4 relative">
                    <div className="absolute inset-0 bg-white dark:bg-[#0a0a0a] rounded-[2rem] transition-opacity duration-500 h-[calc(100%-8rem)] my-16 
                        border-4 border-gray-200 dark:border-gray-800" 
                         style={{ clipPath: 'inset(0 0 0 0 round 2rem)' }} />
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Main Integration Display */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center gap-8 mb-6">
                        <motion.div 
                            key={currentPartner}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-[150px] h-[150px] relative"
                        >
                            <Image 
                                src={partners[currentPartner].logo}
                                alt={partners[currentPartner].name}
                                fill
                                unoptimized
                                className="object-contain"
                            />
                        </motion.div>
                        <span className="text-[120px] font-bold text-gray-400 mx-8">×</span>
                        <Image
                            src="/kl-light.png"
                            alt="KONTAS Logo"
                            width={400}
                            height={400}
                            className="object-contain"
                            priority
                        />
                    </div>
                    <motion.p 
                        key={partners[currentPartner].desc}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl text-gray-600 dark:text-gray-400 text-center max-w-3xl -mt-20"
                    >
                        {partners[currentPartner].desc}
                    </motion.p>
                </div>
            </div>
        </section>
    )
}