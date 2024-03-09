<template>
  <n-thing>
    <div
      v-for="pist in copiedTrk.pists"
      :key="pist.id_pist"
      class="mb-2 flex items-center gap-3 last:mb-0"
    >
      Пістолет {{ pist.id_pist }}:
      <span class="ml-3">Резервуар</span>
      <n-select
        v-model:value="pist.id_tank"
        :options="tankOptions"
        class="w-20"
        @update:value="$emit('update', copiedTrk)"
      />
      ->
      <ProductTitle
        class="cursor-pointer font-bold"
        :product="getProductByPist(pist)"
        @click.stop="$emit('show-product', getProductByPist(pist))"
      />
    </div>
  </n-thing>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue"
import cloneDeep from "clone-deep"

import { NThing, NSelect, type SelectOption } from "naive-ui"

import type { Product } from "@/models/Product"
import type { Trk } from "@/models/Trk"

import ProductTitle from "@/components/common/ProductTitle.vue"

import { getProductByPist, tanks } from "@/store/settings"

const props = defineProps<{
  trk: Trk
}>()

defineEmits<{
  update: [trk: Trk]
  "show-product": [product: Product]
}>()

const copiedTrk = reactive(cloneDeep(props.trk))

const tankOptions = computed<SelectOption[]>(() =>
  tanks.value.map<SelectOption>((tank) => ({
    label: tank.id_tank.toString(),
    value: tank.id_tank,
  })),
)
</script>
