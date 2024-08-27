<template>
  <div>
    <!-- <div class="upload-container" v-bind="getRootProps()">
      <input v-bind="getInputProps()" />
      <div class="upload-content">
        <div class="tw-flex tw-items-center tw-flex-col">
          <CloudUpload />
          <p class="mb-2">
            {{ isDragActive ? 'Drop file here' : 'Drag and drop the file here' }}
          </p>
          <p class="mb-4">Or</p>
          <div class="upload-btn" @click="open">
            Browse here
          </div>
        </div>
      </div>
    </div> -->
    <div class="image-input">
      <input
        id="app-images"
        type="file"
        ref="input"
        name="image"
        accept="image/*"
        @change="saveFileToLocal"
      />
    </div>
    <div class="error-wrapper" v-if="errMessages.length > 0">
      <p v-for="(message, idx) in errMessages" :key="idx" class="pl-1 text-red-accent-2">
        {{ message }}
      </p>
    </div>
    <v-row v-if="files.length > 0" class="image-preview">
      <v-col v-for="(file, idx) in files" :key="idx" cols="3">
        <CircleX v-if="startUpload === false" class="remove-img" @click="removeFile(idx)" />
        <v-card class="my-2" elevation="2" rounded>
          <v-img
            :src="file.src"
            height="64"
            cover
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, defineEmits } from 'vue'
import { CircleX } from 'lucide-vue-next'
// import { useDropzone } from "vue3-dropzone";
import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3"
import { openToastNotification } from '@/utils'

interface CustomFile extends File {
  src?: string;
}

const emit = defineEmits(['uploaded', 'uploadFailed']);

const props = defineProps({
  maxFileSize: {
    type: Number,
    default: 2000000,
  },
  allowMultipleFiles: {
    type: Boolean,
    default: false,
  },
  startUpload: {
    type: Boolean,
    default: false,
  }
});

const files = ref<CustomFile[]>([]);
const input = ref<HTMLInputElement | null>(null);
const errMessages = ref<string[]>([]);

watch(() => props.startUpload, (newValue) => {
  if (newValue !== true) return;

  const fileIsAdded = files.value.length > 0;
  const hasNoImageError = !errMessages.value.includes('Please provide an image');

  if (!fileIsAdded) {
    if (hasNoImageError) errMessages.value.push('Please provide an image');
    emit('uploadFailed');
    return;
  }
  console.log(newValue)
  console.log('calling upload')
  // handleFileUpload();
  emit('uploaded', [])
})

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
  };

  reader.readAsDataURL(file);
}

function removeFile(idx: number) {
  files.value.splice(idx, 1);
  if (!props.allowMultipleFiles && input.value) {
    input.value.disabled = false;
  }
}

function validateFile(file: File): boolean {
  let isValid = true;
  if (file.size > props.maxFileSize) {
    errMessages.value.push('File is too large. Maximum file size is 2MB.');
    isValid = false;
  }
  
  const fileType = file.type;
  if (!fileType.startsWith('image/')) {
    errMessages.value.push('Please upload a valid image file.');
    isValid = false;
  }

  if (isValid === true) {
    errMessages.value = [];
  }

  return isValid;
}

async function handleFileUpload(): Promise<void> {
  console.log('called')
  const uploadPayloads: PutObjectCommandInput[] = [];
  const urls: string[] = [];
  const promises: any[] = [];
  files.value.forEach(file => {
    const timestampprefix = new Date().getTime();
    const Key = `morebuy/${timestampprefix}_${file.name}`;
    uploadPayloads.push({
      Bucket: import.meta.env.VITE_AWS_S3_BUCKET,
      Key,
      Body: file,
      ContentType: file.type,
    })
  });

  try {
    const bucket = new S3Client({
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_S3_SECRET_ACCESS_KEY,
      },
      region: import.meta.env.VITE_AWS_S3_REGION,
    });

    for (const payload of uploadPayloads) {
      const command = new PutObjectCommand(payload);
      try {
        await bucket.send(command);
        urls.push(`https://fajo-bc.s3.amazonaws.com/${payload.Key}`);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
    openToastNotification({
      message: 'Error uploading payment proof',
    });
  }

  emit('uploaded', urls);
}

// const dropZoneOptions = {
//   onDrop,
//   maxFiles: 1,
//   multiple: false,
//   maxSize: 10000000,
//   noClick: true,
//   accept: "image/*"
// }

// const {
//   getRootProps,
//   getInputProps,
//   isDragActive,
//   acceptedFiles,
//   open,
//   isFileDialogActive,
//   ...rest
// } = useDropzone(dropZoneOptions);

// function onDrop(_acceptFiles: any[], rejectReasons: any[]) {
//   // console.log(acceptFiles);
//   console.log(rejectReasons);

//   if (rejectReasons.length > 0) {
//     handlFileError(rejectReasons[0]);
//   }
// }
</script>

<style lang="scss" scoped>
.upload-container {
  border: 1.8px dashed black;
  border-radius: 8px;
  width: 100%;
}

.upload-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.upload-btn {
  border: 1px solid #FE0000;
  color: #FE0000;
  padding: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
}

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
  margin-top: 20px;
  position: relative;

  .v-col {
    position: relative;
  }

  .remove-img {
    color: #FE0000;
    position: absolute;
    right: 0;
    z-index: 10;
    top: -1px;
    cursor: pointer;
  }
}

.error-wrapper {
  margin-top: 0.5rem;

  p {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
}
</style>
