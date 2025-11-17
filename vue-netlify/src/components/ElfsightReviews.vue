<script setup>
import { onMounted } from 'vue';

const SCRIPT_ID = 'elfsight-platform-script';
const SCRIPT_SRC = 'https://elfsightcdn.com/platform.js';

const initWidget = () => {
  if (window.ElfsightApp && typeof window.ElfsightApp.init === 'function') {
    window.ElfsightApp.init();
  }
};

onMounted(() => {
  if (!document.getElementById(SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.addEventListener('load', initWidget);
    document.body.appendChild(script);
  } else {
    initWidget();
  }
});
</script>

<template>
  <section class="elfsight-reviews" aria-label="Customer reviews">
    <p class="elfsight-reviews__eyebrow">What our customers say</p>
    <div class="elfsight-app-a33493ab-df09-4d86-93b5-c0f3a97e6656" data-elfsight-app-lazy></div>
  </section>
</template>

<style scoped>
.elfsight-reviews {
  width: min(1100px, 100%);
  margin: 0 auto;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  background: white;
  border-radius: 1.25rem;
  box-shadow: 0 35px 65px -45px rgba(15, 23, 42, 0.4);
}

.elfsight-reviews__eyebrow {
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 600;
  font-size: 0.85rem;
  color: #ff761a;
  text-align: center;
}
.a{
  display: none;
}
:deep(a[href^="https://elfsight.com/google-reviews-widget"]) {
  display: none !important;
}
</style>
