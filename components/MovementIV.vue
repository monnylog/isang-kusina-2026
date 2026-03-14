<template>
  <section id="movement-4" class="movement-4" ref="sectionEl">
    <div class="movement-4__inner">
      <!-- Converging constellation visual -->
      <div class="convergence" ref="convergenceEl" aria-hidden="true">
        <svg viewBox="0 0 300 200" class="convergence-svg">
          <line x1="20" y1="20" x2="150" y2="100" stroke="#D4A853" stroke-width="0.8" stroke-dasharray="3 4" opacity="0.5" />
          <line x1="280" y1="20" x2="150" y2="100" stroke="#D4A853" stroke-width="0.8" stroke-dasharray="3 4" opacity="0.5" />
          <line x1="20" y1="180" x2="150" y2="100" stroke="#D4A853" stroke-width="0.8" stroke-dasharray="3 4" opacity="0.5" />
          <line x1="280" y1="180" x2="150" y2="100" stroke="#D4A853" stroke-width="0.8" stroke-dasharray="3 4" opacity="0.5" />
          <line x1="150" y1="10" x2="150" y2="100" stroke="#D4A853" stroke-width="0.8" stroke-dasharray="3 4" opacity="0.5" />
          <!-- Center dot -->
          <circle cx="150" cy="100" r="5" fill="#D4A853" />
          <circle cx="150" cy="100" r="12" fill="none" stroke="#D4A853" stroke-width="1" opacity="0.3" class="pulse-ring" />
        </svg>
      </div>

      <!-- Istorya wordmark -->
      <div class="wordmark" ref="wordmarkEl">
        <p class="istorya-label">ISTORYA</p>
        <div class="wordmark-line" />
      </div>

      <!-- Event details card -->
      <div class="details-card" ref="cardEl">
        <div class="card-gold-top" />
        <div class="card-content">
          <p class="card-date">May 22, 2026</p>
          <p class="card-venue">Keep Memory Alive Event Center</p>
          <p class="card-location">Las Vegas, Nevada</p>
          <p class="card-desc">
            A collaborative dinner celebrating Filipino-American cuisine across U.S. generations and geographies.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const sectionEl = ref<HTMLElement | null>(null)
const convergenceEl = ref<HTMLElement | null>(null)
const wordmarkEl = ref<HTMLElement | null>(null)
const cardEl = ref<HTMLElement | null>(null)

let ctx: import('gsap').Context | null = null

onMounted(async () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    ;[convergenceEl.value, wordmarkEl.value, cardEl.value].forEach((el) => {
      if (el) el.style.opacity = '1'
    })
    return
  }

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    gsap.fromTo(
      convergenceEl.value,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: convergenceEl.value,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    gsap.fromTo(
      wordmarkEl.value,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: wordmarkEl.value,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    gsap.fromTo(
      cardEl.value,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: cardEl.value,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    )
  }, sectionEl.value!)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<style scoped>
.movement-4 {
  min-height: 100vh;
  background: linear-gradient(to bottom, var(--color-lupa), #5a4535 30%, var(--color-bigas));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10vh 6vw;
}

.movement-4__inner {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vh;
}

.convergence {
  opacity: 0;
  width: 200px;
}

.convergence-svg {
  width: 100%;
  height: auto;
}

.pulse-ring {
  animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { r: 10; opacity: 0.3; }
  50% { r: 18; opacity: 0.08; }
}

.wordmark {
  opacity: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.istorya-label {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 400;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: var(--color-lupa);
}

.wordmark-line {
  width: 60px;
  height: 1px;
  background: var(--color-vega);
}

.details-card {
  opacity: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
}

.card-gold-top {
  height: 2px;
  background: var(--color-vega);
}

.card-content {
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.card-date {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--color-vega);
}

.card-venue {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 500;
  color: var(--color-lupa);
}

.card-location {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  color: rgba(59, 47, 37, 0.7);
}

.card-desc {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(59, 47, 37, 0.8);
  margin-top: 0.5rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(59, 47, 37, 0.15);
}

@media (max-width: 767px) {
  .movement-4 {
    padding: 8vh 5vw;
  }
  .card-content {
    padding: 1.5rem;
  }
}
</style>
