"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import SearchModal from "./SearchModal";
import { IconSparkles, IconBrandNpm, IconBrandGithub } from "@tabler/icons-react";

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (!isSearchOpen && value.length > 0) {
            setIsSearchOpen(true);
            e.target.value = '';
        }
    };

    return (
        <>
            <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
                    {/* Left side - Logo */}
                    <div className="w-[200px]">
                        <Link href="/" className="text-xl font-bold text-gray-800" aria-label="Home">
                            <div className="mb-8">
                                <Image
                                    src="/kl-light.png"
                                    alt="KONTAS Logo"
                                    width={500}
                                    height={500}
                                    className="w-[150px] mx-auto object-contain mt-10"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Center - Search (Updated) */}
                    <div className="flex-1 flex justify-center">
                        <div className="hidden md:flex items-center bg-gray-100 rounded-full transition-all hover:bg-gray-200 mx-auto">
                            <input
                                ref={inputRef}
                                type="search"
                                placeholder="Search docs with AI"
                                onChange={handleInputChange}
                                className="bg-transparent px-6 py-2.5 text-lg focus:outline-none text-gray-600 w-[400px] rounded-full placeholder:text-lg"
                                aria-label="Search documentation"
                            />
                            <IconSparkles className="w-5 h-5 mr-4 text-gray-500" aria-hidden="true" />
                        </div>
                    </div>

                    {/* Right side - Icons */}
                    <div className="w-[200px] flex items-center justify-end gap-6">
                        <a
                            href="https://www.npmjs.com/package/kontas"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View package on NPM"
                        >
                            <IconBrandNpm className="w-10 h-10" aria-hidden="true" />
                        </a>
                        <a
                            href="https://github.com/koding-fantasi/kontas-web"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View source on GitHub"
                        >
                            <IconBrandGithub className="w-7 h-7" aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </nav>

            <SearchModal 
                isOpen={isSearchOpen} 
                onClose={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    if (inputRef.current) {
                        inputRef.current.value = '';
                    }
                }}
                initialQuery={searchQuery}
            />
        </>
    );
}
