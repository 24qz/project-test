<template>
  <div>
    <div class="big"></div>
    {{ Info }}
    {{ num }}
    <button @click="store.add" class="btndj">点击</button>
    <van-button type="primary">vant点击</van-button>
  </div>
</template>

<script setup lang="ts">
import { Button as VanButton } from 'vant'
import { ref, reactive, watch, computed, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStore } from './stores/counter'
const store = useStore()
const { Info, num } = storeToRefs(store)
</script>

<style lang="scss" scoped>
.big {
  width: 300px;
  height: 300px;
  background-color: aqua;
}
.btndj {
  width: 120px;
  height: 60px;
  background-color: beige;
}
</style>
