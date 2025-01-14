"use client";
import { useState } from "react";
import { toast } from "sonner";

interface CopyButtonProps {
    text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const handleCopy = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);

            toast.success("Copied!", {
                position: "top-center",
                duration: 2000,
            });

            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy");
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="rounded-md p-2 text-gray-400 transition-colors hover:text-gray-50"
            aria-label={isCopied ? "Copied" : "Copy"}
        >
            <svg 
                className="h-4 w-4"
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2}
                stroke="currentColor"
            >
                {isCopied ? (
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M5 13l4 4L19 7"
                    />
                ) : (
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                )}
            </svg>
        </button>
    );
}
