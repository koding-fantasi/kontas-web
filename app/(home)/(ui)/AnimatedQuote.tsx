'use client'

import { useEffect } from 'react'

const quotes = [
    "Biarkan fantasimu hidup dalam setiap baris kode",
    "Let your fantasy live in every line of code",
    "让你的幻想在每行代码中活跃"
]

export default function AnimatedQuote() {
    useEffect(() => {
        const quotes = document.querySelectorAll('.animated-quote p');
        let currentQuote = 0;

        const rotateQuotes = () => {
            quotes.forEach((quote, index) => {
                if (index === currentQuote) {
                    (quote as HTMLElement).style.opacity = '1';
                    (quote as HTMLElement).style.transform = 'translateY(0)';
                } else {
                    (quote as HTMLElement).style.opacity = '0';
                    (quote as HTMLElement).style.transform = 'translateY(10px)';
                }
            });
            currentQuote = (currentQuote + 1) % quotes.length;
        };

        const interval = setInterval(rotateQuotes, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-12 mt-4 md:mt-6">
            <div className="animated-quote absolute w-full">
                {quotes.map((quote, index) => (
                    <p 
                        key={index}
                        className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 absolute w-full text-center transition-all duration-500 px-4"
                        style={{ 
                            opacity: index === 0 ? 1 : 0,
                            transform: index === 0 ? 'translateY(0)' : 'translateY(10px)'
                        }}
                    >
                        {quote}
                    </p>
                ))}
            </div>
        </div>
    )
} 