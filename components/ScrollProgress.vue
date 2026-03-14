<template>
  <div class="scroll-progress" aria-hidden="true">
    <div class="progress-track">
      <div class="progress-fill" :style="{ height: progressPct + '%' }" />
      <div
        v-for="(movement, i) in movements"
        :key="i"
        class="progress-dot"
        :class="{ active: currentMovement >= i }"
        :style="{ top: movement.pct + '%' }"
        :title="movement.label"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progressPct = ref(0)
const currentMovement = ref(0)

const movements = [
  { pct: 0, label: 'The Gate' },
  { pct: 25, label: 'The Scattering' },
  { pct: 50, label: 'The Kitchen Transforms' },
  { pct: 75, label: 'One Kitchen' },
  { pct: 100, label: 'Your Seat' },
]

function onScroll() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  if (docHeight <= 0) return
  const pct = (scrollTop / docHeight) * 100
  progressPct.value = Math.min(100, pct)

  // Determine current movement
  const idx = movements.findIndex((m) => pct < m.pct + 18)
  currentMovement.value = idx === -1 ? movements.length - 1 : Math.max(0, idx - 1)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
}

.progress-track {
  position: relative;
  width: 1px;
  height: 160px;
  background: rgba(212, 168, 83, 0.2);
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--color-vega);
  transition: height 0.1s ease;
}

.progress-dot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(212, 168, 83, 0.3);
  border: 1px solid rgba(212, 168, 83, 0.5);
  transition: background 0.3s ease, border-color 0.3s ease;
}

.progress-dot.active {
  background: var(--color-vega);
  border-color: var(--color-vega);
  box-shadow: 0 0 6px rgba(212, 168, 83, 0.6);
}

@media (max-width: 767px) {
  .scroll-progress {
    display: none;
  }
}
</style>
