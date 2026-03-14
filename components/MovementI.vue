<template>
  <section id="movement-1" class="movement-1" ref="sectionEl">
    <!-- Canvas star field (desktop only) -->
    <StarField v-if="!isMobile" class="absolute inset-0" />

    <!-- Static star bg for mobile -->
    <div v-else class="static-stars" aria-hidden="true" />

    <!-- Ambient golden orb -->
    <div class="ambient-orb" ref="orbEl" aria-hidden="true" />

    <!-- Parallax content wrapper -->
    <div class="content" ref="contentEl">
      <h1 class="title" ref="titleEl">ISANG KUSINA</h1>
      <p class="subtitle" ref="subtitleEl">One Kitchen</p>
      <p class="date" ref="dateEl">May 22, 2026 &middot; Las Vegas</p>
      <button class="enter-btn" ref="btnEl" @click="scrollToMovementII">Enter Experience</button>
    </div>

    <!-- Scroll cue -->
    <div class="scroll-cue" ref="scrollCueEl" aria-hidden="true">
      <div class="scroll-line" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isMobile = ref(false)
const sectionEl = ref<HTMLElement | null>(null)
const contentEl = ref<HTMLElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)
const subtitleEl = ref<HTMLElement | null>(null)
const dateEl = ref<HTMLElement | null>(null)
const btnEl = ref<HTMLElement | null>(null)
const orbEl = ref<HTMLElement | null>(null)
const scrollCueEl = ref<HTMLElement | null>(null)

let ctx: import('gsap').Context | null = null

onMounted(async () => {
  isMobile.value = window.innerWidth < 768
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768
  })

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    ;[contentEl.value, scrollCueEl.value].forEach(el => {
      if (el) el.style.opacity = '1'
    })
    return
  }

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // Integrate with Lenis
  const lenis = (window as unknown as Record<string, unknown>).__lenis as { on: (event: string, cb: (e: unknown) => void) => void } | undefined
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.lagSmoothing(0)
  }

  ctx = gsap.context(() => {
    // Cinematic entrance: title scales from large, fades in
    const tl = gsap.timeline({ delay: 2.4 }) // after loading screen
    tl.fromTo(titleEl.value, { opacity: 0, scale: 1.3, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power3.out' })
      .fromTo(subtitleEl.value, { opacity: 0, y: 15 }, { opacity: 0.6, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .fromTo(dateEl.value, { opacity: 0, y: 10 }, { opacity: 0.4, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
      .fromTo(btnEl.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
      .fromTo(scrollCueEl.value, { opacity: 0 }, { opacity: 0.5, duration: 1 }, '-=0.4')

    // Parallax: content moves up slower than scroll, orb moves differently
    gsap.to(contentEl.value, {
      y: -80,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionEl.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    })

    // Orb parallax - moves slower creating depth
    gsap.to(orbEl.value, {
      y: -40,
      scale: 1.3,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionEl.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    })

    // Scroll cue fades out quickly
    gsap.to(scrollCueEl.value, {
      opacity: 0,
      scrollTrigger: {
        trigger: sectionEl.value,
        start: '5% top',
        end: '15% top',
        scrub: true,
      },
    })
  }, sectionEl.value!)
})

onUnmounted(() => {
  ctx?.revert()
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

.ambient-orb {
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 168, 83, 0.35) 0%, rgba(212, 168, 83, 0.08) 40%, transparent 70%);
  filter: blur(30px);
  animation: orbPulse 4s ease-in-out infinite;
  z-index: 5;
}

@keyframes orbPulse {
  0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.7; }
  50% { transform: translateX(-50%) scale(1.15); opacity: 1; }
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
  opacity: 0;
}

.subtitle {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  font-weight: 400;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: var(--color-bigas);
  opacity: 0;
  margin-top: 0.25rem;
}

.date {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.65rem, 1.2vw, 0.8rem);
  font-weight: 300;
  letter-spacing: 0.25em;
  color: var(--color-bigas);
  opacity: 0;
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
  opacity: 0;
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

.scroll-cue {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  z-index: 10;
}

.scroll-line {
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, transparent, var(--color-vega));
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(0.7); }
  50% { opacity: 0.8; transform: scaleY(1); }
}
</style>
