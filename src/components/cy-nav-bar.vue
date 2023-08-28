<template>
  <div>
    <van-nav-bar
      :title="title"
      :right-text="rigText"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const props = defineProps({
  title: String,
  rigText: String
})
const emit = defineEmits(['btnRight'])
const onClickLeft = () => history.back()
const onClickRight = () => {
  emit('btnRight')
}
</script>

<style lang="scss"></style>
