<template>
  <div class="login-wrapper">
    <div class="image-side">
      <img src="@/assets/images/png/login-image.png" alt="">
    </div>
    <div class="form-side">
      <div class="form-wrapper">
        <h1 class="tw-text-4xl mb-10 mt-10">Login</h1>
        <form @submit.prevent="login">
          <div class="mb-6">
            <p class="tw-font-medium">Username</p>
            <app-input
              v-model="formData.username"
              label="Username"
              type="text"
              @blur="validateUsername"
              @input="validateUsername"
            />
            <p v-if="usernameErrMsg" class="pl-1 text-red-accent-2">
              {{ usernameErrMsg }}
            </p>
          </div>
          <div class="mb-6">
            <p>Password</p>
            <app-input
              v-model="formData.password"
              label="Password"
              type="password"
              @blur="validatePassword"
              @input="validatePassword"
            />
            <p v-if="passwordErrMsg" class="pl-1 text-red-accent-2">
              {{ passwordErrMsg }}
            </p>
          </div>
          <div>
            <app-button :loading="isLoading" full>
              Login
            </app-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { LoginDto } from '@/types'
import { useAuthStore } from '@/stores'
import { ROUTES } from '@/constants'
import AppInput from '@/components/AppInput.vue';
import AppButton from '@/components/AppButton.vue';

const authStore = useAuthStore();
const router = useRouter();
const isLoading = ref(false);
const formData = ref<Partial<LoginDto>>({});
const usernameErrMsg = ref<null | string>(null);
const passwordErrMsg = ref<null | string>(null);

function validateUsername(): boolean {
  if (!formData.value.username) {
    usernameErrMsg.value = 'Please enter your email';
    return false;
  }
  else {
    usernameErrMsg.value = null;
  }

  return true;
}

function validatePassword(): boolean {
  if (!formData.value.password) {
    passwordErrMsg.value = 'Please enter your password';
    return false;
  }
  else {
    passwordErrMsg.value = null;
  }

  return true;
}

async function login() {
  const isValidPassword = validatePassword();
  const isValidUsername = validateUsername();
  if (!isValidPassword || !isValidUsername) return;

  isLoading.value = true;
  try {
    const success = await authStore.login({
      username: formData.value.username as string,
      password: formData.value.password as string,
    });

    if (success) {
      router.push(ROUTES.dashboard.path);
    }
  }
  catch (error) {
    console.log(error);
  }
  finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  min-height: 100%;
}

.image-side {
  flex: 0 0 40%;

  img {
    height: 100%;
  }
}

.form-side {
  flex: 0 0 60%;
  padding: 2rem;
}

.form-wrapper {
  width: 70%;
  margin: auto;
}
</style>
