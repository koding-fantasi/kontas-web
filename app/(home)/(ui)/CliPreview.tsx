'use client'

import { useState, useCallback, ReactNode } from 'react'
import { TypeAnimation } from 'react-type-animation'
import CopyButton from '@/components/ui/CopyButton'

const commands = [
    {
        cmd: 'bunx kontas generate Product title:string price:number description:string',
        results: [
            '<cyan>🚀 Memulai generate CRUD...</cyan>',
            '',
            '<yellow>📦 Detail Generate:</yellow>',
            '<gray>Framework: </gray><green>hono</green>',
            '<gray>Database: </gray><green>sqlite</green>',
            '<gray>Model: </gray><green>Product</green>',
            '<gray>Project Directory: </gray><green>root</green>',
            '<gray>Fields:</gray>',
            '<gray>  - title: </gray><blue>string</blue>',
            '<gray>  - price: </gray><blue>number</blue>', 
            '<gray>  - description: </gray><blue>string</blue>',
            '',
            '<green>Created db.json</green>',
            '<green>Created config/index.ts</green>',
            '<green>Created product.schema.ts</green>',
            '<green>Created product.repository.ts</green>',
            '<green>Created product.migrate.ts</green>',
            '<green>Created product.seed.ts</green>',
            '<green>Created product.service.ts</green>',
            '<green>Created index.ts with controller</green>',
            '<green>Updated router.ts with new routes</green>',
            '<green>Created products.json with sample data</green>',
            '<green>Updated index.ts with hono server setup</green>',
            '<green>Created error.ts with error handler</green>',
            '',
            '<cyan>✨ Files generated successfully!</cyan>',
            '<cyan>✨ Package.json berhasil diupdate!</cyan>',
            '',
            '<cyan>✨ Generate CRUD berhasil!</cyan>'
        ]
    },
    {
        cmd: 'bunx kontas migrate:up product && bunx kontas seed product',
        results: [
            '<cyan>📦 Memulai migration up...</cyan>',
            '',
            '',
            '<green>✨ Migration up berhasil!</green>',
            '',
            '',
            '<cyan>🌱 Memulai seeding...</cyan>',
            '',
            '',
            '<green>✨ Seeding berhasil!</green>',
            '',
            ''
        ]
    },
    {
        cmd: 'bunx kontas studio',
        results: [
            '<cyan>🚀 Starting Kontas Studio...</cyan>',
            '<yellow>📦 Reading kontas.config.ts</yellow>',
            '<green>🔌 Connected to sqlite database</green>',
            '<blue>📁 Loading modules from root</blue>',
            '<magenta>✨ Found module: Product</magenta>',
            '<cyan>🎯 Kontas Studio running on </cyan><green>http://localhost:1616</green>'
        ]
    }
]

const colorMap: Record<string, string> = {
    cyan: 'text-cyan-500',
    yellow: 'text-yellow-500',
    green: 'text-emerald-500',
    blue: 'text-blue-500',
    gray: 'text-gray-500',
    magenta: 'text-fuchsia-500'
}

function colorize(text: string): ReactNode[] {
    const parts = text.split(/(<\/?[a-z]+>)/g)
    const result: ReactNode[] = []
    let currentColor = ''
    
    parts.forEach((part, index) => {
        if (part.startsWith('</')) {
            currentColor = ''
        } else if (part.startsWith('<')) {
            currentColor = part.slice(1, -1)
        } else if (part) {
            result.push(
                <span key={index} className={currentColor ? colorMap[currentColor] : ''}>
                    {part}
                </span>
            )
        }
    })
    
    return result
}

export default function CliPreview() {
    const [currentStep, setCurrentStep] = useState(0)
    const [isTypingCommand, setIsTypingCommand] = useState(true)
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    
    const showNextLine = useCallback(() => {
        const cmd = commands[currentStep]
        if (!cmd) return

        if (currentLineIndex < cmd.results.length) {
            setCurrentLineIndex(prev => prev + 1)
        } else {
            setTimeout(() => {
                setCurrentStep(prev => prev + 1)
                setIsTypingCommand(true)
                setCurrentLineIndex(0)
            }, 1000)
        }
    }, [currentStep, currentLineIndex])

    return (
        <div className="w-full max-w-4xl mx-auto bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-100/50 dark:bg-gray-950/50 border-b border-gray-200 dark:border-gray-800">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">kontas-cli</span>
                </div>
            </div>

            {/* Terminal Content */}
            <div className="p-4 font-mono text-sm md:text-base">
                {commands.map((cmd, idx) => (
                    <div 
                        key={idx} 
                        className={`mb-6 last:mb-2 transition-opacity duration-500 ${idx > currentStep ? 'opacity-0' : 'opacity-100'}`}
                    >
                        {/* Command Line */}
                        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-300">
                            <span className="text-[var(--primary-from)]">❯</span>
                            {idx === currentStep && isTypingCommand ? (
                                <TypeAnimation
                                    sequence={[
                                        cmd.cmd,
                                        1000,
                                        () => {
                                            setIsTypingCommand(false)
                                            showNextLine()
                                        }
                                    ]}
                                    cursor={true}
                                    speed={50}
                                />
                            ) : (
                                <div className="flex items-center justify-between w-full group">
                                    <span>{cmd.cmd}</span>
                                    <CopyButton text={cmd.cmd} />
                                </div>
                            )}
                        </div>

                        {/* Command Results */}
                        {idx === currentStep && !isTypingCommand && (
                            <div className="mt-2 pl-4 space-y-1">
                                {cmd.results.slice(0, currentLineIndex).map((line, lineIdx) => (
                                    <div key={lineIdx} className="transition-opacity duration-300">
                                        {colorize(line)}
                                        {lineIdx === currentLineIndex - 1 && (
                                            <TypeAnimation
                                                sequence={[
                                                    '',
                                                    100,
                                                    () => showNextLine()
                                                ]}
                                                cursor={false}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Completed Results */}
                        {idx < currentStep && (
                            <div className="mt-2 pl-4 space-y-1">
                                {cmd.results.map((line, lineIdx) => (
                                    <div key={lineIdx}>
                                        {colorize(line)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
