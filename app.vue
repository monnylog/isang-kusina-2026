<!-- prettier-ignore -->
<template>
  <div>
    <NuxtPage />
    <!-- Custom cursor: Istorya X mark -->
    <div
      ref="cursorEl"
      class="cursor-x"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0C50 0 58 38 100 50C58 62 50 100 50 100C50 100 42 62 0 50C42 38 50 0 50 0Z" fill="currentColor"/>
      </svg>
    </div>
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
let isHovering = false

function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY
}

function animateCursor() {
  curX += (mouseX - curX) * 0.15
  curY += (mouseY - curY) * 0.15
  if (cursorEl.value) {
    const scale = isHovering ? 1.6 : 1
    cursorEl.value.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%) scale(${scale})`
  }
  raf = requestAnimationFrame(animateCursor)
}

function onMouseEnterInteractive() { isHovering = true }
function onMouseLeaveInteractive() { isHovering = false }

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

  // Add hover detection on interactive elements
  document.querySelectorAll('a, button, [role="button"], .interactive').forEach(el => {
    el.addEventListener('mouseenter', onMouseEnterInteractive)
    el.addEventListener('mouseleave', onMouseLeaveInteractive)
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(raf)
  lenis?.destroy()
})
</script>

<style>
/* -- Global resets & CSS custom properties -- */
:root {
  --color-gabi: #0b0f1a;
  --color-vega: #d4a853;
  --color-lupa: #3b2f25;
  --color-bigas: #f0ede6;
  --color-uling: #1e1e1e;
  --color-istorya-orange: #e8692a;
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
  .cursor-x {
    display: none !important;
  }
}

/* Custom cursor: Istorya X mark (four-pointed star) */
.cursor-x {
  position: fixed;
  top: 0;
  left: 0;
  width: 28px;
  height: 28px;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  color: var(--color-vega);
  filter: drop-shadow(0 0 4px rgba(212, 168, 83, 0.4));
  mix-blend-mode: screen;
}

.cursor-x svg {
  width: 100%;
  height: 100%;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
              color 0.3s ease;
}

/* Hover state: enlarge + shift to orange */
.cursor-x:hover svg,
body:has(a:hover) .cursor-x svg,
body:has(button:hover) .cursor-x svg {
  color: var(--color-istorya-orange);
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
