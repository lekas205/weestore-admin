<template>
  <div>
    <div class="image-input">
      <input
        id="app-images"
        type="file"
        ref="input"
        name="image"
        accept="image/*"
        :disabled="internalDisable"
        @change="saveFileToLocal"
      />
    </div>
    <v-row v-if="internalExistingImages.length > 0 || files.length >0" class="image-preview">
      <v-col
        v-for="(file, idx) in files"
        :key="idx"
        cols="3"
        class="tw-relative mt-7"
      >
        <CircleX v-if="disabled === false" class="remove-img" @click="removeFile(idx)" />
        <v-card class="my-2" elevation="2" rounded>
          <v-img
            :src="file.src"
            height="64"
            cover
          ></v-img>
        </v-card>
      </v-col>
      <v-col
        v-for="(url, idx) in internalExistingImages"
        :key="idx"
        cols="3"
        class="tw-relative mt-7"
      >
        <CircleX v-if="disabled === false" class="remove-img" @click="removeExistingImage(idx)" />
        <v-card class="my-2" elevation="2" rounded>
          <v-img
            :src="url"
            height="64"
            cover
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { CircleX } from 'lucide-vue-next'
// import { useDropzone } from "vue3-dropzone";
import { handleFileUpload, openToastNotification } from '@/utils'

interface CustomFile extends File {
  src?: string;
}

interface Props {
  maxFileSize?: number;
  allowMultipleFiles?: boolean;
  disabled?: boolean;
  startUpload?: boolean;
  existingImages?: Array<string>;
}

const emit = defineEmits([
  'uploadCompleted',
  'savedFile',
  'fileError',
]);

const props = withDefaults(defineProps<Props>(), {
  maxFileSize: 2000000, // 2MB
  allowMultipleFiles: false,
  disabled: false,
  startUpload: false,
  existingImages: () => [] as Array<string>,
});

const input = ref<HTMLInputElement | null>(null);
const files = ref<CustomFile[]>([]);
const internalExistingImages = ref<Array<string>>([...props.existingImages]);


const internalDisable = computed(() => {
  if (
    !props.allowMultipleFiles && 
    (files.value.length == 1 || props.existingImages.length == 1) 
  ) {
    return true;
  }
  else {
    return props.disabled
  }
})

watch(() => props.startUpload, async (upload) => {
  if (upload !== true) return;

  const fileIsAdded = files.value.length > 0;

  if (!fileIsAdded) {
    console.log('no file uploaded')
    emit('uploadCompleted', [...internalExistingImages.value]);
  }
  else {
    console.log('calling upload');
    console.log(internalExistingImages.value)
    const urls = await handleFileUpload([...files.value]);
    console.log(urls)
    if (urls) {
      emit('uploadCompleted', [
        ...internalExistingImages.value,
        ...urls,
      ]);
    }
    else {
      openToastNotification({
        message: 'Error uploading Image(s)',
      });
      emit('uploadCompleted', null);
      emit('fileError', 'Error uploading Image(s)');
    }
  }
})

function emitSavedFiles() {
  emit('savedFile', [
    ...files.value,
    ...internalExistingImages.value
  ])
}

function validateFile(file: File): boolean {
  let isValid = true;
  const fileType = file.type;

  if (!fileType.startsWith('image/')) {
    emit('fileError', 'Please upload a valid image file.');
    isValid = false;
  }
  else if (file.size > props.maxFileSize) {
    emit('fileError', 'File is too large. Maximum file size is 2MB.');
    isValid = false;
  }

  if (isValid === true) {
    emit('fileError', null);
  }

  return isValid;
}

function saveFileToLocal(event: any): void {
  const file: File = event.target.files[0];

  if (!file) return;
  const isValidFile = validateFile(file);

  if (isValidFile) {
    handleFilePreview(file);

    if (!props.allowMultipleFiles && input.value) {
      input.value.disabled = true;
    }
  }

  if (input.value) {
    input.value.value = '';
  }
}

function handleFilePreview(file: File) {
  const reader = new FileReader();

  reader.onload = function(e) {
    file['src'] = e.target?.result as string;
    files.value.push(file);
    emitSavedFiles();
  };

  reader.readAsDataURL(file);
}

function removeFile(idx: number) {
  files.value.splice(idx, 1);
  if (!props.allowMultipleFiles && input.value) {
    input.value.disabled = false;
  }

  emitSavedFiles();
}

function removeExistingImage(idx: number) {
  internalExistingImages.value.splice(idx, 1);
  if (!props.allowMultipleFiles && input.value) {
    input.value.disabled = false;
  }

  emitSavedFiles();
}
</script>

<style lang="scss" scoped>
.image-input {
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;

  label {
    font-weight: 500;
    margin-bottom: 0.25rem
  }

  input {
    flex-basis: 100%;
    cursor: pointer;
  }
}

.image-preview {

  .remove-img {
    color: #FE0000;
    position: absolute;
    right: 0;
    z-index: 10;
    top: 0px;
    cursor: pointer;
  }
}
</style>
