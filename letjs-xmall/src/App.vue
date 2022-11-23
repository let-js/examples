<template>
  <n-config-provider :theme="theme">
    <app-provider>
      <router-view></router-view>
    </app-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import AppProvider from './components/Application.vue'
import { ref } from 'vue'
import { darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'

const theme = ref<GlobalTheme | null>(null)
</script>

<style lang="scss" scoped></style>
