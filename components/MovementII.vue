<template>
  <section id="movement-2" class="movement-2" ref="sectionEl">
    <div class="movement-2__inner">
      <!-- Opening text reveals -->
      <div class="text-block" ref="text1El">
        <p class="reveal-text large-text">
          We are exploring identity and migration<br class="hidden-mobile" />
          through the modern table.
        </p>
      </div>

      <div class="text-block" ref="text2El">
        <p class="reveal-text large-text">
          This year, we celebrate the intersection<br class="hidden-mobile" />
          of our origins and our future.
        </p>
      </div>

      <!-- Map + chef cards -->
      <div class="map-section" ref="mapSectionEl">
        <USMap ref="mapEl" />

        <!-- Chef cards -->
        <div class="chef-cards" ref="cardsEl">
          <div
            v-for="(chef, i) in chefs"
            :key="chef.id"
            class="chef-card"
            :ref="(el) => setCardRef(el, i)"
          >
            <h3 class="chef-name">{{ chef.name }}</h3>
            <p class="chef-location">{{ chef.city }} · {{ chef.region }}</p>
            <p class="chef-desc">{{ chef.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const sectionEl = ref<HTMLElement | null>(null)
const text1El = ref<HTMLElement | null>(null)
const text2El = ref<HTMLElement | null>(null)
const mapSectionEl = ref<HTMLElement | null>(null)
const cardsEl = ref<HTMLElement | null>(null)
const mapEl = ref<InstanceType<typeof import('./USMap.vue').default> | null>(null)

const cardRefs: HTMLElement[] = []
function setCardRef(el: unknown, i: number) {
  if (el) cardRefs[i] = el as HTMLElement
}

const chefs = [
  {
    id: 1,
    name: 'Christina Quackenbush',
    city: 'New Orleans, LA',
    region: 'Gulf South',
    description: 'The first Filipino restaurant in New Orleans',
  },
  {
    id: 2,
    name: 'Rachel Barril',
    city: 'Juneau, AK',
    region: 'Alaska',
    description: 'Chef de Cuisine, In Bocca al Lupo',
  },
  {
    id: 3,
    name: 'Lord Maynard Llera',
    city: 'Los Angeles, CA',
    region: 'California',
    description: 'James Beard Best Chef: California 2024',
  },
  {
    id: 4,
    name: 'Aaron Verzosa',
    city: 'Seattle, WA',
    region: 'Pacific NW',
    description: 'Eater Restaurant of the Year, James Beard nominee',
  },
  {
    id: 5,
    name: 'Patrice Cleary',
    city: 'Washington, DC',
    region: 'East Coast',
    description: 'Purple Patch, Filipino food on the national stage',
  },
]

let ctx: import('gsap').Context | null = null

onMounted(async () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    // Show everything statically
    ;[text1El.value, text2El.value, mapSectionEl.value].forEach((el) => {
      if (el) el.style.opacity = '1'
    })
    cardRefs.forEach((card) => {
      if (card) card.style.opacity = '1'
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
    // Text 1 reveal
    gsap.fromTo(
      text1El.value,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: text1El.value,
          start: 'top 80%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    // Text 2 reveal
    gsap.fromTo(
      text2El.value,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: text2El.value,
          start: 'top 80%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    // Map section fade-in
    gsap.fromTo(
      mapSectionEl.value,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: mapSectionEl.value,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    // Chef cards staggered reveal
    if (cardRefs.length) {
      gsap.fromTo(
        cardRefs,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsEl.value,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }

    // Animate constellation dot lines once map is in view
    const map = mapEl.value
    if (map) {
      const { lineRefs, dotRefs } = map as unknown as {
        lineRefs: Record<number, SVGLineElement>
        dotRefs: Record<number, SVGCircleElement>
      }
      const lineEls = Object.values(lineRefs)
      const dotEls = Object.values(dotRefs)

      gsap.fromTo(
        [...lineEls, ...dotEls],
        { opacity: 0 },
        {
          opacity: (i: number) => (i < lineEls.length ? 0.55 : 1),
          duration: 0.5,
          stagger: 0.12,
          scrollTrigger: {
            trigger: mapSectionEl.value,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }
  }, sectionEl.value!)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<style scoped>
.movement-2 {
  position: relative;
  min-height: 200vh;
  background: linear-gradient(
    to bottom,
    var(--color-gabi) 0%,
    #0f1525 40%,
    #141b2e 80%,
    #18202e 100%
  );
  padding: 10vh 6vw;
}

.movement-2__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12vh;
}

.text-block {
  opacity: 0;
  text-align: center;
}

.large-text {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.5rem, 3.5vw, 2.8rem);
  font-weight: 300;
  line-height: 1.5;
  color: var(--color-bigas);
  opacity: 0.9;
}

.map-section {
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.chef-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.chef-card {
  opacity: 0;
  border-left: 2px solid rgba(212, 168, 83, 0.4);
  padding: 1.2rem 1.2rem 1.2rem 1.5rem;
  transition: border-color 0.3s ease;
}

.chef-card:hover {
  border-color: var(--color-vega);
}

.chef-name {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  font-weight: 500;
  color: var(--color-bigas);
  margin-bottom: 0.4rem;
}

.chef-location {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-vega);
  margin-bottom: 0.6rem;
}

.chef-desc {
  font-family: 'Inter', system-ui, sans-serif;
  font-style: italic;
  font-size: 0.85rem;
  color: rgba(240, 237, 230, 0.6);
  line-height: 1.5;
}

@media (max-width: 767px) {
  .hidden-mobile {
    display: none;
  }
  .movement-2 {
    padding: 8vh 5vw;
    min-height: auto;
  }
}
</style>
