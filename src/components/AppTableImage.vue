<template>
  <div class="table-image">
    <img
      class="tw-w-full tw-h-full tw-object-cover"
      :src="url"
    />
  </div>

</template>

<script setup>

defineProps({
  url: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.table-image {
  border-radius: 50%;
  overflow: hidden;
  width: 2.5rem;
  height: 2.5rem;
}
</style>
