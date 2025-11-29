<script setup>
import EditableText from './EditableText.vue'

const props = defineProps({
  editable: {
    type: Boolean,
    default: false,
  },
})

const googleReviewLink = 'https://share.google/C6NldHkAwhkCZ2xRX'
</script>

<template>
  <section class="reviews">
    <div class="reviews__content">
      <EditableText
        content-key="reviews-eyebrow"
        tag="p"
        class="eyebrow"
        :editable="props.editable"
        default-text="Find Us On Google"
      />
      <EditableText
        content-key="reviews-heading"
        tag="h3"
        :editable="props.editable"
        :multiline="true"
        default-text="Locals trust WelderDave for fast, tidy welding work"
      />
      <a :href="googleReviewLink" class="btn" target="_blank" rel="noreferrer">
        <EditableText
          content-key="reviews-cta"
          tag="span"
          :editable="props.editable"
          default-text="View on Google"
        />
      </a>
    </div>

    <div class="reviews__embed">
      <div class="reviews__placeholder">
        <EditableText
          content-key="reviews-placeholder"
          tag="p"
          class="lede"
          :editable="props.editable"
          :multiline="true"
          default-text="Preview unavailable here. Open our Google profile to read the latest reviews."
        />
        <a :href="googleReviewLink" class="btn" target="_blank" rel="noreferrer">
          <EditableText
            content-key="reviews-placeholder-cta"
            tag="span"
            :editable="props.editable"
            default-text="Open Google Reviews"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews {
  background: black;
  color: white;
  padding: 2.75rem 2rem;
  display: grid;
  gap: 2rem;
  box-shadow: 0 35px 65px -45px rgba(15, 23, 42, 0.9);
}

.reviews__content {
  text-align: center;
}

@media (min-width: 768px) {
  .reviews {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .reviews__content {
    text-align: center;
  }
}

.eyebrow {
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
  color: #FF761A;
}

h3 {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  margin: 0.75rem 0;
}

.lede {
  color: rgba(248, 250, 252, 0.85);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #FF761A;
  color: white;
  font-weight: 700;
  padding: 0.65rem 1.5rem;
  border-radius: 999px;
  text-decoration: none;
  transition: opacity 0.2s ease;
}
.p{
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
  color: #FF761A;
}
.btn:hover {
  opacity: 0.85;
}

.reviews__embed {
  width: 100%;
}

.reviews__placeholder {
  background: white;
  color: #0f172a;
  border-radius: 1.25rem;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  box-shadow: 0 20px 40px -30px rgba(15, 23, 42, 0.45);
  display: grid;
  gap: 1rem;
}

@media (max-width: 767px) {
  .reviews__embed {
    width: 100%;
  }
}
</style>
