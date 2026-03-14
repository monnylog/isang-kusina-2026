<!-- prettier-ignore -->
<template>
  <div>
    <NuxtPage />
    <!-- Custom cursor: Istorya X mark (hand-drawn brand asset) -->
    <div
      ref="cursorEl"
      class="cursor-x"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 6C52 6 56 28 58 34C62 28 78 8 82 12C86 16 66 32 60 38C66 40 90 42 90 46C90 50 66 50 60 50C66 54 86 72 82 78C78 82 62 66 56 58C54 66 52 90 50 90C48 90 46 66 44 58C38 66 22 82 18 78C14 72 34 54 40 50C34 50 10 50 10 46C10 42 34 40 40 38C34 32 14 16 18 12C22 8 38 28 42 34C44 28 48 6 50 6Z" fill="currentColor"/>
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

function onMouseEnterInteractive() {
  isHovering = true
  cursorEl.value?.classList.add('hovering')
}
function onMouseLeaveInteractive() {
  isHovering = false
  cursorEl.value?.classList.remove('hovering')
}

function animate() {
  const ease = 0.15
  curX += (mouseX - curX) * ease
  curY += (mouseY - curY) * ease
  if (cursorEl.value) {
    cursorEl.value.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%) rotate(${isHovering ? '45deg' : '0deg'})`
  }
  raf = requestAnimationFrame(animate)
}

onMounted(() => {
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', onMouseMove)
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive)
      el.addEventListener('mouseleave', onMouseLeaveInteractive)
    })
    animate()
  }
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
  document.removeEventListener('mousemove', onMouseMove)
})
</script>

<style>
/* Istorya X cursor — hand-drawn brand mark */
* { cursor: none !important; }

.cursor-x {
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  pointer-events: none;
  z-index: 9999;
  color: #E8734A;
  filter: drop-shadow(0 0 6px rgba(232, 115, 74, 0.4));
  transition: color 0.3s ease, filter 0.3s ease, width 0.3s ease, height 0.3s ease;
  will-change: transform;
}

.cursor-x.hovering {
  width: 48px;
  height: 48px;
  color: #D4A853;
  filter: drop-shadow(0 0 12px rgba(212, 168, 83, 0.6));
}

.cursor-x svg {
  width: 100%;
  height: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .cursor-x { display: none; }
  * { cursor: auto !important; }
}

@media (pointer: coarse) {
  .cursor-x { display: none; }
  * { cursor: auto !important; }
}
</style>
