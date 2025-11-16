<template>
  <section class="hero">
    <div class="hero__content">
      <p class="eyebrow">Accrington based welder</p>
      <h2>Precision welding & fabrication for every vehicle</h2>
      <p class="lede">
        Welding and fabrication services covering ferrous and non-ferrous metals, MOT failures, and
        chassis repairs for cars, commercials, campers, classics, and motorcycles. Emergency mobile
        service available (call out charge applies).
      </p>
      <div class="hero__actions">
        <a class="primary" href="tel:07444259596">Call or message WelderDave</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  text-align: center;
  background: radial-gradient(circle at top, #FF761A, transparent 60%);
  padding: 3rem 1.5rem;
  border-radius: 2rem;
  box-shadow: 0 20px 45px -20px rgba(15, 23, 42, 0.2);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}

.hero__content {
  max-width: 580px;
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
    flex-direction: row;
    text-align: center;
    padding: 4rem 5rem;
    gap: 3rem;
  }

  .hero__content {
    flex: 3;
  }

  .hero__actions {
    justify-content: flex-start;
  }
}
</style>
