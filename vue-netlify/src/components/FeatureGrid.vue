<script setup>
const features = [
  {
    title: 'Welding & fabrication',
    body: 'From bespoke brackets to full structural work, every job is handled with clean, reliable welds.'
  },
  {
    title: 'Repairs & MOT failures',
    body: 'Sort troublesome advisories fast with patch panels, floor sections, and sill repairs ready for retest.'
  },
  {
    title: 'Ferrous & non-ferrous metals',
    body: 'Steel, stainless, and aluminium projects are all catered for with the right process for each metal.'
  },
  {
    title: 'Cars, commercials & campers',
    body: 'Chassis repairs for work vans, camper conversions, classics, and motorcycles keep every vehicle safe.'
  },
  {
    title: 'Emergency mobile service',
    body: 'Can’t make it to the workshop? A mobile call-out service is available when time is critical.'
  },
  {
    title: 'Friendly local support',
    body: 'Whatever your metal need, call or message WelderDave for practical advice and fast turnaround.'
  }
];
</script>

<template>
  <section class="feature-grid">
    <h3>Services</h3>
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
  grid-template-columns: (auto-fit, minmax(220px, 1fr));
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
