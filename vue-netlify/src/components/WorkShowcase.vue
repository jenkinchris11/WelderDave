<script setup>
import chassisPlate from '../assets/96ad6630-5d28-4e57-9e7c-bc64c1b0b1b8.jpg';
import alloyPanel from '../assets/4672dbe3-a616-4da6-8357-3fabaa77162f.jpg';
import gateFabrication from '../assets/5846f633-ff05-4457-805f-18831ac963dc.jpg';
import archRepair from '../assets/18f6ca49-5b31-4d6b-9df9-ace328f96b38.jpg';
import bikeFrame from '../assets/733192c6-5392-4c2b-8567-f2876e3d6a32.jpg';
import mobileRig from '../assets/b61506ee-2109-4e6e-862a-40031732f650.jpg';

const gallery = [
  {
    src: chassisPlate
  },
  {
    src: alloyPanel
  },
  {
    src: gateFabrication
  },
  {
    src: archRepair
  }
];
</script>

<template>
  <section class="work">
    <h3>Hand-finished welding you can trust</h3>
    <div class="work__grid">
      <figure v-for="item in gallery" :key="item.src">
        <img :src="item.src" :alt="item.alt" loading="lazy" />
      </figure>
    </div>
  </section>
</template>

<style scoped>
.work {
  background-color: #eef2ff;
  padding: 2.5rem 1.75rem;
  border-radius: 1.75rem;
  box-shadow: inset 0 0 0 1px rgba(79, 70, 229, 0.08);
}

.eyebrow {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #4338ca;
}

h3 {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  margin-top: 0.75rem;
}

.lede {
  margin: 1rem 0 2rem;
  max-width: 60ch;
  color: #475569;
}

.work__grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .work__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

figure {
  background-color: white;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0 20px 40px -30px rgba(15, 23, 42, 0.45);
  border: 1px solid rgba(15, 23, 42, 0.05);
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: stretch;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

figcaption {
  padding: 0.85rem 1rem;
  font-weight: 600;
  color: #1e293b;
}
</style>
