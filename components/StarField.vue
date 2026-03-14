<template>
  <canvas ref="canvasEl" class="star-canvas" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasEl = ref<HTMLCanvasElement | null>(null)

interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  speed: number
  delta: number
}

let animFrame = 0
const stars: Star[] = []
let vegaPulse = 0

function resize(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function initStars(canvas: HTMLCanvasElement) {
  stars.length = 0
  const count = Math.floor((canvas.width * canvas.height) / 3000)
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.005 + 0.002,
      delta: Math.random() * Math.PI * 2,
    })
  }
}

function draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw regular stars with twinkle
  for (const star of stars) {
    star.delta += star.speed
    const twinkle = Math.sin(star.delta) * 0.3 + 0.7
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
    ctx.fill()
  }

  // Draw Vega: brighter pulsing gold star at center-top
  vegaPulse += 0.03
  const vegaX = canvas.width * 0.5
  const vegaY = canvas.height * 0.18
  const vegaR = 3.5 + Math.sin(vegaPulse) * 1.2
  const vegaGlow = ctx.createRadialGradient(vegaX, vegaY, 0, vegaX, vegaY, vegaR * 6)
  vegaGlow.addColorStop(0, `rgba(212, 168, 83, ${0.9 + Math.sin(vegaPulse) * 0.1})`)
  vegaGlow.addColorStop(0.4, `rgba(212, 168, 83, ${0.4 + Math.sin(vegaPulse) * 0.1})`)
  vegaGlow.addColorStop(1, 'rgba(212, 168, 83, 0)')
  ctx.beginPath()
  ctx.arc(vegaX, vegaY, vegaR * 6, 0, Math.PI * 2)
  ctx.fillStyle = vegaGlow
  ctx.fill()
  ctx.beginPath()
  ctx.arc(vegaX, vegaY, vegaR, 0, Math.PI * 2)
  ctx.fillStyle = '#D4A853'
  ctx.fill()

  animFrame = requestAnimationFrame(() => draw(canvas, ctx))
}

onMounted(() => {
  const canvas = canvasEl.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  resize(canvas)
  initStars(canvas)
  draw(canvas, ctx)

  const onResize = () => {
    resize(canvas)
    initStars(canvas)
  }
  window.addEventListener('resize', onResize)

  onUnmounted(() => {
    cancelAnimationFrame(animFrame)
    window.removeEventListener('resize', onResize)
  })
})

onUnmounted(() => {
  cancelAnimationFrame(animFrame)
})
</script>

<style scoped>
.star-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
