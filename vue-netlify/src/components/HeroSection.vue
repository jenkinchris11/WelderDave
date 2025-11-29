<script setup>
import EditableText from './EditableText.vue'
import welderImage from '../assets/Welder.png'
import welderBeamImage from '../assets/WelderBeam.png'

defineProps({
  editable: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section class="hero">
    <div class="hero__visual hero__visual--left" aria-hidden="true">
      <img class="hero__image hero__image--primary" :src="welderImage" alt="Welder Dave welding a vehicle" />
    </div>
    <div class="hero__content">
      <EditableText
        content-key="hero-eyebrow"
        tag="p"
        class="eyebrow"
        :editable="editable"
        default-text="Accrington based welder"
      />
      <EditableText
        content-key="hero-heading"
        tag="h2"
        :editable="editable"
        default-text="Precision welding & fabrication for every project"
      />
      <EditableText
        content-key="hero-lede"
        tag="p"
        class="lede"
        :editable="editable"
        :multiline="true"
        default-text="Welding and fabrication services covering ferrous and non-ferrous metals, MOT failures, and chassis repairs for cars, commercials, campers, classics, motorcycles, and machinery. MIG, TIG and MMA welding in Accrington. Custom fabrication. Welding of aluminium, brass, cast iron, copper, mild steel, stainless steel and titanium."
      />
      <div class="hero__actions">
        <a class="primary" href="tel:07444259596">
          <EditableText
            content-key="hero-cta"
            tag="span"
            :editable="editable"
            default-text="Call or message WelderDave"
          />
        </a>
      </div>
    </div>
    <div class="hero__visual hero__visual--right" aria-hidden="true">
      <img class="hero__image hero__image--secondary" :src="welderBeamImage" alt="Welder Dave showcasing welding beam" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  text-align: center;
  background: radial-gradient(circle at top, #FF761A, transparent 60%);
  padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 6rem);
  border-radius: 0;
  box-shadow: 0 20px 45px -20px rgba(15, 23, 42, 0.2);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.hero__visual {
  display: flex;
  justify-content: center;
  width: 100%;
}

.hero__image {
  width: 100%;
  display: block;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.25));
}

.hero__image--primary {
  display: none;
}

.hero__image--secondary {
  width: 500px;
}

.hero__content {
  max-width: 580px;
  text-align: center;
}

.eyebrow {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: black;
}

h2 {
  font-size: clamp(2rem, 4vw, 2.75rem);
  margin-top: 1rem;
}

.lede {
  margin: 1rem auto 2rem;
  max-width: 46ch;
  color: black;
}

.hero__actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.primary,
.secondary {
  text-decoration: none;
  font-weight: 600;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.primary {
  background-color: #FF761A;
  color: white;
  box-shadow: 0 10px 30px -10px rgba(37, 99, 235, 0.7);
}

.secondary {
  color: #FF761A;
  border: 2px solid white;
}

.primary:hover,
.secondary:hover {
  transform: translateY(-2px);
}

@media (min-width: 1024px) {
  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(auto, 560px) minmax(0, 1fr);
    align-items: center;
    justify-items: center;
    text-align: center;
    padding: clamp(4rem, 8vw, 6rem) clamp(2.5rem, 10vw, 8rem);
    gap: 2.5rem;
  }

  .hero__content {
    justify-self: center;
    text-align: center;
  }

  .hero__visual {
    width: auto;
  }

  .hero__actions {
    justify-content: center;
  }
}

@media (min-width: 768px) {
  .hero__image--primary {
    display: block;
  }
}

@media (min-width: 1280px) {
  .hero__image--primary {
    max-width: 360px;
  }

  .hero__image--secondary {
    width: 500px;
  }
}
</style>
