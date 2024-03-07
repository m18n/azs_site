<template>
  <main class="px-3">
    <n-grid x-gap="12" :cols="3">
      <n-grid-item class="max-h-[100dvh] overflow-auto">
        <n-list hoverable clickable class="h-1/2 overflow-auto">
          <template #header>
            <div class="text-lg font-bold">Види палива</div>
          </template>

          <n-list-item v-for="(product, ind) in products" :key="product.id_tovar" @click="showProduct(product)">
            <n-thing :title="`${ind + 1}. ${product.name_p}`" />
          </n-list-item>
        </n-list>

        <n-modal
          v-if="selectedProduct"
          v-model:show="showSelectedProduct"
          preset="card"
          class="w-[600px] h-md:w-[800px]"
          :title="selectedProduct.name_p_f"
          :bordered="false"
          size="huge"
        >
          <ProductEditForm :product="selectedProduct" @update="saveSelectedProduct" />
        </n-modal>

        <LeftBottomPart class="h-1/2" />
      </n-grid-item>

      <n-grid-item class="max-h-[100dvh] overflow-auto">
        <n-list>
          <template #header>
            <div class="text-lg font-bold">Резервуари</div>
          </template>

          <n-list-item v-for="tank in tanks" :key="tank.id_tank">
            <n-thing>
              <template #header>
                {{ tank.id_tank }}.
                <ProductTitle :product="getProductByTank(tank)" uncolored></ProductTitle>
              </template>
            </n-thing>
          </n-list-item>
        </n-list>
      </n-grid-item>

      <n-grid-item class="max-h-[100dvh] overflow-auto">
        <n-list hoverable clickable>
          <template #header>
            <div class="text-lg font-bold">Колонки</div>
          </template>

          <n-list-item v-for="trk in trks" :key="trk.id_trk" @click="toggleTrk(trk)">
            <n-thing :title="`TRK ${trk.id_trk}`" />
          </n-list-item>
        </n-list>

        <n-modal
          v-if="selectedTrk"
          v-model:show="showSelectedTrk"
          preset="card"
          :style="{ width: '600px' }"
          :title="`TRK ${selectedTrk.id_trk}`"
          :bordered="false"
          size="huge"
        >
          <n-thing>
            <div v-for="pist in selectedTrk.pists" :key="pist.id_pist" class="flex items-center gap-3 mb-2 last:mb-0">
              Пістолет {{ pist.id_pist }}:
              <span class="ml-3">Резервуар</span>
              <n-select v-model:value="pist.id_tank" :options="tankOptions" class="w-20" @update:value="changeTankOfSelectedPist" />
              ->
              <ProductTitle class="font-bold cursor-pointer" :product="getProductByPist(pist)" @click.stop="showProduct(getProductByPist(pist))" />
            </div>
          </n-thing>
        </n-modal>
      </n-grid-item>
    </n-grid>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

import { NList, NListItem, NThing, NGrid, NGridItem, NModal, NSelect, type SelectOption } from "naive-ui"

import type { Tank } from "@/models/Tank"
import type { Product } from "@/models/Product"
import type { Pist, Trk } from "@/models/Trk"

import ProductTitle from "@/components/common/ProductTitle.vue"
import ProductEditForm from "@/components/common/ProductEditForm.vue"

import LeftBottomPart from "@/components/pages/settings/LeftBottomPart.vue"

import { getAllSettings } from "@/services/api/settings/get-all"
import { setAllSettings } from "@/services/api/settings/set-all"

const tanks = ref<Tank[]>([])
const products = ref<Product[]>([])
const trks = ref<Trk[]>([])

const showSelectedProduct = ref(false)
const selectedProduct = ref<Product | null>(null)
const showProduct = (product: Product) => {
  selectedProduct.value = product
  showSelectedProduct.value = true
}
const saveSelectedProduct = async (product: Product) => {
  await setAllSettings({
    tovars: [product],
  })

  selectedProduct.value = product

  const productIndex = products.value.findIndex((p) => p.id_tovar === product.id_tovar)
  products.value[productIndex] = product
}

const showSelectedTrk = ref(false)
const selectedTrk = ref<Trk | null>(null)
const toggleTrk = (trk: Trk) => {
  if (selectedTrk.value === null) selectedTrk.value = trk
  else if (selectedTrk.value.id_trk !== trk.id_trk) selectedTrk.value = trk
  else selectedTrk.value = null
  showSelectedTrk.value = true
}

const tankOptions = computed<SelectOption[]>(() =>
  tanks.value.map<SelectOption>((tank) => ({
    label: tank.id_tank.toString(),
    value: tank.id_tank,
  })),
)
const changeTankOfSelectedPist = async () => {
  if (!selectedTrk.value) throw new Error("NOT POSSIBLE")

  await setAllSettings({
    trks: [selectedTrk.value],
  })
}

const getProductByTank = (tank: Tank): Product => {
  return products.value.find((p) => p.id_tovar === tank?.id_tovar)!
}
const getTankByPist = (pist: Pist): Tank => {
  return tanks.value.find((t) => t.id_tank === pist.id_tank)!
}
const getProductByPist = (pist: Pist): Product => {
  const tank = getTankByPist(pist)
  return getProductByTank(tank)
}

onMounted(async () => {
  const data = await getAllSettings()

  tanks.value = data.tanks
  products.value = data.tovars
  trks.value = data.trks
})
</script>
