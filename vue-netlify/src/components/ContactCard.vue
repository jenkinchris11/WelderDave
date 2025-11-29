<template>
  <section class="contact">
    <div class="contact__intro">
      <h3>Ready when you are</h3>
      <p>
        Whatever your metal needs, call or message me with the job details and location. Please note that in order to assess metal structurally, I need to see your vehicle/project, as photographs alone do not allow for a full assessment.
      </p>
    </div>
    <form class="contact__form" @submit.prevent>
      <label>
        Name
        <input type="text" placeholder="Jane Doe" required />
      </label>
      <label>
        Email or phone
        <input type="text" placeholder="jane@example.com / 07xxx xxxxxx" required />
      </label>
      <label>
        Message
        <textarea placeholder="Share the vehicle, metal type, and repair needs..." rows="3"></textarea>
      </label>
      <button type="submit">Send message</button>
    </form>
  </section>
</template>

<style scoped>
.contact {
  background-color: black;
  color: white;
  padding: 2rem;
  display: grid;
  gap: 1.5rem;
}

.contact__intro {
  text-align: center;
}

@media (min-width: 720px) {
  .contact {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .contact__intro {
    text-align: center;
  }

  .contact__form {
    margin: 0;
  }
}

h3 {
  font-size: 1.75rem;
  color: #FF761A;
}

p {
  color: white;
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: min(100%, 28rem);
  margin: 0 auto;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-weight: 600;
  width: 100%;
}

input,
textarea {
  border-radius: 0.75rem;
  border: none;
  padding: 0.85rem 1rem;
  font: inherit;
}

button {
  align-self: flex-start;
  border-radius: 999px;
  background-color: #FF761A;
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  cursor: pointer;
  color: white;
}

button:hover {
  opacity: 0.9;
}
</style>
