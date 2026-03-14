import { defineComponent, ref, mergeProps, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "SoundToggle",
  __ssrInlineRender: true,
  setup(__props) {
    const isPlaying = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["sound-toggle", { active: isPlaying.value }],
        "aria-label": isPlaying.value ? "Mute ambient sound" : "Play ambient sound"
      }, _attrs))} data-v-fb5012c5><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon" data-v-fb5012c5><path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" data-v-fb5012c5></path>`);
      if (isPlaying.value) {
        _push(`<!--[--><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-v-fb5012c5></path><path d="M19 5a9 9 0 0 1 0 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-v-fb5012c5></path><!--]-->`);
      } else {
        _push(`<!--[--><line x1="15" y1="9" x2="21" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-v-fb5012c5></line><line x1="21" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-v-fb5012c5></line><!--]-->`);
      }
      _push(`</svg></button>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SoundToggle.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-fb5012c5"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "StarField",
  __ssrInlineRender: true,
  setup(__props) {
    const canvasEl = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<canvas${ssrRenderAttrs(mergeProps({
        ref_key: "canvasEl",
        ref: canvasEl,
        class: "star-canvas",
        "aria-hidden": "true"
      }, _attrs))} data-v-dda20b53></canvas>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StarField.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-dda20b53"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "MovementI",
  __ssrInlineRender: true,
  setup(__props) {
    const isMobile = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StarField = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "movement-1",
        class: "movement-1"
      }, _attrs))} data-v-b075085b>`);
      if (!isMobile.value) {
        _push(ssrRenderComponent(_component_StarField, { class: "absolute inset-0" }, null, _parent));
      } else {
        _push(`<div class="static-stars" aria-hidden="true" data-v-b075085b></div>`);
      }
      _push(`<div class="content" data-v-b075085b><h1 class="title" data-v-b075085b>ISANG KUSINA</h1><p class="subtitle" data-v-b075085b>One Kitchen</p><p class="date" data-v-b075085b>May 22, 2026 \xB7 Las Vegas</p><button class="enter-btn" data-v-b075085b>Enter Experience</button></div></section>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MovementI.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-b075085b"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "USMap",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const svgEl = ref(null);
    ref(null);
    ref(null);
    const lasVegas = { x: 220, y: 248 };
    const chefs = [
      { id: 1, x: 620, y: 390, city: "New Orleans, LA" },
      // New Orleans
      { id: 2, x: 105, y: 75, city: "Juneau, AK" },
      // Juneau (Alaska inset-ish, top-left)
      { id: 3, x: 110, y: 305, city: "Los Angeles, CA" },
      // Los Angeles
      { id: 4, x: 110, y: 168, city: "Seattle, WA" },
      // Seattle
      { id: 5, x: 810, y: 240, city: "Washington, DC" }
      // DC
    ];
    const lineRefs = {};
    const dotRefs = {};
    __expose({ chefs, lineRefs, dotRefs, svgEl });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "us-map-container",
        "aria-hidden": "true"
      }, _attrs))} data-v-ab3d4c34><svg viewBox="0 0 960 600" class="us-map-svg" xmlns="http://www.w3.org/2000/svg" data-v-ab3d4c34><path class="us-outline" d="M 180 80
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
           L 880 440 L 855 442 L 830 450 L 810 462 L 798 475 Z" fill="none" stroke="rgba(240,237,230,0.25)" stroke-width="1.5" stroke-linejoin="round" data-v-ab3d4c34></path><g class="constellation-lines" data-v-ab3d4c34><!--[-->`);
      ssrRenderList(chefs, (chef) => {
        _push(`<line${ssrRenderAttr("x1", chef.x)}${ssrRenderAttr("y1", chef.y)}${ssrRenderAttr("x2", lasVegas.x)}${ssrRenderAttr("y2", lasVegas.y)} stroke="#D4A853" stroke-width="0.8" stroke-dasharray="3 4" opacity="0" data-v-ab3d4c34></line>`);
      });
      _push(`<!--]--></g><g class="city-dots" data-v-ab3d4c34><circle${ssrRenderAttr("cx", lasVegas.x)}${ssrRenderAttr("cy", lasVegas.y)} r="5" fill="#D4A853" class="vega-dot" data-v-ab3d4c34></circle><circle${ssrRenderAttr("cx", lasVegas.x)}${ssrRenderAttr("cy", lasVegas.y)} r="10" fill="none" stroke="#D4A853" stroke-width="1" opacity="0.5" class="vega-ring" data-v-ab3d4c34></circle><!--[-->`);
      ssrRenderList(chefs, (chef) => {
        _push(`<circle${ssrRenderAttr("cx", chef.x)}${ssrRenderAttr("cy", chef.y)} r="4" fill="#D4A853" opacity="0" data-v-ab3d4c34></circle>`);
      });
      _push(`<!--]--></g></svg></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/USMap.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-ab3d4c34"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "MovementII",
  __ssrInlineRender: true,
  setup(__props) {
    const sectionEl = ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    const mapEl = ref(null);
    const chefs = [
      {
        id: 1,
        name: "Christina Quackenbush",
        city: "New Orleans, LA",
        region: "Gulf South",
        description: "The first Filipino restaurant in New Orleans"
      },
      {
        id: 2,
        name: "Rachel Barril",
        city: "Juneau, AK",
        region: "Alaska",
        description: "Chef de Cuisine, In Bocca al Lupo"
      },
      {
        id: 3,
        name: "Lord Maynard Llera",
        city: "Los Angeles, CA",
        region: "California",
        description: "James Beard Best Chef: California 2024"
      },
      {
        id: 4,
        name: "Aaron Verzosa",
        city: "Seattle, WA",
        region: "Pacific NW",
        description: "Eater Restaurant of the Year, James Beard nominee"
      },
      {
        id: 5,
        name: "Patrice Cleary",
        city: "Washington, DC",
        region: "East Coast",
        description: "Purple Patch, Filipino food on the national stage"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USMap = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "movement-2",
        class: "movement-2",
        ref_key: "sectionEl",
        ref: sectionEl
      }, _attrs))} data-v-e2c27cb0><div class="movement-2__inner" data-v-e2c27cb0><div class="text-block" data-v-e2c27cb0><p class="reveal-text large-text" data-v-e2c27cb0> We are exploring identity and migration<br class="hidden-mobile" data-v-e2c27cb0> through the modern table. </p></div><div class="text-block" data-v-e2c27cb0><p class="reveal-text large-text" data-v-e2c27cb0> This year, we celebrate the intersection<br class="hidden-mobile" data-v-e2c27cb0> of our origins and our future. </p></div><div class="map-section" data-v-e2c27cb0>`);
      _push(ssrRenderComponent(_component_USMap, {
        ref_key: "mapEl",
        ref: mapEl
      }, null, _parent));
      _push(`<div class="chef-cards" data-v-e2c27cb0><!--[-->`);
      ssrRenderList(chefs, (chef, i) => {
        _push(`<div class="chef-card" data-v-e2c27cb0><h3 class="chef-name" data-v-e2c27cb0>${ssrInterpolate(chef.name)}</h3><p class="chef-location" data-v-e2c27cb0>${ssrInterpolate(chef.city)} \xB7 ${ssrInterpolate(chef.region)}</p><p class="chef-desc" data-v-e2c27cb0>${ssrInterpolate(chef.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MovementII.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-e2c27cb0"]]);
const quote = "Am-Fil is not fusion. It is what happens when you cook your grandmother's recipe with what this land gave you.";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MovementIII",
  __ssrInlineRender: true,
  setup(__props) {
    const sectionEl = ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    const chars = computed(() => quote.split(""));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "movement-3",
        class: "movement-3",
        ref_key: "sectionEl",
        ref: sectionEl
      }, _attrs))} data-v-6872af54><div class="movement-3__inner" data-v-6872af54><div class="reveal-wrapper" aria-label="Am-Fil is not fusion. It is what happens when you cook your grandmother&#39;s recipe with what this land gave you." data-v-6872af54><!--[-->`);
      ssrRenderList(chars.value, (char, i) => {
        _push(`<span class="char" aria-hidden="true" data-v-6872af54>${ssrInterpolate(char === " " ? "\xA0" : char)}</span>`);
      });
      _push(`<!--]--></div><div class="image-gallery" data-v-6872af54><div class="editorial-image img-1" data-v-6872af54><div class="img-placeholder" data-v-6872af54><span class="img-label" data-v-6872af54>Chef Hands</span></div></div><div class="editorial-image img-2" data-v-6872af54><div class="img-placeholder" data-v-6872af54><span class="img-label" data-v-6872af54>Ingredients</span></div></div><div class="editorial-image img-3" data-v-6872af54><div class="img-placeholder" data-v-6872af54><span class="img-label" data-v-6872af54>Kitchen Scene</span></div></div><div class="editorial-image img-4" data-v-6872af54><div class="img-placeholder" data-v-6872af54><span class="img-label" data-v-6872af54>The Table</span></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MovementIII.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-6872af54"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MovementIV",
  __ssrInlineRender: true,
  setup(__props) {
    const sectionEl = ref(null);
    ref(null);
    ref(null);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "movement-4",
        class: "movement-4",
        ref_key: "sectionEl",
        ref: sectionEl
      }, _attrs))} data-v-134b5ba6><div class="movement-4__inner" data-v-134b5ba6><div class="convergence" aria-hidden="true" data-v-134b5ba6><svg viewBox="0 0 300 200" class="convergence-svg" data-v-134b5ba6><line x1="20" y1="20" x2="150" y2="100" stroke="#D4A853" stroke-width="0.8" stroke-dasharray="3 4" opacity="0.5" data-v-134b5ba6></line><line x1="280" y1="20" x2="150" y2="100" stroke="#D4A853" stroke-width="0.8" stroke-dasharray="3 4" opacity="0.5" data-v-134b5ba6></line><line x1="20" y1="180" x2="150" y2="100" stroke="#D4A853" stroke-width="0.8" stroke-dasharray="3 4" opacity="0.5" data-v-134b5ba6></line><line x1="280" y1="180" x2="150" y2="100" stroke="#D4A853" stroke-width="0.8" stroke-dasharray="3 4" opacity="0.5" data-v-134b5ba6></line><line x1="150" y1="10" x2="150" y2="100" stroke="#D4A853" stroke-width="0.8" stroke-dasharray="3 4" opacity="0.5" data-v-134b5ba6></line><circle cx="150" cy="100" r="5" fill="#D4A853" data-v-134b5ba6></circle><circle cx="150" cy="100" r="12" fill="none" stroke="#D4A853" stroke-width="1" opacity="0.3" class="pulse-ring" data-v-134b5ba6></circle></svg></div><div class="wordmark" data-v-134b5ba6><p class="istorya-label" data-v-134b5ba6>ISTORYA</p><div class="wordmark-line" data-v-134b5ba6></div></div><div class="details-card" data-v-134b5ba6><div class="card-gold-top" data-v-134b5ba6></div><div class="card-content" data-v-134b5ba6><p class="card-date" data-v-134b5ba6>May 22, 2026</p><p class="card-venue" data-v-134b5ba6>Keep Memory Alive Event Center</p><p class="card-location" data-v-134b5ba6>Las Vegas, Nevada</p><p class="card-desc" data-v-134b5ba6> A collaborative dinner celebrating Filipino-American cuisine across U.S. generations and geographies. </p></div></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MovementIV.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-134b5ba6"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MovementV",
  __ssrInlineRender: true,
  setup(__props) {
    const sectionEl = ref(null);
    ref(null);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "movement-5",
        class: "movement-5",
        ref_key: "sectionEl",
        ref: sectionEl
      }, _attrs))} data-v-9990e467><div class="movement-5__inner" data-v-9990e467><div class="letter-wrapper" data-v-9990e467><p class="letter-text" data-v-9990e467> Many of you were here before the residency. Before the logo. Some of you were here before we knew what to call it. </p><p class="letter-text" data-v-9990e467> Dinners like this bring us closer to where we are headed: a table where Filipino food leads the conversation. </p><p class="letter-text" data-v-9990e467> Vega has been leading people home longer than any other star. It gave this city its name. </p><p class="letter-text" data-v-9990e467> Let it lead you back. The stories travel better when you carry them. </p><p class="letter-sig" data-v-9990e467>Salamat,</p><p class="letter-sig" data-v-9990e467>Walbert + Monica</p></div><div class="cta-wrapper" data-v-9990e467><a href="#" class="reserve-btn" data-v-9990e467>Reserve Your Seat</a></div></div><footer class="footer-marquee" aria-label="Isang Kusina footer" data-v-9990e467><div class="marquee-track" aria-hidden="true" data-v-9990e467><!--[-->`);
      ssrRenderList(8, (n) => {
        _push(`<span class="marquee-item" data-v-9990e467>ISANG KUSINA</span>`);
      });
      _push(`<!--]--></div><p class="credit" data-v-9990e467>An Istorya Experience \xB7 2026</p></footer></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MovementV.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-9990e467"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SoundToggle = __nuxt_component_0$2;
      const _component_MovementI = __nuxt_component_1;
      const _component_MovementII = __nuxt_component_2;
      const _component_MovementIII = __nuxt_component_3;
      const _component_MovementIV = __nuxt_component_4;
      const _component_MovementV = __nuxt_component_5;
      _push(`<main${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_SoundToggle, null, null, _parent));
      _push(ssrRenderComponent(_component_MovementI, null, null, _parent));
      _push(ssrRenderComponent(_component_MovementII, null, null, _parent));
      _push(ssrRenderComponent(_component_MovementIII, null, null, _parent));
      _push(ssrRenderComponent(_component_MovementIV, null, null, _parent));
      _push(ssrRenderComponent(_component_MovementV, null, null, _parent));
      _push(`</main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-w3XNwHME.mjs.map
