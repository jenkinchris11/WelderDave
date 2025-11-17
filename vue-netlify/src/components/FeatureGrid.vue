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
    <div class="feature-grid__heading">
      <h3 class="eyebrow">Services</h3>
      <p class="lede">Full welding coverage for your chassis, bodywork, and custom fabrication ideas.</p>
    </div>
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
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 720px) {
  .feature-grid {
    align-items: center;
  }
}

.feature-grid__heading {
  position: relative;
  text-align: center;
}

.eyebrow {
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 700;
  color: #FF761A;
  text-align: center;
}

h3 {
  font-size: 1.75rem;
  margin: 0.4rem 0;
}

.lede {
  color: #475569;
}

.grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 720px) {
  .feature-grid__heading {
    text-align: left;
  }
}

article {
  padding: 1.5rem;
  border-radius: 1.25rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(226, 232, 240, 0.5));
  box-shadow: 0 15px 35px -25px rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(148, 163, 184, 0.4);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h4 {
  margin-bottom: 0.5rem;
}

p {
  color: #475569;
}
</style>
