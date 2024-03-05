<template>
  <main class="px-3">
    <n-grid x-gap="12" :cols="3">
      <n-grid-item>
        <n-list hoverable clickable>
          <template #header>
            <div class="text-lg font-bold">Види палива</div>
          </template>

          <n-list-item v-for="(product, ind) in products" :key="product.id_tovar" @click="showProduct(product)">
            <n-thing :title="`${ind + 1}. ${product.name_p}`" />
          </n-list-item>
        </n-list>

        <n-modal
          v-model:show="showSelectedProduct"
          preset="card"
          :style="{ width: '600px' }"
          :title="selectedProduct?.name_p_f"
          :bordered="false"
          size="huge"
        >
          <pre>{{ selectedProduct }}</pre>
        </n-modal>
      </n-grid-item>

      <n-grid-item>
        <n-list>
          <template #header>
            <div class="text-lg font-bold">Резервуари</div>
          </template>

          <n-list-item v-for="tank in visibleTanks" :key="tank.id_tank">
            <n-thing>
              <template #header>
                {{ tank.id_tank }}.
                <ProductTitle :product="getProductByTank(tank)" :uncolored="!selectedTrk"></ProductTitle>
              </template>
            </n-thing>
          </n-list-item>
        </n-list>
      </n-grid-item>

      <n-grid-item>
        <n-list hoverable clickable>
          <template #header>
            <div class="text-lg font-bold">Колонки</div>
          </template>

          <n-list-item v-for="trk in trks" :key="trk.id_trk" @click="toggleTrk(trk)">
            <n-thing :title="`TRK ${trk.id_trk}`">
              <template v-if="selectedTrk?.id_trk === trk.id_trk" #description>
                <div v-for="pist in selectedTrk.pists" :key="pist.id_pist" @click.stop="showProduct(getProductByPist(pist))">
                  <ProductTitle class="font-bold" :product="getProductByPist(pist)"></ProductTitle>
                </div>
              </template>
            </n-thing>
          </n-list-item>
        </n-list>
      </n-grid-item>
    </n-grid>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

import { NList, NListItem, NThing, NGrid, NGridItem, NModal } from "naive-ui"

import type { Tank } from "@/models/Tank"
import type { Product } from "@/models/Product"
import type { Pist, Trk } from "@/models/Trk"

import { getAllSettings } from "@/services/api/settings/get-all"
import ProductTitle from "@/components/common/ProductTitle.vue"

const tanks = ref<Tank[]>([])
const products = ref<Product[]>([])
const trks = ref<Trk[]>([])

const showSelectedProduct = ref(false)
const selectedProduct = ref<Product | null>(null)
const showProduct = (product: Product) => {
  selectedProduct.value = product
  showSelectedProduct.value = true
}

const selectedTrk = ref<Trk | null>(null)
const toggleTrk = (trk: Trk) => {
  if (selectedTrk.value === null) selectedTrk.value = trk
  else if (selectedTrk.value.id_trk !== trk.id_trk) selectedTrk.value = trk
  else selectedTrk.value = null
}
const getProductByTank = (tank: Tank): Product => {
  const product = products.value.find((p) => p.id_tovar === tank?.id_tovar)!
  return product
}
const getProductByPist = (pist: Pist): Product => {
  const tank = tanks.value.find((t) => t.id_tank === pist.id_tank)!
  return getProductByTank(tank)
}

const visibleTanks = computed(() => {
  if (selectedTrk.value === null) return tanks.value
  const requiredTankIds = selectedTrk.value.pists.map((p) => p.id_tank)
  const requiredTanks: Tank[] = []
  requiredTankIds.forEach((tankId) => {
    const tank = tanks.value.find((t) => t.id_tank === tankId)!
    requiredTanks.push(tank)
  })
  return requiredTanks
})

onMounted(async () => {
  const data = await getAllSettings()

  tanks.value = data.tanks
  products.value = data.tovars
  trks.value = data.trks
})
</script>
