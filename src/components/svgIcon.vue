<template>
  <div>
    <svg aria-hidden="true" class="cy-svg">
      <!-- #icon-⽂件夹名称-图⽚名称 -->
      <use :href="`#icon-login-eye-${show ? 'on' : 'off'}`" />
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  show: Boolean
})
</script>

<style lang="scss" scoped>
.cy-svg {
  width: 1em;
  height: 1em;
}
</style>
