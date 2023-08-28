<template>
  <div></div>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { Button as VanButton } from 'vant'
import { ref, reactive, watch, computed, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
</script>

<style lang="scss" scoped></style>
