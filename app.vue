<!-- prettier-ignore -->
<template>
  <div>
    <NuxtPage />
    <!-- Custom cursor -->
    <div
      ref="cursorEl"
      class="cursor-cross"
      aria-hidden="true"
    />
    <!-- Scroll progress indicator -->
    <ScrollProgress />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursorEl = ref<HTMLElement | null>(null)

let raf = 0
let mouseX = 0
let mouseY = 0
let curX = 0
let curY = 0

function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY
}

function animateCursor() {
  curX += (mouseX - curX) * 0.18
  curY += (mouseY - curY) * 0.18
  if (cursorEl.value) {
    cursorEl.value.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`
  }
  raf = requestAnimationFrame(animateCursor)
}

// Lenis smooth scroll initialization
let lenis: import('lenis').default | null = null

onMounted(async () => {
  // Reduce motion: skip Lenis
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!prefersReduced) {
    const { default: Lenis } = await import('lenis')
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf2(time: number) {
      lenis?.raf(time)
      requestAnimationFrame(raf2)
    }
    requestAnimationFrame(raf2)

    // Expose lenis globally for ScrollTrigger integration
    ;(window as unknown as Record<string, unknown>).__lenis = lenis
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true })
  animateCursor()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(raf)
  lenis?.destroy()
})
</script>

<style>
/* ── Global resets & CSS custom properties ── */
:root {
  --color-gabi: #0b0f1a;
  --color-vega: #d4a853;
  --color-lupa: #3b2f25;
  --color-bigas: #f0ede6;
  --color-uling: #1e1e1e;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: auto; /* Lenis handles this */
}

body {
  background-color: var(--color-gabi);
  color: var(--color-bigas);
  font-family: 'Inter', system-ui, sans-serif;
  cursor: none;
  overflow-x: hidden;
}

/* Restore cursor on touch devices */
@media (hover: none) {
  body {
    cursor: auto;
  }
  .cursor-cross {
    display: none !important;
  }
}

/* Custom cursor: golden + (krus kudlit) */
.cursor-cross {
  position: fixed;
  top: 0;
  left: 0;
  width: 22px;
  height: 22px;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
}

.cursor-cross::before,
.cursor-cross::after {
  content: '';
  position: absolute;
  background-color: var(--color-vega);
  border-radius: 1px;
  transition: opacity 0.2s;
}

/* Vertical bar */
.cursor-cross::before {
  width: 2px;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

/* Horizontal bar */
.cursor-cross::after {
  width: 100%;
  height: 2px;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

/* Prefers reduced motion: show everything statically */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
