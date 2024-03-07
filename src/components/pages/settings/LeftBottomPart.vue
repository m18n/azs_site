<template>
  <div class="flex flex-col py-3 px-5 box-border">
    <div
      class="grow text-lg font-bold"
      @click="selectSection('levelMeter')"
    >
      {{ sections.levelMeter }}
    </div>

    <div
      class="grow text-lg font-bold"
      @click="selectSection('cashDesk')"
    >
      {{ sections.cashDesk }}
    </div>

    <div
      class="grow text-lg font-bold"
      @click="selectSection('adjustment')"
    >
      {{ sections.adjustment }}
    </div>

    <n-modal
      v-if="selectedSection !== ''"
      v-model:show="showModal"
      preset="card"
      class="w-[600px]"
      :title="sections[selectedSection]"
      :bordered="false"
      size="huge"
    >
      // TODO
    </n-modal>

    <div class="shrink">
      <AppLink
        external
        path="/old/main/settings"
      >
        <n-button
          size="large"
          type="warning"
        >
          Вихід
        </n-button>
      </AppLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NModal } from "naive-ui"

import AppLink from "@/components/global/AppLink.vue"
import { ref } from "vue"

type Section = "levelMeter" | "cashDesk" | "adjustment"

const sections: Record<Section, string> = {
  levelMeter: "Рівномір",
  cashDesk: "Каса",
  adjustment: "Юстирування",
}

const selectedSection = ref<Section | "">("")
const showModal = ref(false)

const selectSection = (section: Section) => {
  selectedSection.value = section
  showModal.value = true
}
</script>
