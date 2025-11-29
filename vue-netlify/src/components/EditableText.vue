<script setup>
import { computed, onMounted, ref, useAttrs } from 'vue';

const props = defineProps({
  contentKey: {
    type: String,
    required: true,
  },
  defaultText: {
    type: String,
    default: '',
  },
  tag: {
    type: String,
    default: 'p',
  },
  editable: {
    type: Boolean,
    default: false,
  },
  multiline: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const STORAGE_KEY = 'welderdave-editable-content';

const attrs = useAttrs();
const content = ref(props.defaultText);
const draft = ref(props.defaultText);
const editing = ref(false);
const storageCache = ref({});

const passthroughAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});

const mergedClasses = computed(() => ['editable-text__content', attrs.class].filter(Boolean));

const displayText = computed(() => content.value || props.defaultText || props.placeholder);

const loadContent = () => {
  if (typeof window === 'undefined') return;

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    storageCache.value = saved && typeof saved === 'object' ? saved : {};

    if (storageCache.value[props.contentKey]) {
      content.value = storageCache.value[props.contentKey];
      draft.value = storageCache.value[props.contentKey];
    }
  } catch (error) {
    console.error('Unable to load editable content', error);
    storageCache.value = {};
  }
};

const persistContent = () => {
  if (typeof window === 'undefined') return;

  storageCache.value = {
    ...storageCache.value,
    [props.contentKey]: content.value,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageCache.value));
  } catch (error) {
    console.error('Unable to save editable content', error);
  }
};

const startEditing = () => {
  draft.value = content.value;
  editing.value = true;
};

const cancelEditing = () => {
  draft.value = content.value;
  editing.value = false;
};

const saveDraft = () => {
  content.value = draft.value?.trim?.() ? draft.value : props.placeholder || props.defaultText;
  editing.value = false;
  persistContent();
};

onMounted(loadContent);
</script>

<template>
  <div class="editable-text" :data-editable="editable">
    <div v-if="editable" class="editable-text__toolbar" aria-label="Owner text controls">
      <span class="editable-text__badge">Owner editable</span>
      <div class="editable-text__actions">
        <button type="button" class="editable-text__button" @click="editing ? cancelEditing() : startEditing()">
          {{ editing ? 'Cancel' : 'Edit text' }}
        </button>
        <button v-if="editing" type="button" class="editable-text__button editable-text__button--primary" @click="saveDraft">
          Save
        </button>
      </div>
    </div>

    <component
      v-if="!editable || !editing"
      :is="tag"
      v-bind="passthroughAttrs"
      :class="mergedClasses"
    >
      {{ displayText }}
    </component>

    <div v-else class="editable-text__editor">
      <label class="editable-text__label">
        Update text
        <textarea
          v-if="multiline"
          v-model="draft"
          class="editable-text__input editable-text__input--textarea"
          rows="4"
        ></textarea>
        <input v-else v-model="draft" type="text" class="editable-text__input" />
      </label>
    </div>
  </div>
</template>

<style scoped>
.editable-text {
  position: relative;
}

.editable-text__content {
  display: inherit;
}

.editable-text__toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
  font-size: 0.85rem;
}

.editable-text__badge {
  background: #0f172a;
  color: #e2e8f0;
  padding: 0.2rem 0.5rem;
  border-radius: 0.4rem;
  font-weight: 600;
}

.editable-text__actions {
  display: flex;
  gap: 0.35rem;
}

.editable-text__button {
  border: 1px solid #cbd5e1;
  background: white;
  color: #0f172a;
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.editable-text__button--primary {
  background: #ff761a;
  border-color: #ff761a;
  color: white;
}

.editable-text__button:hover {
  background: #f8fafc;
}

.editable-text__button--primary:hover {
  background: #ea5b00;
}

.editable-text__editor {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.editable-text__label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-weight: 600;
}

.editable-text__input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border-radius: 0.65rem;
  border: 1px solid #cbd5e1;
  font: inherit;
}

.editable-text__input--textarea {
  min-height: 120px;
  resize: vertical;
}
</style>
