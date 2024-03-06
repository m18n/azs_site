<template>
  <FormKit type="form" v-model="copiedProduct" @submit="(p) => $emit('update', p)">
    <FormKitSchema :schema="productSchema" />
  </FormKit>
  <pre>{{ copiedProduct }}</pre>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import cloneDeep from "clone-deep"

import { FormKitSchema } from "@formkit/vue"
import type { FormKitSchemaNode } from "@formkit/core"

import type { Product } from "@/models/Product"

const props = defineProps<{
  product: Product
}>()
const emit = defineEmits<{
  update: [product: Product]
}>()

const copiedProduct = reactive(cloneDeep(props.product))

const productSchema: FormKitSchemaNode[] = [
  {
    $formkit: "text",
    name: "name",
    label: "Ім'я",
    validation: "required",
  },
  {
    $formkit: "text",
    name: "name_p",
    label: "Коротке ім'я для каси",
    validation: "required",
  },
  {
    $formkit: "text",
    name: "name_p_f",
    label: "Довге ім'я для каси",
    validation: "required",
  },
  {
    $cmp: "FormKit",
    props: {
      type: "rgb",
      label: "Колір",
      name: "color",
    },
  },
  {
    $formkit: "text",
    name: "name_p_v",
    label: "Одиниця вимірювання",
    validation: "required",
  },
  {
    $formkit: "number",
    name: "price",
    label: "Ціна",
    validation: "required",
  },
]
</script>
