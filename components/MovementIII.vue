<template>
  <section id="movement-3" class="movement-3" ref="sectionEl">
    <div class="movement-3__inner">
      <!-- Letter-by-letter text reveal -->
      <div class="reveal-wrapper" ref="textEl" aria-label="Am-Fil is not fusion. It is what happens when you cook your grandmother's recipe with what this land gave you.">
        <span
          v-for="(char, i) in chars"
          :key="i"
          class="char"
          :ref="(el) => setCharRef(el, i)"
          aria-hidden="true"
        >{{ char === ' ' ? '\u00A0' : char }}</span>
      </div>

      <!-- Floating editorial images with parallax -->
      <div class="image-gallery" ref="galleryEl">
        <div class="editorial-image img-1" ref="img1El">
          <div class="img-placeholder">
            <span class="img-label">Chef Hands</span>
          </div>
        </div>
        <div class="editorial-image img-2" ref="img2El">
          <div class="img-placeholder">
            <span class="img-label">Ingredients</span>
          </div>
        </div>
        <div class="editorial-image img-3" ref="img3El">
          <div class="img-placeholder">
            <span class="img-label">Kitchen Scene</span>
          </div>
        </div>
        <div class="editorial-image img-4" ref="img4El">
          <div class="img-placeholder">
            <span class="img-label">The Table</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const sectionEl = ref<HTMLElement | null>(null)
const textEl = ref<HTMLElement | null>(null)
const galleryEl = ref<HTMLElement | null>(null)
const img1El = ref<HTMLElement | null>(null)
const img2El = ref<HTMLElement | null>(null)
const img3El = ref<HTMLElement | null>(null)
const img4El = ref<HTMLElement | null>(null)

const quote =
  "Am-Fil is not fusion. It is what happens when you cook your grandmother's recipe with what this land gave you."
const chars = computed(() => quote.split(''))

const charRefs: HTMLElement[] = []
function setCharRef(el: unknown, i: number) {
  if (el) charRefs[i] = el as HTMLElement
}

let ctx: import('gsap').Context | null = null

onMounted(async () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    charRefs.forEach((el) => {
      if (el) el.style.opacity = '1'
    })
    ;[galleryEl.value, img1El.value, img2El.value, img3El.value, img4El.value].forEach((el) => {
      if (el) el.style.opacity = '1'
    })
    return
  }

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    // Letter-by-letter reveal tied to scroll progress
    if (charRefs.length) {
      gsap.fromTo(
        charRefs,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.025,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textEl.value,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        },
      )
    }

    // Floating images cascade in with parallax depth
    const imgs = [img1El.value, img2El.value, img3El.value, img4El.value]
    const rotations = [-3, 2, -1.5, 5]
    const parallaxSpeeds = [-30, -50, -20, -60]

    gsap.fromTo(
      imgs,
      { opacity: 0, y: 60, rotate: (i: number) => rotations[i] },
      {
        opacity: 1,
        y: 0,
        rotate: (i: number) => rotations[i],
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: galleryEl.value,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    // Continuous parallax on each image at different speeds
    imgs.forEach((img, i) => {
      if (!img) return
      gsap.to(img, {
        y: parallaxSpeeds[i],
        ease: 'none',
        scrollTrigger: {
          trigger: galleryEl.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    })
  }, sectionEl.value!)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<style scoped>
.movement-3 {
  position: relative;
  min-height: 150vh;
  background: linear-gradient(
    to bottom,
    #18202e 0%,
    #28201a 50%,
    var(--color-lupa) 100%
  );
  padding: 12vh 6vw;
}

.movement-3__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14vh;
}

.reveal-wrapper {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.8rem, 4vw, 3.5rem);
  font-weight: 300;
  line-height: 1.5;
  color: var(--color-bigas);
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.char {
  display: inline;
  opacity: 0;
  transition: none;
}

.image-gallery {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.editorial-image {
  position: absolute;
  opacity: 0;
  will-change: transform;
}

.editorial-image:nth-child(1) {
  transform: rotate(-3deg) translate(-30%, 0);
  z-index: 4;
}
.editorial-image:nth-child(2) {
  transform: rotate(2deg) translate(10%, -10%);
  z-index: 3;
}
.editorial-image:nth-child(3) {
  transform: rotate(-1.5deg) translate(50%, 5%);
  z-index: 2;
}
.editorial-image:nth-child(4) {
  transform: rotate(5deg) translate(90%, -5%);
  z-index: 1;
}

@media (max-width: 767px) {
  .editorial-image:nth-child(1) { transform: rotate(-3deg) translate(-10%, 0); }
  .editorial-image:nth-child(2) { display: none; }
  .editorial-image:nth-child(3) { transform: rotate(-1.5deg) translate(10%, 5%); }
  .editorial-image:nth-child(4) { display: none; }
}

.img-placeholder {
  width: clamp(180px, 22vw, 300px);
  aspect-ratio: 3/4;
  background: rgba(240, 237, 230, 0.06);
  border: 1px solid rgba(240, 237, 230, 0.12);
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  transition: border-color 0.4s ease, background 0.4s ease;
}

.editorial-image:hover .img-placeholder {
  border-color: rgba(212, 168, 83, 0.3);
  background: rgba(240, 237, 230, 0.08);
}

.img-label {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(240, 237, 230, 0.3);
}

@media (max-width: 767px) {
  .movement-3 {
    padding: 8vh 5vw;
    min-height: auto;
  }
  .image-gallery {
    min-height: 280px;
  }
}
</style>
