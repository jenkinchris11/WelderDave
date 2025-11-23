<script setup>
import { onMounted, ref, watch } from 'vue';
import HeroSection from './components/HeroSection.vue';
import ElfsightReviews from './components/ElfsightReviews.vue';
import FeatureGrid from './components/FeatureGrid.vue';
import GoogleReviews from './components/GoogleReviews.vue';
import ImageGallery from './components/ImageGallery.vue';
import ContactCard from './components/ContactCard.vue';
import { defaultGalleryImages } from './data/galleryData.js';
import sideVideo from './assets/Animation.mp4';
import workerLottie from './assets/Worker yellow and black.lottie';

const galleryImages = ref([...defaultGalleryImages]);
const isAuthenticated = ref(false);
const showLoginForm = ref(false);
const passwordInput = ref('');
const authError = ref('');

const OWNER_PASSWORD = import.meta.env.VITE_OWNER_PASSWORD || 'welderdave';
const AUTH_STORAGE_KEY = 'welderdave-owner-auth';
const GALLERY_STORAGE_KEY = 'welderdave-gallery-images';

const normalizeImages = (images) => {
  if (!Array.isArray(images)) {
    return [...defaultGalleryImages];
  }

  return images
    .filter((image) => image?.src)
    .map((image, index) => ({
      id: image.id || `gallery-${index + 1}`,
      src: image.src,
      alt: image.alt?.trim() || `Gallery image ${index + 1}`,
    }));
};

const handleLogin = () => {
  if (passwordInput.value.trim() === OWNER_PASSWORD) {
    isAuthenticated.value = true;
    showLoginForm.value = false;
    authError.value = '';
    passwordInput.value = '';
    return;
  }

  authError.value = 'Incorrect password. Please try again.';
};

const toggleLoginForm = () => {
  showLoginForm.value = !showLoginForm.value;
  authError.value = '';
};

const logout = () => {
  isAuthenticated.value = false;
};

const updateGalleryImages = (images) => {
  galleryImages.value = normalizeImages(images);
};

onMounted(() => {
  if (typeof window === 'undefined') return;

  const savedGallery = localStorage.getItem(GALLERY_STORAGE_KEY);
  if (savedGallery) {
    try {
      galleryImages.value = normalizeImages(JSON.parse(savedGallery));
    } catch (error) {
      console.error('Unable to load saved gallery images', error);
      galleryImages.value = [...defaultGalleryImages];
    }
  }

  const savedAuthState = localStorage.getItem(AUTH_STORAGE_KEY);
  if (savedAuthState === 'true') {
    isAuthenticated.value = true;
  }
});

watch(
  galleryImages,
  (images) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(images));
  },
  { deep: true }
);

watch(isAuthenticated, (isAuthed) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_STORAGE_KEY, isAuthed ? 'true' : 'false');
});
</script>

<template>
  <div class="page">
    <div class="page__side-video page__side-video--left" aria-hidden="true">
      <video :src="sideVideo" autoplay loop muted playsinline></video>
    </div>
    <div class="page__side-video page__side-video--right" aria-hidden="true">
      <video :src="sideVideo" autoplay loop muted playsinline></video>
    </div>

    <div class="page__content">
      <header class="site-header">
        <div class="site-header__identity">
          <h1 class="site-title">
            <span class="brand-highlight site-title__segment">
              <span class="site-title__initial">W</span>elder
            </span>
            <span class="site-title__segment">
              <span class="site-title__initial">D</span>ave
            </span>
          </h1>
          <p class="site-header__tagline">Owner login unlocks gallery editing</p>
        </div>

        <div class="owner-login">
          <div v-if="isAuthenticated" class="owner-login__status">
            <div class="status-pill">
              <span class="status-pill__dot" aria-hidden="true"></span>
              <span class="status-pill__text">Owner mode active</span>
            </div>
            <p class="owner-login__hint">You can now add, edit, and remove gallery images.</p>
            <button type="button" class="owner-login__button owner-login__button--ghost" @click="logout">
              Log out
            </button>
          </div>

          <div v-else class="owner-login__panel">
            <button type="button" class="owner-login__button" @click="toggleLoginForm">
              {{ showLoginForm ? 'Hide owner login' : 'Owner login' }}
            </button>

            <form v-if="showLoginForm" class="owner-login__form" @submit.prevent="handleLogin">
              <label class="owner-login__label" for="owner-password">Owner password</label>
              <input
                id="owner-password"
                v-model="passwordInput"
                type="password"
                class="owner-login__input"
                placeholder="Enter password"
                autocomplete="current-password"
                required
              />
              <p class="owner-login__hint">Default password: welderdave. Override with VITE_OWNER_PASSWORD.</p>
              <p v-if="authError" class="owner-login__error" role="alert">{{ authError }}</p>
              <button type="submit" class="owner-login__button owner-login__button--primary">Sign in</button>
            </form>
          </div>
        </div>
      </header>

      <main class="layout-grid">
        <section class="layout-grid__item layout-grid__item--hero">
          <HeroSection />
        </section>

        <section class="layout-grid__item layout-grid__item--elfsight">
          <ElfsightReviews />
        </section>

        <section id="services" class="layout-grid__item layout-grid__item--features">
          <FeatureGrid />
        </section>

        <section
          class="layout-grid__item layout-grid__item--lottie"
          aria-label="Welder Dave animation"
        >
          <dotlottie-player
            :src="workerLottie"
            style="width: 500px; height: 500px;"
            autoplay
            loop
            background="transparent"
            speed="1"
            aria-hidden="true"
          ></dotlottie-player>
        </section>
        <section class="layout-grid__item layout-grid__item--reviews">
          <GoogleReviews />
        </section>
        
        <section class="layout-grid__item layout-grid__item--gallery">
          <ImageGallery
            :images="galleryImages"
            :editable="isAuthenticated"
            @update:images="updateGalleryImages"
          />
        </section>

        <section id="contact" class="layout-grid__item layout-grid__item--contact">
          <ContactCard />
        </section>
      </main>

      <footer>
        <small>Accrington mobile welder • Welding & fabrication expertise</small>
      </footer>
    </div>
    <div class="owner-login">
      <div v-if="isAuthenticated" class="owner-login__status">
        <div class="status-pill">
          <span class="status-pill__dot" aria-hidden="true"></span>
          <span class="status-pill__text">Owner mode active</span>
        </div>
        <p class="owner-login__hint">You can now add, edit, and remove gallery images.</p>
        <button type="button" class="owner-login__button owner-login__button--ghost" @click="logout">
          Log out
        </button>
      </div>

      <div v-else class="owner-login__panel">
        <button type="button" class="owner-login__button" @click="toggleLoginForm">
          {{ showLoginForm ? 'Hide owner login' : 'Owner login' }}
        </button>

        <form v-if="showLoginForm" class="owner-login__form" @submit.prevent="handleLogin">
          <label class="owner-login__label" for="owner-password">Owner password</label>
          <input
            id="owner-password"
            v-model="passwordInput"
            type="password"
            class="owner-login__input"
            placeholder="Enter password"
            autocomplete="current-password"
            required
          />
          <p class="owner-login__hint">Default password: welderdave. Override with VITE_OWNER_PASSWORD.</p>
          <p v-if="authError" class="owner-login__error" role="alert">{{ authError }}</p>
          <button type="submit" class="owner-login__button owner-login__button--primary">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  isolation: isolate;
  background: white;
}

.page__content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 3rem;
}

.site-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.site-header__identity {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.site-header__tagline {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
}

.owner-login {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
  width: min(360px, calc(100% - 3rem));
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  flex: 1 1 340px;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.owner-login__panel,
.owner-login__status {
  background: #0f172a;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  border: 1px solid #1e293b;
  box-shadow: 0 20px 30px -24px rgba(15, 23, 42, 0.5);
  min-width: min(320px, 100%);
  min-width: min(460px, 100%);
}

.owner-login__form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

.owner-login__label {
  font-weight: 600;
  font-size: 0.95rem;
}

.owner-login__input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
}

.owner-login__input:focus {
  outline: 2px solid #ff761a;
  outline-offset: 2px;
  border-color: #ff761a;
}

.owner-login__button {
  align-self: flex-start;
  background: #ff761a;
  color: #0f172a;
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  box-shadow: 0 10px 25px -14px rgba(255, 118, 26, 0.8);
}

.owner-login__button:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 26px -14px rgba(255, 118, 26, 0.8);
}

.owner-login__button--primary {
  width: 100%;
  justify-content: center;
  text-align: center;
}

.owner-login__button--ghost {
  background: transparent;
  color: #e2e8f0;
  border: 1px solid #334155;
  box-shadow: none;
}

.owner-login__button--ghost:hover {
  background: #1e293b;
}

.owner-login__hint {
  margin: 0;
  color: #cbd5e1;
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .owner-login {
    right: 1rem;
    left: 1rem;
    width: auto;
  }

  .owner-login__panel,
  .owner-login__status {
    width: 100%;
  }
}

.owner-login__error {
  margin: 0;
  color: #fca5a5;
  font-weight: 700;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #0b5d36;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  color: #e8fff3;
  font-weight: 700;
  width: fit-content;
}

.status-pill__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.2);
}

.status-pill__text {
  font-size: 0.9rem;
}

.page::before,
.page::after {
  content: '';
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
  z-index: -1;
}
.main{
  width: 500px;
}
.page::before {
  top: -140px;
  left: -120px;
}

.page::after {
  right: -160px;
  bottom: 60px;
}

.page__side-video {
  position: absolute;
  display: none;
  top: 120px;
  width: 240px;
  height: 320px;
  border-radius: 1.5rem;
  z-index: -1;
  opacity: 0.8;
  pointer-events: none;
}

.page__side-video video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page__side-video--left {
  left: -260px;
}

.page__side-video--right {
  right: -260px;
}

header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  text-align: center;
}

@media (min-width: 640px) {
  header {
    flex-direction: column;
  }
}

h1 {
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.site-title {
  display: inline-flex;
  gap: 0.35rem;
  align-items: baseline;
}

.site-title__segment {
  display: inline-flex;
  gap: 0.05rem;
}

.site-title__initial {
  font-size: 2.25rem;
  line-height: 0.8;
}

.brand-highlight {
  color: #ff761a;
}

nav {
  display: inline-flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 999px;
  padding: 0.35rem 0.5rem;
  box-shadow: 0 10px 30px -20px rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(6px);
}

nav a {
  text-decoration: none;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.reviews-video {
  margin-top: 3.5rem;
  border-radius: 1.25rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.reviews-video video {
  display: flex;
  width: 100%;
  object-fit: cover;
}

nav a:hover {
  background-color: #e2e8f0;
}

main.layout-grid {
  margin-top: 3rem;
  display: grid;
  gap: 1.75rem;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
}

.layout-grid__item {
  width: 100%;
}

.layout-grid__item--hero,
.layout-grid__item--elfsight,
.layout-grid__item--reviews,
.layout-grid__item--gallery,
.layout-grid__item--contact {
  grid-column: 1 / -1;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}

.layout-grid__item--lottie {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  padding: 1.5rem;
  min-height: 360px;
}

.layout-grid__item--lottie dotlottie-player {
  width: min(100%, 480px);
  aspect-ratio: 1 / 1;
  height: auto;
}

@media (min-width: 1024px) {
  .page__side-video {
    display: block;
  }

  .page__side-video--right video {
    transform: scaleX(-1);
  }

  main.layout-grid {
    gap: 2.5rem;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-auto-flow: dense;
  }
  .layout-grid__item { 
    grid-column: span 12;
  }
  .layout-grid__item--hero,
  .layout-grid__item--elfsight,
  .layout-grid__item--reviews,
  .layout-grid__item--gallery,
  .layout-grid__item--contact {
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
  }
  .layout-grid__item--elfsight {
    grid-column: 1 / -1;
  }
  .layout-grid__item--features {
    grid-column: 2 / span 7;
  }
  .layout-grid__item--lottie {
    grid-column: 9 / span 3;
    align-self: stretch;
  }
  .layout-grid__item--reviews {
    grid-column: 1 / -1;
  }

  .layout-grid__item--gallery {
    grid-column: 1 / -1;
  }

  .layout-grid__item--contact {
    grid-column: 1 / -1;
  }
}

footer {
  margin-top: 3rem;
  text-align: center;
  color: #475569;
}
</style>
