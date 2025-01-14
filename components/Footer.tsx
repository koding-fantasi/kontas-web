export default function FooterSection() {
    return (
        <footer className="py-12 relative overflow-hidden">
            {/* Gradient Orbs - Disesuaikan dgn primary color */}
            <div className="absolute -left-20 -top-20 w-40 h-40 bg-[var(--primary-from)]/10 rounded-full blur-3xl"></div>
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-[var(--primary-to)]/5 rounded-full blur-3xl"></div>
            
            {/* Glass Container */}
            <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative backdrop-blur-sm">
                {/* Logo Section - Pake gradient sesuai tema */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center space-x-2">
                        <div className="text-3xl font-bold bg-gradient-to-r from-[var(--primary-from)] to-[var(--primary-to)] bg-clip-text text-transparent">
                            KONTAS
                        </div>
                        <span className="px-2 py-1 text-xs bg-gradient-to-r from-[var(--primary-from)] to-[var(--primary-to)] rounded-full text-white">
                            Beta
                        </span>
                    </div>
                </div>

                {/* Main Grid - Warna text disesuaikan */}
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 px-4">
                    {/* Product */}
                    <div>
                        <h4 className="text-[var(--foreground)] font-medium mb-3">
                            <span>Product</span>
                        </h4>
                        <ul className="space-y-1.5">
                            <li>
                                <a href="/docs" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="/docs/getting-started" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    Getting Started
                                </a>
                            </li>
                            <li>
                                <a href="/changelog" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    Changelog
                                </a>
                            </li>
                            <li>
                                <a href="/pricing" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Features - Clean design */}
                    <div>
                        <h4 className="text-[var(--foreground)] font-medium mb-3">
                            <span>Features</span>
                        </h4>
                        <ul className="space-y-1.5">
                            <li>
                                <a href="/docs/cli" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    CLI Tools
                                </a>
                            </li>
                            <li>
                                <a href="/docs/graphql" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    GraphQL Support
                                </a>
                            </li>
                            <li>
                                <a href="/docs/rest" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    REST API
                                </a>
                            </li>
                            <li>
                                <a href="/docs/seeding" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    Database Seeding
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources - Removed badges */}
                    <div>
                        <h4 className="text-[var(--foreground)] font-medium mb-3">
                            <span>Resources</span>
                        </h4>
                        <ul className="space-y-1.5">
                            <li>
                                <a href="/docs/tutorials" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    Tutorials
                                </a>
                            </li>
                            <li>
                                <a href="/docs/best-practices" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    Best Practices
                                </a>
                            </li>
                            <li>
                                <a href="/templates" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    Templates
                                </a>
                            </li>
                            <li>
                                <a href="/docs/examples" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    Code Examples
                                </a>
                            </li>
                            <li>
                                <a href="/docs/api-reference" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    API Reference
                                </a>
                            </li>
                            <li>
                                <a href="/docs/deployment" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    Deployment
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Community - Clean links */}
                    <div>
                        <h4 className="text-[var(--foreground)] font-medium mb-3">
                            <span>Community</span>
                        </h4>
                        <ul className="space-y-1.5">
                            <li>
                                <a href="https://github.com/hensmsn/kontas/discussions" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    Discussions
                                </a>
                            </li>
                            <li>
                                <a href="https://discord.gg/kontas" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    Discord Chat
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/henscc" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="/contributors" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                                    Contributors
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Stay Updated - Gradient & bg disesuaikan */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary-from)]/20 to-[var(--primary-to)]/20 rounded-lg blur"></div>
                        <div className="relative bg-[var(--background)]/50 p-4 rounded-lg backdrop-blur-sm">
                            <h4 className="text-[var(--foreground)] font-medium mb-2">Stay Updated</h4>
                            <p className="text-[var(--muted-foreground)] mb-4 text-sm">Get notified about latest updates</p>
                            
                            <div className="flex flex-col gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email"
                                    className="w-full bg-[var(--background)]/50 rounded-lg px-4 py-2 text-[var(--foreground)] focus:outline-none placeholder:text-[var(--muted-foreground)]"
                                />
                                <button className="w-full bg-gradient-to-r from-[var(--primary-from)] to-[var(--primary-to)] text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Links - Added inner padding */}
                <div className="flex justify-center space-x-6 mt-12 mb-8 px-4">
                    <a href="https://github.com/hensmsn/kontas" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                        <span className="sr-only">GitHub</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    </a>
                    <a href="https://twitter.com/henscc" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                        <span className="sr-only">Twitter</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                    <a href="https://discord.gg/kontas" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200">
                        <span className="sr-only">Discord</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                    </a>
                </div>

                {/* Bottom Section - Border & text color disesuaikan */}
                <div className="mt-8 pt-8 relative px-4">
                    <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
                    <div className="relative flex flex-col md:flex-row justify-between items-center text-[var(--muted-foreground)] text-sm">
                        <div>
                            © {new Date().getFullYear()} KONTAS. All rights reserved.
                        </div>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <a href="/privacy" className="hover:text-[var(--foreground)] transition-colors duration-200">Privacy Policy</a>
                            <span className="text-[var(--border)]">•</span>
                            <a href="/terms" className="hover:text-[var(--foreground)] transition-colors duration-200">Terms</a>
                            <span className="text-[var(--border)]">•</span>
                            <a href="/license" className="hover:text-[var(--foreground)] transition-colors duration-200">MIT License</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}