<template>
  <button
    class="sound-toggle"
    :class="{ active: isPlaying }"
    :aria-label="isPlaying ? 'Mute ambient sound' : 'Play ambient sound'"
    @click="toggle"
  >
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
      <!-- Speaker body -->
      <path
        d="M11 5L6 9H2v6h4l5 4V5z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <!-- Sound waves (visible when active) -->
      <template v-if="isPlaying">
        <path
          d="M15.54 8.46a5 5 0 0 1 0 7.07"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M19 5a9 9 0 0 1 0 14"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </template>
      <!-- Mute X lines (visible when muted) -->
      <template v-else>
        <line x1="15" y1="9" x2="21" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        <line x1="21" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </template>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isPlaying = ref(false)
let sound: import('howler').Howl | null = null

async function initHowl() {
  if (sound) return
  try {
    const { Howl } = await import('howler')
    // Ambient tone placeholder — use a data URI silence or real audio URL
    sound = new Howl({
      src: ['/audio/ambient.mp3'],
      loop: true,
      volume: 0.35,
      html5: true,
    })
  } catch {
    // Howler unavailable (SSR)
  }
}

async function toggle() {
  await initHowl()
  if (!sound) return

  if (isPlaying.value) {
    sound.pause()
    isPlaying.value = false
  } else {
    sound.play()
    isPlaying.value = true
  }
}

onUnmounted(() => {
  sound?.stop()
  sound?.unload()
})
</script>

<style scoped>
.sound-toggle {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 200;
  background: transparent;
  border: 1px solid rgba(212, 168, 83, 0.35);
  color: rgba(212, 168, 83, 0.6);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease, background 0.3s ease;
}

.sound-toggle:hover,
.sound-toggle.active {
  color: var(--color-vega);
  border-color: var(--color-vega);
  background: rgba(212, 168, 83, 0.08);
}

.icon {
  width: 18px;
  height: 18px;
}
</style>
