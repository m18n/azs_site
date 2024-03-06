<template>
  <input
    type="color"
    @input="handleInput"
    :value="hash"
    class="appearance-none [color-scheme:light] dark:[color-scheme:dark] selection:text-neutral-700 group-data-[has-overlay]:selection:!text-transparent text-base text-neutral-700 min-w-0 min-h-[1.5em] grow outline-none bg-transparent selection:bg-blue-100 placeholder:text-neutral-400 group-data-[disabled]:!cursor-not-allowed dark:placeholder-neutral-400/50 dark:text-neutral-300 border-none p-0 focus:ring-0 !w-14 cursor-pointer rounded overflow-clip [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-moz-color-swatch]:border-none group-data-[prefix-icon]:mx-2 group-data-[suffix-icon]:mx-2 formkit-input"
  />
</template>

<script setup lang="ts">
import { computed } from "vue"

import { getColorHash, getColorRGB } from "@/utils/color"

const props = defineProps({
  context: Object,
})

const hash = computed(() => getColorHash(props.context!._value))

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  props.context!.node.input(getColorRGB(target.value))
}
</script>
