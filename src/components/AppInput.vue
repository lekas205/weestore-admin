<template>
  <div class="input-group d-flex align-center rounded-lg">
    <slot name="prepend-icon"></slot>
    <input
      :value="props.value"
      :placeholder="label"
      :type="internalType"
      v-bind="$attrs"
      @input="emits('update:modelValue', $event.target.value)"
    />
    <div class="password-icon" v-if="type == 'password'">
      <svg v-if="!showPassword" @click="showPassword = !showPassword" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
      <svg v-if="showPassword" @click="showPassword = !showPassword" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
    </div>
    <slot v-else name="append-icon"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const model = ref("");

interface Props {
  label?: string;
  type?: string;
  value?: string | number
}
const emits = defineEmits<{
  (e: "update:modelValue", data: any): void;
}>();
const props = withDefaults(defineProps<Props>(), {
  label: '',
  type: 'text',
  value: "" ,
})

defineOptions({
  inheritAttrs: false
})

watch(
  () => model.value,
  (newvalue) => {
    emits("update:modelValue", newvalue);
  }
);

const showPassword = ref(false);
const internalType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password';
  }
  else {
    return props.type;
  }
});
</script>

<style lang="scss" scoped>
.input-group {
  border: 1px solid #A4A9AE;
  padding: 12px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.input-group>input, .input-group>select {
  width: 100%;
  background-color: transparent;
}

.input-group>input:focus, .input-group>select:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.password-icon {
  cursor: pointer;
  margin-left: 0.5rem;
}

</style>