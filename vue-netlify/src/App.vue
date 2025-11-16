<script setup>
import HeroSection from './components/HeroSection.vue';
import FeatureGrid from './components/FeatureGrid.vue';
import GoogleReviews from './components/GoogleReviews.vue';
import ImageGallery from './components/ImageGallery.vue';
import ContactCard from './components/ContactCard.vue';
</script>

<template>
  <div class="page">
    <header>
      <h1>
        <span class="brand-highlight">Welder</span>Dave
      </h1>
      <nav>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <main class="layout-grid">
      <section class="layout-grid__item layout-grid__item--hero">
        <HeroSection />
      </section>

      <section id="services" class="layout-grid__item layout-grid__item--features">
        <FeatureGrid />
      </section>

      <section class="layout-grid__item layout-grid__item--reviews">
        <GoogleReviews />
      </section>

      <section class="layout-grid__item layout-grid__item--gallery">
        <ImageGallery />
      </section>

      <section id="contact" class="layout-grid__item layout-grid__item--contact">
        <ContactCard />
      </section>
    </main>

    <footer>
      <small>Accrington mobile welder • Welding & fabrication expertise</small>
    </footer>
  </div>
</template>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 3rem;
  position: relative;
  isolation: isolate;
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

.page::before {
  background: #c7d2fe;
  top: -140px;
  left: -120px;
}

.page::after {
  background: #bfdbfe;
  right: -160px;
  bottom: 60px;
}

header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  align-items: flex-start;
}

@media (min-width: 640px) {
  header {
    flex-direction: row;
    align-items: center;
  }
}

h1 {
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
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

nav a:hover {
  background-color: #e2e8f0;
}

main.layout-grid {
  margin-top: 3rem;
  display: grid;
  gap: 1.75rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.layout-grid__item {
  width: 100%;
}

@media (min-width: 1024px) {
  main.layout-grid {
    gap: 2.5rem;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-auto-flow: dense;
  }
  .layout-grid__item {
    grid-column: span 12;
  }
  .layout-grid__item--hero {
    grid-column: 2 / span 10;
  }
  .layout-grid__item--features {
    grid-column: 2 / span 10;
  }
  .layout-grid__item--reviews {
    grid-column: 1 / span 12;
    grid-column: 2 / span 10;
  }

  .layout-grid__item--gallery {
    grid-column: 2 / span 10;
  }

  .layout-grid__item--contact {
    grid-column: 3 / span 8;
  }
}

footer {
  margin-top: 3rem;
  text-align: center;
  color: #475569;
}
</style>
