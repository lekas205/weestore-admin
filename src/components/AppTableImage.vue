<template>
  <div
    class="table-image"
    :style="{'background-image': `url(${url})`}"
  ></div>
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
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 2.5rem;
  height: 2.5rem;
}
</style>
