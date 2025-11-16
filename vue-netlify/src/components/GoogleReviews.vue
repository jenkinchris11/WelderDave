<script setup>
const googleReviewLink = 'https://share.google/C6NldHkAwhkCZ2xRX';
const embedLink = `${googleReviewLink}?embed=1`;
</script>

<template>
  <section class="reviews">
    <div class="reviews__content">
      <p class="eyebrow">Find Us On Google</p>
      <h3>Locals trust WelderDave for fast, tidy welding work</h3>
      <a :href="googleReviewLink" class="btn" target="_blank" rel="noreferrer">
        Read more on Google
      </a>
    </div>

    <div class="reviews__embed">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2359.074748593415!2d-2.3619213232434344!3d53.75255207240996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b99189bb89acb%3A0xd6b6471380a38543!2sWelderDave%20-%20Accrington%20Welding%20%26%20Fabrication!5e0!3m2!1sen!2suk!4v1763318812359!5m2!1sen!2suk" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </section>
</template>

<style scoped>
.reviews {
  background: #0f172a;
  color: #f8fafc;
  border-radius: 1.75rem;
  padding: 2.75rem 2rem;
  display: grid;
  gap: 2rem;
  box-shadow: 0 35px 65px -45px rgba(15, 23, 42, 0.9);
}

@media (min-width: 768px) {
  .reviews {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
}

.eyebrow {
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
  color: #fbbf24;
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
  background: #38bdf8;
  color: #0f172a;
  font-weight: 700;
  padding: 0.65rem 1.5rem;
  border-radius: 999px;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.btn:hover {
  opacity: 0.85;
}

.reviews__embed iframe {
  width: 100%;
  min-height: 420px;
  border: none;
  border-radius: 1.25rem;
  background: white;
}

@media (max-width: 767px) {
  .reviews__embed iframe {
    min-height: 360px;
  }
}
</style>
