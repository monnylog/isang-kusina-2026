<template>
  <section id="movement-5" class="movement-5" ref="sectionEl">
    <div class="movement-5__inner">
      <!-- Vega star glow -->
      <div class="vega-star" ref="vegaEl" aria-hidden="true">
        <div class="vega-core" />
        <div class="vega-ring" />
      </div>

      <!-- Closing letter -->
      <div class="letter-wrapper" ref="letterEl">
        <p class="letter-text">
          Many of you were here before the residency. Before the logo. Some of you were here before we knew what to call it.
        </p>
        <p class="letter-text">
          Dinners like this bring us closer to where we are headed: a table where Filipino food leads the conversation.
        </p>
        <p class="letter-text">
          Vega has been leading people home longer than any other star. It gave this city its name.
        </p>
        <p class="letter-text">
          Let it lead you back. The stories travel better when you carry them.
        </p>
        <p class="letter-sig">Salamat,</p>
        <p class="letter-sig">Walbert + Monica</p>
      </div>

      <!-- CTA -->
      <div class="cta-wrapper" ref="ctaEl">
        <a href="#" class="reserve-btn">Reserve Your Seat</a>
      </div>
    </div>

    <!-- Marquee footer -->
    <footer class="footer-marquee" aria-label="Isang Kusina footer">
      <div class="marquee-track" aria-hidden="true">
        <span v-for="n in 8" :key="n" class="marquee-item">ISANG KUSINA</span>
      </div>
      <p class="credit">An Istorya Experience &middot; 2026</p>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const sectionEl = ref<HTMLElement | null>(null)
const letterEl = ref<HTMLElement | null>(null)
const ctaEl = ref<HTMLElement | null>(null)
const vegaEl = ref<HTMLElement | null>(null)

let ctx: import('gsap').Context | null = null

onMounted(async () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    ;[letterEl.value, ctaEl.value, vegaEl.value].forEach((el) => {
      if (el) el.style.opacity = '1'
    })
    return
  }

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    // Vega star scales in and glows
    gsap.fromTo(
      vegaEl.value,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionEl.value,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    // Letter paragraphs stagger in
    const paragraphs = letterEl.value?.querySelectorAll('.letter-text, .letter-sig')
    if (paragraphs?.length) {
      gsap.fromTo(
        Array.from(paragraphs),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: letterEl.value,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }

    // CTA button rises with a slight scale
    gsap.fromTo(
      ctaEl.value,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaEl.value,
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
.movement-5 {
  min-height: 100vh;
  background-color: var(--color-bigas);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12vh 6vw 0;
}

.movement-5__inner {
  max-width: 680px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vh;
  flex: 1;
  padding-bottom: 8vh;
}

/* Vega star visual */
.vega-star {
  position: relative;
  width: 60px;
  height: 60px;
  opacity: 0;
  margin-bottom: 2rem;
}

.vega-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-vega, #D4A853);
  box-shadow: 0 0 20px rgba(212, 168, 83, 0.6), 0 0 40px rgba(212, 168, 83, 0.3);
}

.vega-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(212, 168, 83, 0.2);
  animation: vegaPulse 3s ease-in-out infinite;
}

@keyframes vegaPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
  50% { transform: translate(-50%, -50%) scale(1.4); opacity: 0.1; }
}

.letter-wrapper {
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
}

.letter-text {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-size: clamp(1.1rem, 2.2vw, 1.5rem);
  font-weight: 300;
  line-height: 1.75;
  color: var(--color-lupa);
  opacity: 0;
}

.letter-sig {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-size: clamp(1rem, 1.8vw, 1.3rem);
  font-weight: 400;
  color: var(--color-lupa);
  opacity: 0;
}

.cta-wrapper {
  opacity: 0;
}

.reserve-btn {
  display: inline-block;
  padding: 1rem 3rem;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-bigas);
  background-color: var(--color-vega);
  border: 1px solid var(--color-vega);
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.reserve-btn:hover {
  background-color: transparent;
  color: var(--color-vega);
  box-shadow: 0 0 30px rgba(212, 168, 83, 0.2);
}

/* Marquee footer */
.footer-marquee {
  background-color: var(--color-uling);
  overflow: hidden;
  padding: 1.5rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1.2rem;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 18s linear infinite;
  gap: 4rem;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}

@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.marquee-item {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  font-weight: 400;
  letter-spacing: 0.55em;
  text-transform: uppercase;
  color: var(--color-vega);
  white-space: nowrap;
  flex-shrink: 0;
}

.credit {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(212, 168, 83, 0.4);
}

@media (max-width: 767px) {
  .movement-5 {
    padding: 8vh 5vw 0;
  }
}
</style>
