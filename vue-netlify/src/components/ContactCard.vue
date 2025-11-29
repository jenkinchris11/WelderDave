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
    <form class="contact__form" @submit.prevent="handleSubmit">
      <label>
        Name
        <input v-model="form.name" type="text" placeholder="Jane Doe" required />
      </label>
      <label>
        Email or phone
        <input v-model="form.contact" type="text" placeholder="jane@example.com / 07xxx xxxxxx" required />
      </label>
      <label>
        Message
        <textarea
          v-model="form.message"
          placeholder="Share the vehicle, metal type, and repair needs..."
          rows="3"
          required
        ></textarea>
      </label>

      <section class="contact__signature">
        <div class="contact__signature__header">
          <p class="contact__signature__label">Signature (optional)</p>
          <div class="contact__signature__actions">
            <button type="button" class="contact__signature__action" @click="undoSignature" :disabled="!hasSignature">
              Undo
            </button>
            <button type="button" class="contact__signature__action" @click="clearSignature" :disabled="!hasSignature">
              Clear
            </button>
          </div>
        </div>
        <VueSignaturePad
          ref="signaturePad"
          class="contact__signature__pad"
          :options="{ penColor: '#ffffff' }"
          :width="'100%'"
          :height="'180px'"
        />
        <p class="contact__signature__help">
          {{ signatureHelpText }}
        </p>
      </section>

      <button type="submit" :disabled="sending">{{ sending ? 'Sending...' : 'Send message' }}</button>
      <p v-if="status.message" :class="['contact__status', `contact__status--${status.type}`]">
        {{ status.message }}
      </p>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import emailjs from '@emailjs/browser';

const form = reactive({
  name: '',
  contact: '',
  message: '',
});

const sending = ref(false);
const status = reactive({ message: '', type: '' });
const signaturePad = ref(null);

const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const emailPrivateKey = import.meta.env.VITE_EMAILJS_PRIVATE_KEY;
const dropboxAccessToken = import.meta.env.VITE_DROPBOX_ACCESS_TOKEN;
const dropboxSignaturePath = import.meta.env.VITE_DROPBOX_SIGNATURE_PATH || '/signatures';

const hasSignature = computed(() => {
  const saved = signaturePad.value?.saveSignature();
  return saved && !saved.isEmpty;
});

const signatureHelpText = computed(() => {
  if (dropboxAccessToken) {
    return 'Sign above to include an optional signature. It will upload securely to Dropbox when available.';
  }
  return 'Sign above to include an optional signature with your message.';
});

const resetStatus = () => {
  status.message = '';
  status.type = '';
};

const validateForm = () => form.name.trim() && form.contact.trim() && form.message.trim();

const dataUrlToBlob = (dataUrl) => {
  const [meta, base64Data] = dataUrl.split(',');
  const mimeMatch = meta.match(/data:(.*);base64/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const binary = atob(base64Data);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: mime });
};

const uploadSignatureToDropbox = async (dataUrl) => {
  if (!dropboxAccessToken || !dataUrl) return null;

  const dbx = new Dropbox({ accessToken: dropboxAccessToken, fetch });
  const fileName = `${Date.now()}-${form.name || 'signature'}.png`;
  const filePath = `${dropboxSignaturePath}/${fileName}`;
  const contents = dataUrlToBlob(dataUrl);

  const uploadResponse = await dbx.filesUpload({ path: filePath, contents });
  const shared = await dbx.sharingCreateSharedLinkWithSettings({ path: uploadResponse.result.path_lower });

  return shared.result.url ? shared.result.url.replace('?dl=0', '?raw=1') : null;
};

const clearSignature = () => {
  signaturePad.value?.clearSignature();
};

const undoSignature = () => {
  signaturePad.value?.undoSignature();
};

const buildTemplateParams = async () => {
  const saved = signaturePad.value?.saveSignature();
  const signatureData = saved && !saved.isEmpty ? saved.data : '';

  let signatureUrl = '';
  if (signatureData) {
    signatureUrl = (await uploadSignatureToDropbox(signatureData)) || '';
  }

  return {
    from_name: form.name,
    contact_method: form.contact,
    message: form.message,
    signature_url: signatureUrl,
    signature_data: signatureData,
    signature_included: Boolean(signatureData),
    dropbox_upload_used: Boolean(signatureUrl),
  };
};

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
    const templateParams = await buildTemplateParams();
    const sendOptions = emailPrivateKey
      ? { publicKey: emailPublicKey, privateKey: emailPrivateKey }
      : { publicKey: emailPublicKey };

    await emailjs.send(emailServiceId, emailTemplateId, templateParams, sendOptions);

    status.message = 'Thanks! Your message has been sent.';
    status.type = 'success';
    form.name = '';
    form.contact = '';
    form.message = '';
    clearSignature();
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

.contact__signature {
  border: 1px solid #2c2c2c;
  border-radius: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact__signature__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact__signature__label {
  margin: 0;
  color: #ffffff;
  font-weight: 600;
}

.contact__signature__actions {
  display: flex;
  gap: 0.5rem;
}

.contact__signature__action {
  background: transparent;
  border: 1px solid #FF761A;
  color: #FF761A;
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}

.contact__signature__action:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.contact__signature__pad {
  width: 100%;
  background: #151515;
  border-radius: 0.5rem;
  border: 1px dashed #FF761A;
}

.contact__signature__help {
  margin: 0;
  font-size: 0.9rem;
  color: #d1d1d1;
}
</style>
