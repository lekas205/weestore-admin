<template>
  <div class="input-group d-flex align-center rounded-lg pa-3">
    <slot name="prepend-icon"></slot>
    <input
      v-model="text"
      :placeholder="label"
      :type="isPassword ? passwordType : inputType"
      :required="required"
      v-bind="$attrs"
    />
    <div class="cursor-pointer mr-3 d-flex" v-if="isPassword">
      <svg v-if="!showPassword" @click="togglePassword" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
      <svg v-if="showPassword" @click="togglePassword" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
    </div>
    <slot v-else name="append-icon"></slot>
  </div>
</template>

<script lang="ts">
import eyeOpen from '@/assets/images/svg/eyeOpen.svg'
import eyeClosed from '@/assets/images/svg/eyeClosed.svg'

export default {
  name: 'MbInput',
  inheritAttrs: false,
  data() {
    return {
      text: this.value,
      showPassword: false,
      inputType: this.type,
      isFocused: false,
      eyeClosed,
      eyeOpen,
    }
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    isPassword: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    passwordType() {
      return this.showPassword ? 'text' : 'password'
    }
  },

  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
}
</script>

<style lang="scss" scoped>
.input-group {
  border: 1px solid #A4A9AE;
}

.input-group>input, .input-group>select {
  width: 100%;
  background-color: transparent;
}

.input-group>input:focus, .input-group>select:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
</style>