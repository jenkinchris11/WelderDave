<script setup>
import { ref, watch } from 'vue';

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

const selectedImage = ref(null);

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    selectedImage.value = null;
  }
};

watch(
  selectedImage,
  (image) => {
    if (image) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeydown);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeydown);
    }
  },
  { immediate: true }
);
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
          <button
            type="button"
            class="gallery__button"
            @click="selectedImage = image"
            aria-label="View larger image"
          >
            <img :src="image.src" :alt="image.alt" loading="lazy" />
          </button>
        </figure>
      </div>
    </div>

    <div
      v-if="selectedImage"
      class="gallery-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Expanded gallery image"
      @click.self="selectedImage = null"
    >
      <div class="gallery-modal__content">
        <button class="gallery-modal__close" type="button" @click="selectedImage = null" aria-label="Close image">
          ✕
        </button>
        <img :src="selectedImage.src" :alt="selectedImage.alt" />
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
  align-items: center;
}

.gallery__header {
  max-width: 720px;
  text-align: center;
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
  aspect-ratio: 4 / 3;
}

@media (min-width: 768px) {
  .gallery__item {
    flex-basis: 25%;
  }

  .gallery__header {

  }
}

.gallery__button {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.gallery__button:focus-visible {
  outline: 2px solid #ff761a;
  outline-offset: 4px;
}

.gallery__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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

.gallery-modal {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  z-index: 1000;
}

.gallery-modal__content {
  position: relative;
  max-width: min(90vw, 960px);
  max-height: 80vh;
  border-radius: 1rem;
  overflow: hidden;
  background: #000;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
}

.gallery-modal__content img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}

.gallery-modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-modal__close:focus-visible {
  outline: 2px solid #ff761a;
  outline-offset: 2px;
}
</style>
