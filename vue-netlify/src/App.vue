<script setup>
import HeroSection from './components/HeroSection.vue';
import FeatureGrid from './components/FeatureGrid.vue';
import WorkShowcase from './components/WorkShowcase.vue';
import GoogleReviews from './components/GoogleReviews.vue';
import ContactCard from './components/ContactCard.vue';
</script>

<template>
  <div class="page">
    <header>
      <h1>WelderDave</h1>
      <nav>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <main>
      <HeroSection />
      <FeatureGrid id="services" />
      <WorkShowcase />
      <GoogleReviews />
      <ContactCard id="contact" />
    </main>

    <footer>
      <small>Accrington mobile welder • Welding & fabrication expertise</small>
    </footer>
  </div>
</template>

<style scoped>
.page {
  max-width: 960px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 3rem;
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

nav {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  font-weight: 600;
}

nav a {
  text-decoration: none;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

nav a:hover {
  background-color: #e2e8f0;
}

.btn {
  background-color: #2563eb;
  color: white;
}

main {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

footer {
  margin-top: 3rem;
  text-align: center;
  color: #475569;
}
</style>
