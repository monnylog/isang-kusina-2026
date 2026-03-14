<template>
  <section id="movement-1" class="movement-1">
    <!-- Canvas star field (desktop only) -->
    <StarField v-if="!isMobile" class="absolute inset-0" />

    <!-- Static star bg for mobile -->
    <div v-else class="static-stars" aria-hidden="true" />

    <div class="content">
      <h1 class="title">ISANG KUSINA</h1>
      <p class="subtitle">One Kitchen</p>
      <p class="date">May 22, 2026 · Las Vegas</p>
      <button class="enter-btn" @click="scrollToMovementII">Enter Experience</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isMobile = ref(false)

onMounted(() => {
  isMobile.value = window.innerWidth < 768
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768
  })
})

function scrollToMovementII() {
  const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (target: string | number, opts?: Record<string, unknown>) => void } | undefined
  const target = document.getElementById('movement-2')
  if (lenis && target) {
    lenis.scrollTo(target, { duration: 1.8 })
  } else if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.movement-1 {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: var(--color-gabi);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.static-stars {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 20% 30%, rgba(255, 255, 255, 0.6) 0%, transparent 0%),
    radial-gradient(1px 1px at 80% 10%, rgba(255, 255, 255, 0.5) 0%, transparent 0%),
    radial-gradient(1.5px 1.5px at 50% 18%, rgba(212, 168, 83, 0.9) 0%, transparent 0%),
    radial-gradient(1px 1px at 35% 55%, rgba(255, 255, 255, 0.4) 0%, transparent 0%),
    radial-gradient(1px 1px at 65% 70%, rgba(255, 255, 255, 0.5) 0%, transparent 0%),
    radial-gradient(1px 1px at 10% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 0%),
    radial-gradient(1px 1px at 90% 60%, rgba(255, 255, 255, 0.4) 0%, transparent 0%);
}

.content {
  position: relative;
  z-index: 10;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 300;
  letter-spacing: 0.12em;
  color: var(--color-bigas);
  line-height: 1;
  text-shadow: 0 0 60px rgba(212, 168, 83, 0.15);
}

.subtitle {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  font-weight: 400;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: var(--color-bigas);
  opacity: 0.6;
  margin-top: 0.25rem;
}

.date {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.65rem, 1.2vw, 0.8rem);
  font-weight: 300;
  letter-spacing: 0.25em;
  color: var(--color-bigas);
  opacity: 0.4;
}

.enter-btn {
  margin-top: 2rem;
  padding: 0.85rem 2.2rem;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-vega);
  background: transparent;
  border: 1px solid var(--color-vega);
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  position: relative;
  overflow: hidden;
}

.enter-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-vega);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s ease;
}

.enter-btn:hover::before {
  transform: scaleX(1);
}

.enter-btn:hover {
  color: var(--color-gabi);
}

.enter-btn span {
  position: relative;
  z-index: 1;
}
</style>
