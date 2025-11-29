<script setup>
import EditableText from './EditableText.vue'

const props = defineProps({
  editable: {
    type: Boolean,
    default: false,
  },
})

const features = [
  {
    id: 'welding',
    title: 'Welding & fabrication',
    body: 'From bespoke brackets to full structural work, every job is handled with clean, reliable welds.'
  },
  {
    id: 'repairs',
    title: 'Repairs & MOT failures',
    body: 'Sort troublesome advisories fast with patch panels, floor sections, and sill repairs ready for retest.'
  },
  {
    id: 'metals',
    title: 'Ferrous & non-ferrous metals',
    body: 'Time served with over thirty years of experience in a range of industries, including aeronautical engineering, food-standard welding, structural steel, and sheet metal fabrication. Industrial, domestic, and auto welding.'
  },
  {
    id: 'vehicles',
    title: 'Cars, commercials & campers',
    body: 'Auto chassis welding of 4x4s. Vehicle restoration completed to a high standard. Complex projects undertaken. I provide solid, dependable work at a price that makes sense.'
  },
  {
    id: 'emergency',
    title: 'Emergency mobile service',
    body: 'A mobile call-out service is available when time is critical. Call out charge applies'
  },
  {
    id: 'support',
    title: 'Friendly local support',
    body: 'Whatever your metal need, call or message WelderDave for practical advice and fast turnaround.'
  }
];
</script>

<template>
  <section class="feature-grid">
    <div class="feature-grid__heading">
      <EditableText
        content-key="features-eyebrow"
        tag="h3"
        class="eyebrow"
        :editable="props.editable"
        default-text="Services"
      />
      <EditableText
        content-key="features-lede"
        tag="p"
        class="lede"
        :editable="props.editable"
        :multiline="true"
        default-text="Full welding coverage for your chassis, bodywork, and custom fabrication ideas."
      />
    </div>
    <div class="grid">
      <article v-for="feature in features" :key="feature.id">
        <EditableText
          :content-key="`feature-${feature.id}-title`"
          tag="h4"
          :editable="props.editable"
          :default-text="feature.title"
        />
        <EditableText
          :content-key="`feature-${feature.id}-body`"
          tag="p"
          :editable="props.editable"
          :multiline="true"
          :default-text="feature.body"
        />
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
