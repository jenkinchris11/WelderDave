<template>
  <section class="contact">
    <div class="contact__intro">
      <h3>Ready when you are</h3>
      <p>
        Whatever your metal needs, call or message me with the job details and location. <br>
        Please note that in order to assess metal structurally, I need to see your vehicle/project, as photographs alone do not
        allow for a full assessment.
      </p>
    </div>
    <form ref="formRef" class="contact__form" @submit.prevent="handleSubmit">
      <label>
        Name
        <input v-model="form.name" name="user_name" type="text" placeholder="Jane Doe" required />
      </label>
      <label>
        Email
        <input v-model="form.email" name="user_email" type="email" placeholder="jane@example.com" required />
      </label>
      <label>
        Message
        <textarea
          v-model="form.message"
          name="message"
          placeholder="Share the vehicle, metal type, and repair needs..."
          rows="3"
          required
        ></textarea>
      </label>

      <button type="submit" :disabled="sending">{{ sending ? 'Sending...' : 'Send message' }}</button>
      <p v-if="status.message" :class="['contact__status', `contact__status--${status.type}`]">
        {{ status.message }}
      </p>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import emailjs from '@emailjs/browser';

const formRef = ref(null);

const form = reactive({
  name: '',
  email: '',
  message: '',
});

const sending = ref(false);
const status = reactive({ message: '', type: '' });

const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

if (emailPublicKey) {
  emailjs.init(emailPublicKey);
}

const resetStatus = () => {
  status.message = '';
  status.type = '';
};

const validateForm = () => form.name.trim() && form.email.trim() && form.message.trim();

const handleSubmit = async () => {
  resetStatus();
  if (!validateForm()) {
    status.message = 'Please complete all required fields before sending your request.';
    status.type = 'error';
    return;
  }

  if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
    status.message = 'Email service is not configured. Please try again later.';
    status.type = 'error';
    return;
  }

  sending.value = true;

  try {
    await emailjs.sendForm(emailServiceId, emailTemplateId, formRef.value);

    status.message = 'Thanks! Your message has been sent.';
    status.type = 'success';
    form.name = '';
    form.email = '';
    form.message = '';
    formRef.value?.reset();
  } catch (error) {
    status.message = error?.message || 'Something went wrong while sending your request.';
    status.type = 'error';
  } finally {
    sending.value = false;
  }
};
</script>

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
  transition: opacity 0.2s ease;
}

button:hover {
  opacity: 0.9;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.contact__status {
  margin: 0;
  font-weight: 600;
}

.contact__status--success {
  color: #6cd67a;
}

.contact__status--error {
  color: #ff9e9e;
}
</style>
