<template>
  <a
    v-bind="$attrs"
    class="cursor-pointer underline underline-offset-2 hover:text-primary-strong"
    :href="resolvedRoute.href"
    @click.prevent="handleClick"
  >
    <slot />
  </a>
</template>

<script setup lang="ts" generic="N extends AppRouteName">
import { computed } from "vue"

import type { AppRouteName, AppRouteOptions } from "@/plugins/router"

import { isNotEmptyString } from "@/utils/string"
import { useRouter } from "vue-router"

const props = defineProps<{
  name: N
  params: AppRouteOptions[N] extends { params: any } ? AppRouteOptions[N]["params"] : null
  query?: AppRouteOptions[N] extends { query: any } ? AppRouteOptions[N]["query"] : null
  href?: string
  blank?: boolean
  prevent?: boolean
}>()

const emit = defineEmits<{
  click: [data: { event: MouseEvent; href: string }]
}>()

const router = useRouter()

const resolvedRoute = computed(() =>
  router.resolve({
    name: props.name,
    path: props.href,
    params: props.params ?? undefined,
    query: props.query ?? undefined,
  }),
)

const handleClick = async (event: MouseEvent): Promise<void> => {
  if (isNotEmptyString(props.href)) {
    router.push({ path: props.href })
    return
  }

  if (props.prevent) {
    event.preventDefault()

    emit("click", {
      event,
      href: resolvedRoute.value.href,
    })

    return
  }

  if (props.blank) {
    alert("TODO: blank")
    return
  }

  await router.push(resolvedRoute.value)
  return
}
</script>
