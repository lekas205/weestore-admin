<template>
  <button :class="[
    fullClass,
    disabled ? 'disabled' : '',
    loading ? 'loading' : '',
    secondary ? 'secondary' : '',
  ]" :disabled="disabled" :secondary="secondary">
    <svg v-if="loading" class="tw-mr-3" xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity="0.25" />
      <path fill="currentColor"
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
        <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate"
          values="0 12 12;360 12 12" />
      </path>
    </svg>
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: 'MbButton',

  props: {
    full: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      disableClass: this.disabled === true ? 'disabled' : '',
      fullClass: this.full ? 'full' : '',
    }
  },

  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit('click')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  padding: 10px 15px;
  border: none;
  color: white;
  font-size: 18px;
  border-radius: 10px;
  background-color: #FE0000;
  cursor: pointer;
  display: flex;
  justify-content: center;
  // gap: 10px;
}

.full {
  width: 100%;
}

.disabled {
  cursor: not-allowed;
}

.secondary {
  background-color: #fbded9;
  color: #f35c35;
}

.loading {
  cursor: not-allowed;
}

.spinner {
  align-self: center;
}
</style>
