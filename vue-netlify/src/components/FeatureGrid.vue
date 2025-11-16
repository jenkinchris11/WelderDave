<script setup>
const features = [
  {
    title: 'Instant builds',
    body: 'Vite-powered bundling compiles lightning-fast previews so every change feels instant.'
  },
  {
    title: 'Zero config deploys',
    body: 'netlify.toml already includes the correct command and publish directory.'
  },
  {
    title: 'Modern tooling',
    body: 'Vue 3, single-file components, and hot-module replacement keep the DX delightful.'
  },
  {
    title: 'Accessible defaults',
    body: 'Semantic markup and responsive layouts ensure the experience works everywhere.'
  }
];
</script>

<template>
  <section class="feature-grid">
    <h3>Why this template?</h3>
    <div class="grid">
      <article v-for="feature in features" :key="feature.title">
        <h4>{{ feature.title }}</h4>
        <p>{{ feature.body }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.feature-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

article {
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: white;
  box-shadow: 0 15px 35px -25px rgba(15, 23, 42, 0.5);
  border: 1px solid #e2e8f0;
}

h3 {
  font-size: 1.75rem;
}

h4 {
  margin-bottom: 0.5rem;
}

p {
  color: #475569;
}
</style>
