<template>
  <section class="contact">
    <div>
      <h3>Ready when you are</h3>
      <p>
        What ever your metal need, call or message me with the job details and location. Emergency
        mobile service is available across Accrington and the surrounding area (call out charge
        applies), so repairs can be completed where your vehicle sits.
      <h3>Need a hand?</h3>
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
        Email
        <input type="email" placeholder="jane@example.com" required />
      </label>
      <label>
        Message
        <textarea placeholder="Tell us about your launch..." rows="3"></textarea>
      </label>
      <button type="submit">Send message</button>
    </form>
  </section>
</template>

<style scoped>
.contact {
  background-color: #0f172a;
  color: white;
  border-radius: 1.5rem;
  padding: 2rem;
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 720px) {
  .contact {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
}

h3 {
  font-size: 1.75rem;
}

p {
  color: rgba(255, 255, 255, 0.85);
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-weight: 600;
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
  background-color: #38bdf8;
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
</style>
