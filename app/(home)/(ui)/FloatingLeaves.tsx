'use client'

import { useEffect, useRef } from 'react'

export default function FloatingLeaves() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let mouseX = 0
        let mouseY = 0

        // Track mouse position
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }
        window.addEventListener('mousemove', handleMouseMove)

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        const leaves: Array<{
            x: number
            y: number
            size: number
            angle: number
            rotationSpeed: number
            speedX: number
            speedY: number
            oscillationSpeed: number
            time: number
        }> = []

        // Create leaves
        const leafCount = Math.floor((canvas.width * canvas.height) / 35000)
        for (let i = 0; i < leafCount; i++) {
            leaves.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 20 + 15,
                angle: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 0.5 + 0.2,
                oscillationSpeed: Math.random() * 0.02,
                time: Math.random() * 100
            })
        }

        const drawLeaf = (x: number, y: number, size: number, angle: number) => {
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate(angle * Math.PI / 180)

            // Gradient
            const gradient = ctx.createLinearGradient(-size/2, 0, size/2, 0)
            gradient.addColorStop(0, '#FF4B4B')
            gradient.addColorStop(1, '#FF8E53')
            ctx.fillStyle = gradient
            ctx.strokeStyle = '#FF4B4B'
            ctx.lineWidth = 1

            // Draw leaf shape
            ctx.beginPath()
            
            // Batang daun
            ctx.moveTo(0, size/2 + size/3)
            ctx.lineTo(0, size/2)
            
            // Ujung atas daun
            ctx.moveTo(0, -size/2 - size/2)
            
            // Sisi kiri
            ctx.bezierCurveTo(
                -size/2, -size/3,    
                -size/2, size/3,     
                0, size/2            
            )
            
            // Sisi kanan
            ctx.bezierCurveTo(
                size/2, size/3,      
                size/2, -size/3,     
                0, -size/2 - size/2
            )

            // Tulang daun tengah
            ctx.moveTo(0, -size/2 - size/2)
            ctx.lineTo(0, size/2)

            // Tulang daun samping
            for(let i = 1; i <= 4; i++) {
                const y = -size/2 + (i * size/5)
                const length = size/3 * (1 - i/5)
                
                ctx.moveTo(0, y)
                ctx.lineTo(-length, y + size/8)
                ctx.moveTo(0, y)
                ctx.lineTo(length, y + size/8)
            }

            ctx.fill()
            ctx.stroke()
            ctx.restore()
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            leaves.forEach(leaf => {
                leaf.time += leaf.oscillationSpeed

                // Calculate distance to mouse
                const dx = mouseX - leaf.x
                const dy = mouseY - leaf.y
                const dist = Math.sqrt(dx * dx + dy * dy)

                // If leaf is close to mouse, move towards it (slower)
                if (dist < 250) {  // Naikin radius
                    const strength = (250 - dist) / 250
                    leaf.x += dx * 0.01 * strength  // Kurangin kecepatan ke mouse
                    leaf.y += dy * 0.01 * strength
                } else {
                    // Normal movement (slower)
                    leaf.x += Math.sin(leaf.time) * 0.3 + leaf.speedX
                    leaf.y += leaf.speedY
                }

                leaf.angle += leaf.rotationSpeed

                if (leaf.y > canvas.height + 100) {
                    leaf.y = -50
                    leaf.x = Math.random() * canvas.width
                }
                if (leaf.x > canvas.width + 100) leaf.x = -100
                if (leaf.x < -100) leaf.x = canvas.width + 100

                ctx.globalAlpha = 0.6
                drawLeaf(leaf.x, leaf.y, leaf.size, leaf.angle)
            })

            requestAnimationFrame(draw)
        }

        draw()

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
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