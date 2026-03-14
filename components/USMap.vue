<template>
  <div class="us-map-container" aria-hidden="true">
    <svg
      ref="svgEl"
      viewBox="0 0 960 600"
      class="us-map-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- US coastline / silhouette (simplified path, no state borders) -->
      <path
        class="us-outline"
        d="M 180 80
           L 240 60 L 320 50 L 410 55 L 480 45 L 560 50 L 640 48 L 720 55
           L 790 65 L 840 80 L 870 100 L 890 130 L 900 165 L 895 200
           L 880 230 L 870 260 L 865 290 L 860 320 L 855 350 L 850 380
           L 840 410 L 820 435 L 790 450 L 760 455 L 730 450
           L 700 445 L 670 440 L 650 445 L 635 455 L 620 465
           L 600 470 L 575 468 L 555 460 L 540 450 L 520 445
           L 500 450 L 480 455 L 455 458 L 430 455 L 405 445
           L 380 435 L 355 420 L 330 408 L 305 400 L 280 395
           L 255 390 L 235 380 L 215 365 L 200 345 L 190 320
           L 180 295 L 172 265 L 168 235 L 165 205 L 165 175
           L 168 145 L 172 115 Z
           M 120 380 L 145 370 L 160 358 L 162 342 L 155 328
           L 140 320 L 125 325 L 112 338 L 108 354 L 112 368 Z
           M 800 490 L 840 480 L 870 470 L 890 460 L 895 448
           L 880 440 L 855 442 L 830 450 L 810 462 L 798 475 Z"
        fill="none"
        stroke="rgba(240,237,230,0.25)"
        stroke-width="1.5"
        stroke-linejoin="round"
      />

      <!-- Constellation lines (hidden initially, shown via GSAP) -->
      <g ref="linesGroup" class="constellation-lines">
        <line
          v-for="chef in chefs"
          :key="`line-${chef.id}`"
          :x1="chef.x"
          :y1="chef.y"
          :x2="lasVegas.x"
          :y2="lasVegas.y"
          stroke="#D4A853"
          stroke-width="0.8"
          stroke-dasharray="3 4"
          opacity="0"
          :ref="(el) => setLineRef(el, chef.id)"
        />
      </g>

      <!-- City dots -->
      <g ref="dotsGroup" class="city-dots">
        <!-- Las Vegas (convergence) -->
        <circle
          :cx="lasVegas.x"
          :cy="lasVegas.y"
          r="5"
          fill="#D4A853"
          class="vega-dot"
        />
        <circle
          :cx="lasVegas.x"
          :cy="lasVegas.y"
          r="10"
          fill="none"
          stroke="#D4A853"
          stroke-width="1"
          opacity="0.5"
          class="vega-ring"
        />

        <!-- Chef city dots -->
        <circle
          v-for="chef in chefs"
          :key="`dot-${chef.id}`"
          :cx="chef.x"
          :cy="chef.y"
          r="4"
          fill="#D4A853"
          opacity="0"
          :ref="(el) => setDotRef(el, chef.id)"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const svgEl = ref<SVGSVGElement | null>(null)
const linesGroup = ref<SVGGElement | null>(null)
const dotsGroup = ref<SVGGElement | null>(null)

const lasVegas = { x: 220, y: 248 }

const chefs = [
  { id: 1, x: 620, y: 390, city: 'New Orleans, LA' },   // New Orleans
  { id: 2, x: 105, y: 75,  city: 'Juneau, AK' },         // Juneau (Alaska inset-ish, top-left)
  { id: 3, x: 110, y: 305, city: 'Los Angeles, CA' },    // Los Angeles
  { id: 4, x: 110, y: 168, city: 'Seattle, WA' },        // Seattle
  { id: 5, x: 810, y: 240, city: 'Washington, DC' },     // DC
]

const lineRefs: Record<number, SVGLineElement> = {}
const dotRefs: Record<number, SVGCircleElement> = {}

function setLineRef(el: unknown, id: number) {
  if (el) lineRefs[id] = el as SVGLineElement
}
function setDotRef(el: unknown, id: number) {
  if (el) dotRefs[id] = el as SVGCircleElement
}

defineExpose({ chefs, lineRefs, dotRefs, svgEl })
</script>

<style scoped>
.us-map-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.us-map-svg {
  width: 100%;
  height: auto;
}

.vega-dot {
  filter: drop-shadow(0 0 8px rgba(212, 168, 83, 0.8));
}

.vega-ring {
  animation: vega-pulse 2s ease-in-out infinite;
}

@keyframes vega-pulse {
  0%, 100% { r: 8; opacity: 0.5; }
  50% { r: 14; opacity: 0.15; }
}
</style>
