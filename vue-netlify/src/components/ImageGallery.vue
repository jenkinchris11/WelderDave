<script setup>
const imageModules = import.meta.glob('../assets/*.jpg', {
  eager: true,
  import: 'default',
});

const galleryImages = Object.keys(imageModules)
  .sort()
  .map((path, index) => ({
    src: imageModules[path],
    alt: `WelderDave fabrication photo ${index + 1}`,
  }));
</script>

<template>
  <section class="gallery">
    <header class="gallery__header">
      <p class="eyebrow">Swipe Gallery</p>
      <h3>See everything WelderDave can fabricate</h3>
      <p>
        Explore high-resolution shots of mobile welding repairs, ornate gates, and
        heavy-duty fabrication. Swipe or drag through the gallery to view every project image.
      </p>
    </header>

    <div class="gallery__viewport" aria-label="Swipeable gallery of WelderDave projects">
      <div class="gallery__track">
        <figure v-for="(image, index) in galleryImages" :key="image.src" class="gallery__item">
          <img :src="image.src" :alt="image.alt" loading="lazy" />
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  background: white;
  border-radius: 1.5rem;
  padding: 2.25rem 1.5rem 2.75rem;
  box-shadow: 0 35px 70px -45px rgba(15, 23, 42, 0.45);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.gallery__header {
  max-width: 720px;
}

.gallery__header h3 {
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  margin: 0.5rem 0;
}

.gallery__header p:last-of-type {
  color: #475569;
  line-height: 1.6;
}

.eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-weight: 600;
  color: #94a3b8;
}

.gallery__viewport {
  overflow: hidden;
  position: relative;
}

.gallery__track {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 0.75rem;
}

.gallery__track::-webkit-scrollbar {
  height: 10px;
}

.gallery__track::-webkit-scrollbar-thumb {
  background: #cbd5f5;
  border-radius: 999px;
}

.gallery__item {
  flex: 0 0 82%;
  scroll-snap-align: center;
  border-radius: 1.25rem;
  overflow: hidden;
  position: relative;
  background: #0f172a;
}

@media (min-width: 768px) {
  .gallery__item {
    flex-basis: 45%;
  }
}

.gallery__item img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
}

@media (min-width: 1024px) {
  .gallery__item img {
    height: 380px;
  }
}

.gallery__item figcaption {
  position: absolute;
  bottom: 0.75rem;
  right: 1rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.8);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
}
</style>
