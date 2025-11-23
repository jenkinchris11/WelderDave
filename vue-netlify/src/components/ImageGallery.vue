<script setup>
import { reactive, ref, watch } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
  editable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:images']);

const selectedImage = ref(null);
const formError = ref('');
const newImage = reactive({
  src: '',
  alt: '',
});
const uploadFile = ref(null);
const uploadAlt = ref('');
const uploadError = ref('');
const uploadStatus = ref('');
const isUploading = ref(false);

const GITHUB_OWNER = import.meta.env.VITE_GITHUB_REPO_OWNER || '';
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO_NAME || '';
const GITHUB_BRANCH = import.meta.env.VITE_GITHUB_BRANCH || 'main';
const GITHUB_MEDIA_PATH = import.meta.env.VITE_GITHUB_MEDIA_PATH || 'gallery-uploads';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    selectedImage.value = null;
  }
};

const addImage = () => {
  if (!newImage.src.trim()) {
    formError.value = 'Please provide an image URL to add it to the gallery.';
    return;
  }

  const updatedImages = [
    ...props.images,
    {
      id: `custom-${Date.now()}`,
      src: newImage.src.trim(),
      alt: newImage.alt.trim() || 'Gallery image',
    },
  ];

  emit('update:images', updatedImages);
  newImage.src = '';
  newImage.alt = '';
  formError.value = '';
};

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const buildRepoPath = (filename) => {
  const sanitizedName = filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.-]/g, '');

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, '-')
    .replace('T', '_')
    .replace('Z', '');

  return `${GITHUB_MEDIA_PATH}/${timestamp}-${sanitizedName || 'upload'}`;
};

const uploadToGitHub = async () => {
  uploadError.value = '';
  uploadStatus.value = '';

  if (!uploadFile.value) {
    uploadError.value = 'Choose an image file to upload to the repository.';
    return;
  }

  if (!GITHUB_OWNER || !GITHUB_REPO || !GITHUB_TOKEN) {
    uploadError.value =
      'GitHub upload is not configured. Please set VITE_GITHUB_REPO_OWNER, VITE_GITHUB_REPO_NAME, and VITE_GITHUB_TOKEN.';
    return;
  }

  isUploading.value = true;

  try {
    const content = await toBase64(uploadFile.value);
    const targetPath = buildRepoPath(uploadFile.value.name);

    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${targetPath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: `Add gallery image ${uploadFile.value.name}`,
          content,
          branch: GITHUB_BRANCH,
        }),
      }
    );

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      throw new Error(errorPayload?.message || 'Upload failed.');
    }

    const payload = await response.json();
    const rawUrl = payload?.content?.download_url;

    if (!rawUrl) {
      throw new Error('Upload succeeded but no download URL was returned.');
    }

    const updatedImages = [
      ...props.images,
      {
        id: `upload-${Date.now()}`,
        src: rawUrl,
        alt: uploadAlt.value.trim() || uploadFile.value.name,
      },
    ];

    emit('update:images', updatedImages);
    uploadStatus.value = 'Uploaded to GitHub and added to the gallery.';
    uploadFile.value = null;
    uploadAlt.value = '';
  } catch (error) {
    uploadError.value = error.message || 'Unable to upload image right now.';
  } finally {
    isUploading.value = false;
  }
};

const handleUploadSelection = (event) => {
  const [file] = event.target.files || [];
  uploadFile.value = file || null;
  uploadError.value = '';
  uploadStatus.value = '';
};

const removeImage = (id) => {
  const updatedImages = props.images.filter((image) => image.id !== id);
  emit('update:images', updatedImages);
};

const updateImageField = (id, field, value) => {
  const updatedImages = props.images.map((image) =>
    image.id === id
      ? {
          ...image,
          [field]: value,
        }
      : image
  );

  emit('update:images', updatedImages);
};

watch(
  selectedImage,
  (image) => {
    if (image) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeydown);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeydown);
    }
  },
  { immediate: true }
);
</script>

<template>
  <section class="gallery">
    <header class="gallery__header">
      <p class="eyebrow">Swipe Gallery</p>
      <h3>See everything WelderDave can fabricate</h3>
      <p>
        Explore high-resolution shots of mobile welding repairs, ornate gates, and
        heavy-duty fabrication. Swipe or drag through the gallery to view every project image.
      </p>
    </header>

    <div v-if="editable" class="gallery__owner-tools" aria-label="Owner gallery controls">
      <div class="gallery__owner-header">
        <h4>Owner controls</h4>
        <p class="gallery__owner-note">
          Changes are saved in this browser. Uploads push directly to your GitHub repo and appear in the gallery instantly.
        </p>
       </div>
      </div>

      <form class="gallery__owner-form" @submit.prevent="addImage">
        <div class="gallery__owner-field">
          <label for="new-image-src">Image URL</label>
          <input
            id="new-image-src"
            v-model="newImage.src"
            type="url"
            placeholder="https://example.com/photo.jpg"
            required
          />
        </div>
        <div class="gallery__owner-field">
          <label for="new-image-alt">Alt text</label>
          <input
            id="new-image-alt"
            v-model="newImage.alt"
            type="text"
            placeholder="Describe the photo"
          />
        </div>
        <div class="gallery__owner-actions">
          <button type="submit" class="gallery__owner-button">Add image</button>
          <p v-if="formError" class="gallery__owner-error" role="alert">{{ formError }}</p>
        </div>
      </form>

      <div class="gallery__owner-upload">
        <div class="gallery__owner-field">
          <label for="upload-image">Upload to GitHub</label>
        <p class="gallery__owner-note">Changes are saved in this browser so you can curate the gallery.</p>
      </div>

      <div class="gallery__owner-upload">
        <div class="gallery__owner-field">
          <label for="upload-image">Upload Image</label>
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            @change="handleUploadSelection"
          />
        </div>
        <div class="gallery__owner-field">
          <label for="upload-image-alt">Alt text</label>
          <input
            id="upload-image-alt"
            v-model="uploadAlt"
            type="text"
            placeholder="Describe the photo"
          />
        </div>
        <div class="gallery__owner-actions">
          <button
            type="button"
            class="gallery__owner-button"
            @click="uploadToGitHub"
            :disabled="isUploading"
          ></button>
            {{ isUploading ? 'Uploading…' : 'Upload to repo and add' }}
          <button type="button" @click="uploadToGitHub" :disabled="isUploading">
            {{ isUploading ? 'Uploading…' : 'Upload and add to Gallery' }}
          </button>
          <p v-if="uploadStatus" class="gallery__owner-success">{{ uploadStatus }}</p>
          <p v-if="uploadError" class="gallery__owner-error" role="alert">{{ uploadError }}</p>
        </div>
      </div>

      <div v-if="images.length" class="gallery__owner-list" aria-label="Current gallery images">
        <div v-for="image in images" :key="image.id" class="gallery__owner-row">
          <div class="gallery__owner-field">
            <label :for="`image-src-${image.id}`">Image URL</label>
            <input
              :id="`image-src-${image.id}`"
              :value="image.src"
              type="url"
              @input="updateImageField(image.id, 'src', $event.target.value)"
            />
          </div>
          <div class="gallery__owner-field">
            <label :for="`image-alt-${image.id}`">Alt text</label>
            <input
              :id="`image-alt-${image.id}`"
              :value="image.alt"
              type="text"
              @input="updateImageField(image.id, 'alt', $event.target.value)"
            />
          </div>
          <button type="button" class="gallery__owner-remove" @click="removeImage(image.id)">
            Remove
          </button>
        </div>
      </div>
      <p v-else class="gallery__owner-note">No images yet. Add one to get started.</p>
    </div>

    <div v-if="images.length" class="gallery__viewport" aria-label="Swipeable gallery of WelderDave projects">
      <div class="gallery__track">
        <figure v-for="(image, index) in images" :key="image.id" class="gallery__item">
          <button
            type="button"
            class="gallery__button"
            @click="selectedImage = image"
            aria-label="View larger image"
          >
            <img :src="image.src" :alt="image.alt" loading="lazy" />
          </button>
        </figure>
      </div>
    </div>

    <p v-else class="gallery__empty">No gallery images yet. Log in as the owner to add photos.</p>

    <div v-if="selectedImage" class="gallery-modal" role="dialog" aria-modal="true" aria-label="Expanded gallery image" @click.self="selectedImage = null">
      <div class="gallery-modal__content">
        <button class="gallery-modal__close" type="button" @click="selectedImage = null" aria-label="Close image">
          ✕
        </button>
        <img :src="selectedImage.src" :alt="selectedImage.alt" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  background: white;
  border-radius: 1.5rem;
  padding: 2.25rem 1.5rem 2.75rem;
  box-shadow: 0 35px 70px -45px rgba(15, 23, 42, 0.45);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.gallery__header {
  max-width: 720px;
  text-align: center;
}

.gallery__header h3 {
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  margin: 0.5rem 0;
}

.gallery__header p:last-of-type {
  color: #475569;
  line-height: 1.6;
}

.eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-weight: 600;
  color: #94a3b8;
}

.gallery__owner-tools {
  width: 100%;
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.gallery__owner-header h4 {
  margin: 0;
}

.gallery__owner-note {
  margin: 0;
  color: #cbd5e1;
}

.gallery__owner-form {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.75rem;
  align-items: end;
}

.gallery__owner-upload {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.75rem;
  align-items: end;
}

.gallery__owner-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.gallery__owner-field label {
  font-weight: 600;
  color: #e2e8f0;
}

.gallery__owner-field input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border-radius: 0.55rem;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
}

.gallery__owner-field input:focus {
  outline: 2px solid #ff761a;
  outline-offset: 2px;
  border-color: #ff761a;
}

.gallery__owner-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.gallery__owner-button,
.gallery__owner-form button,
.gallery__owner-remove {
  background: linear-gradient(135deg, #ff9f43, #ff6a00);
  color: #0f172a;
  border: 1px solid #ff8a3d;
  border-radius: 0.85rem;
  padding: 0.75rem 1.35rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  box-shadow: 0 12px 30px -14px rgba(255, 118, 26, 0.75), 0 4px 14px -8px rgba(0, 0, 0, 0.25);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  text-decoration: none;
}

.gallery__owner-button:hover,
.gallery__owner-form button:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
  box-shadow: 0 16px 32px -14px rgba(255, 118, 26, 0.85), 0 6px 18px -10px rgba(0, 0, 0, 0.3);
}

.gallery__owner-button:focus-visible,
.gallery__owner-form button:focus-visible {
  outline: 2px solid #ffb76b;
  outline-offset: 2px;
.gallery__owner-form button,
.gallery__owner-remove {
  background: #ff761a;
  color: #0f172a;
  border: none;
  border-radius: 0.75rem;
  padding: 0.65rem 1.25rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  box-shadow: 0 16px 25px -18px rgba(255, 118, 26, 0.9);
}

.gallery__owner-actions button:disabled {
  opacity: 0.75;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.gallery__owner-remove {
  justify-self: flex-start;
  background: #991b1b;
  color: #fee2e2;
  box-shadow: none;
}

.gallery__owner-remove:hover {
  background: #7f1d1d;
}

.gallery__owner-form button:hover,
.gallery__owner-remove:hover {
  transform: translateY(-1px);
}

.gallery__owner-error {
  margin: 0;
  color: #fca5a5;
  font-weight: 700;
}

.gallery__owner-success {
  margin: 0;
  color: #34d399;
  font-weight: 700;
}

.gallery__owner-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.gallery__owner-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
  background: #111827;
  border: 1px solid #1f2937;
  padding: 0.75rem;
  border-radius: 0.85rem;
  align-items: end;
}

.gallery__empty {
  color: #475569;
  margin: 0;
  text-align: center;
}

.gallery__viewport {
  overflow: hidden;
  position: relative;
}

.gallery__track {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 0.75rem;
}

.gallery__track::-webkit-scrollbar {
  height: 10px;
}

.gallery__track::-webkit-scrollbar-thumb {
  background: #cbd5f5;
  border-radius: 999px;
}

.gallery__item {
  flex: 0 0 82%;
  scroll-snap-align: center;
  border-radius: 1.25rem;
  overflow: hidden;
  position: relative;
  background: #0f172a;
  aspect-ratio: 4 / 3;
}

@media (min-width: 768px) {
  .gallery__item {
    flex-basis: 25%;
  }

  .gallery__header {

  }
}

.gallery__button {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.gallery__button:focus-visible {
  outline: 2px solid #ff761a;
  outline-offset: 4px;
}

.gallery__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery__item figcaption {
  position: absolute;
  bottom: 0.75rem;
  right: 1rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.8);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
}

.gallery-modal {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  z-index: 1000;
}

.gallery-modal__content {
  position: relative;
  max-width: min(90vw, 1100px);
  max-height: calc(100vh - 3rem);
  border-radius: 1rem;
  background: #000;
  padding: clamp(0.75rem, 2vw, 1.25rem);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-modal__content img {
  display: block;
  max-width: 100%;
  max-height: calc(100vh - 6rem);
  width: auto;
  height: auto;
  object-fit: contain;
  background: #000;
}

.gallery-modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-modal__close:focus-visible {
  outline: 2px solid #ff761a;
  outline-offset: 2px;
}
</style>
