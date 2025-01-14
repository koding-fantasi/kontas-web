export default function Loading() {
    return (
        <div className="min-h-screen pt-16 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 border-4 border-[var(--primary-from)] border-t-transparent rounded-full animate-spin" />
                <p className="text-xl font-medium text-gray-600 dark:text-gray-400">
                    Loading your fantasy... ✨
                </p>
            </div>
        </div>
    )
} 