<template>
  <div>AZS front-end</div>

  <div v-for="tank in tanks" :key="tank.id_tank">
    {{ tank }}
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

import type { Tank } from "@/models/Tank"

import { getTanks } from "@/services/api/tank/get-tanks"

const tanks = ref<Tank[]>([])

onMounted(async () => {
  const data = await getTanks()
  tanks.value = data
})
</script>
