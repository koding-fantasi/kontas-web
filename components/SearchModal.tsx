"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { searchDocs } from '@/utils/ai-tools'
import CopyButton from '@/components/ui/CopyButton'

interface ChatMessage {
    isUser: boolean
    text: string
}

interface SearchModalProps {
    isOpen: boolean
    onClose: () => void
    initialQuery: string
}

// Helper function to extract code blocks
const extractCodeBlocks = (text: string) => {
    // Handle code blocks while ignoring instruction text
    const regex = /(```(\w+)?\n([\s\S]*?)```|`([^`]+)`|(^|\n)(bash\s+\S+(?:\s+\S+)*$))/gm;
    const blocks = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // Add text before code block
        if (match.index > lastIndex) {
            blocks.push({
                type: 'text',
                content: text.slice(lastIndex, match.index)
            });
        }

        if (match[3]) {
            // Multi-line code block with ```
            blocks.push({
                type: 'code',
                language: match[2] || '',
                content: match[3].trim()
            });
        } else if (match[4]) {
            // Inline code with single `
            blocks.push({
                type: 'code',
                language: '',
                content: match[4].trim()
            });
        } else if (match[6]) {
            // Single line bash commands only
            blocks.push({
                type: 'code',
                language: 'bash',
                content: match[6].trim()
            });
        }

        lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
        blocks.push({
            type: 'text',
            content: text.slice(lastIndex)
        });
    }

    return blocks;
}

export default function SearchModal({ isOpen, onClose, initialQuery }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [messages, setMessages] = useState<ChatMessage[]>([])

    // Add this effect to sync query when modal opens
    useEffect(() => {
        if (isOpen && initialQuery) {
            setQuery(initialQuery);
        }
    }, [isOpen, initialQuery]);

    // Reset states when modal closes
    useEffect(() => {
        if (!isOpen) {
            setQuery('')
            setIsLoading(false)
            setMessages([])
        }
    }, [isOpen])

    // Handle search action
    const handleSearch = async () => {
        if (!query.trim()) return
        
        // Add user message
        const userMessage = query
        setMessages(prev => [...prev, { isUser: true, text: userMessage }])
        setQuery('') // Clear input
        
        setIsLoading(true)
        try {
            const response = await searchDocs(userMessage, messages)
            setMessages(prev => [...prev, { isUser: false, text: response }])
        } catch (error) {
            console.error('Search error:', error)
            setMessages(prev => [...prev, { isUser: false, text: 'Sori, ada error nih... 😅' }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div 
                        initial={{ y: -20, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -20, opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-x-0 top-24 max-w-2xl mx-auto"
                    >
                        <div className="bg-[var(--background)] rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                            {/* Content */}
                            <div className="relative z-10">
                                {/* Search input */}
                                <div className="p-4 border-b border-gray-200">
                                    <div className="relative flex items-center">
                                        <input
                                            autoFocus
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            placeholder="Search docs or ask anything..."
                                            className="w-full bg-gray-100 rounded-xl pl-4 pr-12 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-from)] text-lg placeholder:text-lg"
                                        />
                                        <button
                                            onClick={handleSearch}
                                            className="absolute right-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <div className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-gray-700 rounded-full" />
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="max-h-[calc(70vh-80px)] overflow-y-auto bg-[var(--background)]">
                                    <div className={`px-4 flex flex-col-reverse gap-6 ${messages.length > 0 ? 'py-4' : 'pt-1'}`}>
                                        {messages.map((msg, idx) => (
                                            <motion.div 
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 * (messages.length - idx - 1) }}
                                                className="text-[var(--foreground)] w-full"
                                            >
                                                <div className="font-semibold text-sm px-2 mb-1">
                                                    {msg.isUser ? 'You:' : 'AI:'}
                                                </div>
                                                <div className={`${msg.isUser ? 'text-[var(--primary-from)]' : 'text-[var(--foreground)]'} px-2`}>
                                                    {msg.isUser ? (
                                                        msg.text
                                                    ) : (
                                                        extractCodeBlocks(msg.text).map((block, i) => (
                                                            block.type === 'code' ? (
                                                                <div key={i} className="my-2 relative">
                                                                    <div className="bg-gray-950/40 backdrop-blur-sm rounded-xl p-4 font-mono text-sm">
                                                                        {block.language && (
                                                                            <div className="text-xs text-gray-500 mb-2">
                                                                                {block.language}
                                                                            </div>
                                                                        )}
                                                                        <div className="flex items-center justify-between">
                                                                            <pre className="flex-1">{block.content}</pre>
                                                                            <CopyButton text={block.content} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div key={i} className="whitespace-pre-line">{block.content}</div>
                                                            )
                                                        ))
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}