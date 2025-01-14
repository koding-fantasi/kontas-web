'use client'

import { useEffect, useRef } from 'react'

export default function ParticlesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Colors from theme
        const primaryFrom = '#FF4B4B'
        const primaryTo = '#FF8E53'

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Particle system
        const particles: Array<{
            x: number
            y: number
            dx: number
            dy: number
            size: number
        }> = []

        // Create particles
        const particleCount = Math.floor((canvas.width * canvas.height) / 20000)
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                dx: (Math.random() - 0.5) * 1,
                dy: (Math.random() - 0.5) * 1,
                size: Math.random() * 3 + 1
            })
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Update & draw particles
            particles.forEach((p, i) => {
                // Move
                p.x += p.dx
                p.y += p.dy

                // Bounce on edges
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1

                // Draw particle
                const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
                gradient.addColorStop(0, primaryFrom)
                gradient.addColorStop(1, primaryTo)
                ctx.fillStyle = gradient

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()

                // Connect nearby particles
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < 100) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(255, 75, 75, ${0.2 * (1 - dist/100)})`
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                })
            })
        }

        const interval = setInterval(draw, 30)

        return () => {
            clearInterval(interval)
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])

    return (
        <canvas 
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.4 }}
        />
    )
} 