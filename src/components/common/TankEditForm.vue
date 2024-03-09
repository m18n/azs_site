<template>
  <FormKit
    v-model="copiedTank"
    type="form"
    @submit="(t) => $emit('update', t)"
  >
    <FormKitSchema :schema="tankSchema" />
  </FormKit>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue"
import cloneDeep from "clone-deep"

import { FormKitSchema } from "@formkit/vue"
import type { FormKitSchemaNode, FormKitFrameworkContext } from "@formkit/core"

import type { Tank } from "@/models/Tank"
import type { Product } from "@/models/Product"

const props = defineProps<{
  tank: Tank
  products: Product[]
}>()
defineEmits<{
  update: [tank: Tank]
}>()

const copiedTank = reactive(cloneDeep(props.tank))

const productOptions = computed<FormKitFrameworkContext["options"]>(() =>
  props.products.map((product) => ({
    label: product.name_p,
    value: product.id_tovar,
  })),
)

const tankSchema = computed<FormKitSchemaNode[]>(() => [
  {
    $formkit: "select",
    name: "id_tovar",
    options: productOptions.value,
    label: "Вид палива",
    validation: "required",
  },
  {
    $formkit: "number",
    number: "integer",
    name: "volume",
    label: "Залишок",
    validation: "required",
  },
  {
    $formkit: "number",
    number: "integer",
    name: "remain",
    label: "Мертвий залишок",
    validation: "required",
  },
])
</script>
