'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: { x: number; y: number; radius: number; speed: number }[] = []

    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5
      })
    }

    function drawStars() {
      if(!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'white'
      stars.forEach(star => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
        }
      })
      requestAnimationFrame(drawStars)
    }

    drawStars()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden w-full text-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-secondary">
          404
        </h1>
        <h2 className="text-4xl font-semibold mb-4">Ops, temos um problema!</h2>
        <p className="text-lg mb-8 max-w-md">
          Parece que sua nave espacial se perdeu no vasto universo da internet.
          Não se preocupe, nossa equipe de resgate está a caminho!
        </p>
        <div className="flex flex-row justify-center">
          <Link href="/">
            <HoverBorderGradient className="bg-card">
              Voltar para a tela inicial
            </HoverBorderGradient>
          </Link>
        </div>
      </div>
    </div>
  )
}