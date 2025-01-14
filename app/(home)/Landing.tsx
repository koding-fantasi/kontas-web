'use client'

import DragonLottie from './(ui)/Dragon'
import AnimatedQuote from './(ui)/AnimatedQuote'
import ScrollDownIndicator from './(ui)/ScrollDownIndicator'
import CongratsLottie from './(ui)/Congrats'
import { useCongrats } from './useCongrats'
import ParticlesBackground from './(ui)/ParticlesBackground'
import FloatingLeaves from './(ui)/FloatingLeaves'

export default function Landing() {
    const { 
        showCongrats, 
        setShowCongrats, 
        congratsPosition, 
        commandRef, 
        handleCopy 
    } = useCongrats()

    return (
        <section className="flex items-center justify-center relative overflow-hidden" style={{ minHeight: 'calc(100vh - 64px)' }}>
            <ParticlesBackground />
            <FloatingLeaves />

            {/* Left Dragon */}
            <div className="absolute md:left-[15%] left-1/4 md:translate-x-0 md:top-[60%] top-32 -translate-y-1/2 scale-x-[-1]">
                <DragonLottie 
                    src="/assets/lottie-dragon/dragon1.lottie" 
                    className="w-24 h-24 md:w-52 md:h-52"
                />
            </div>

            <div className="max-w-6xl mx-auto px-4 py-20 md:py-20 text-center relative z-10">
                {/* Main Heading */}
                <div className="relative animate-float mb-16 mt-20 md:mt-0">
                    <h1 className="text-5xl md:text-9xl font-black">
                        <span className="bg-gradient-to-r from-[var(--primary-from)] to-[var(--primary-to)] bg-clip-text text-transparent">
                            KONTAS
                        </span>
                    </h1>
                    <p className="mt-4 text-xl md:text-3xl font-medium px-2">
                        The Server Framework that
                        <span className="bg-gradient-to-r from-[var(--primary-from)] to-[var(--primary-to)] bg-clip-text text-transparent font-black"> Anyone </span>
                        Can Master
                    </p>
                    
                    <AnimatedQuote />
                </div>

                {/* Command */}
                <div className="mt-8 md:mt-16 px-2">
                    <div 
                        ref={commandRef}
                        onClick={handleCopy}
                        className="bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-gray-800 text-[var(--foreground)] p-4 md:p-6 rounded-2xl text-center w-full max-w-xl mx-auto relative group hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:border-[var(--primary-from)]"
                    >
                        <pre className="font-mono text-base md:text-lg">
                            <code className="break-normal">bun create kontas@latest my-app</code>
                        </pre>
                    </div>
                </div>

                <CongratsLottie 
                    isVisible={showCongrats} 
                    onComplete={() => setShowCongrats(false)}
                    topPosition={congratsPosition}
                />

                {/* CTA Buttons */}
                <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center px-4">
                    <button className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[var(--primary-from)] to-[var(--primary-to)] text-white rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-[var(--primary-from)]/30 text-base md:text-lg font-bold">
                        Get Started
                    </button>
                    <button className="px-6 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur-sm text-[var(--foreground)] border-2 border-[var(--primary-from)] rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-[var(--primary-from)]/20 text-base md:text-lg font-bold">
                        Read Docs
                    </button>
                </div>
            </div>

            <ScrollDownIndicator />

            {/* Right Dragon */}
            <div className="absolute md:right-[14%] right-1/4 md:translate-x-0 md:top-[60%] top-32 -translate-y-1/2">
                <DragonLottie 
                    src="/assets/lottie-dragon/dragon2.lottie" 
                    className="w-24 h-24 md:w-52 md:h-52"
                />
            </div>
        </section>
    )
} 