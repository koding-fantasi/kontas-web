"use client"

import { useState } from 'react'
import CliPreview from './(ui)/CliPreview'
import { motion, AnimatePresence } from 'framer-motion'

export default function CliSection() {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <section className="py-20 relative z-20">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-[var(--primary-from)] to-[var(--primary-to)] bg-clip-text text-transparent">
                    CLI Magic ✨
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                    Boost your productivity with our powerful CLI tools. Generate CRUD, manage database, and more with simple commands.
                </p>

                {/* Interactive CLI Button */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setIsVisible(!isVisible)}
                        className="px-6 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur-sm text-[var(--foreground)] border-2 border-[var(--primary-from)] rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-[var(--primary-from)]/20 text-base md:text-lg font-bold"
                    >
                        {isVisible ? (
                            <>
                                <span>Close Terminal</span>
                                <span className="ml-2">⌘</span>
                            </>
                        ) : (
                            <>
                                <span>Open Terminal</span>
                                <span className="ml-2">⌘</span>
                            </>
                        )}
                    </button>
                </div>
                
                {/* CLI Preview with Animation */}
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <CliPreview />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
