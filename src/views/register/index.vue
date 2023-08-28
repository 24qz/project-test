<template>
  <div>
    <cy-nav-bar :title="title"></cy-nav-bar>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const title = '注册'
</script>

<style lang="scss" scoped></style>
