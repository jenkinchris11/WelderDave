<template>
  <section class="hero">
    <p class="eyebrow">Accrington based welder</p>
    <h2>Precision welding & fabrication for every vehicle</h2>
    <p class="lede">
      Welding and fabrication services covering ferrous and non-ferrous metals, MOT failures, and
      chassis repairs for cars, commercials, campers, classics, and motorcycles. Emergency mobile
      service available (call out charge applies).
    </p>
    <div class="hero__actions">
      <a class="primary" href="#contact">Call or message WelderDave</a>
      <a class="secondary" href="#services">Explore services</a>
    <p class="eyebrow">Deploy in seconds</p>
    <h2>Launch a fast Vue.js site on Netlify</h2>
    <p class="lede">
      This starter ships with opinionated styling, a responsive layout, and a Netlify-friendly
      configuration so you can focus on your message instead of the boilerplate.
    </p>
    <div class="hero__actions">
      <a class="primary" href="https://app.netlify.com/start" target="_blank" rel="noreferrer">
        Start Deploying
      </a>
      <a class="secondary" href="#features">See features</a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  text-align: center;
  background: radial-gradient(circle at top, #c7d2fe, transparent 60%);
  padding: 3rem 1.5rem;
  border-radius: 2rem;
  box-shadow: 0 20px 45px -20px rgba(15, 23, 42, 0.2);
}

.eyebrow {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #4338ca;
}

h2 {
  font-size: clamp(2rem, 4vw, 2.75rem);
  margin-top: 1rem;
}

.lede {
  margin: 1rem auto 2rem;
  max-width: 46ch;
  color: #475569;
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
  background-color: #1d4ed8;
  color: white;
  box-shadow: 0 10px 30px -10px rgba(37, 99, 235, 0.7);
}

.secondary {
  color: #1d4ed8;
  border: 2px solid rgba(37, 99, 235, 0.35);
}

.primary:hover,
.secondary:hover {
  transform: translateY(-2px);
}
</style>
