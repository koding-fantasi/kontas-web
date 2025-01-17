export default function FeaturesPreview() {
    return (
        <section id="features-section" className="py-20">
            <div className="max-w-6xl mx-auto px-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: '🚀', title: 'Blazing Fast', desc: 'Built on top of Bun, delivering unmatched performance' },
                        { icon: '🛡️', title: 'Security First', desc: 'Built-in CSRF, rate limiting & input sanitization' },
                        { icon: '🎯', title: 'Zero Config', desc: 'Start coding instantly with smart defaults' },
                        { icon: '🔄', title: 'Smart Routing', desc: 'Dynamic, catch-all & pattern-based routing system' },
                        { icon: '🎨', title: 'Type Safe', desc: 'Full TypeScript support with enhanced error handling' },
                        { icon: '🔒', title: 'Middleware Magic', desc: 'Powerful middleware system with pattern matching' },
                    ].map((feature, i) => (
                        <div 
                            key={i} 
                            className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-from)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="text-4xl mb-4" aria-hidden="true">{feature.icon}</div>
                            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[var(--primary-from)] to-[var(--primary-to)] bg-clip-text text-transparent">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 