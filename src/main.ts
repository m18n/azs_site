import "virtual:uno.css"

import "@/assets/styles/components/n-list.css"

import { createApp } from "vue"

import App from "@/App.vue"

import { router } from "@/plugins/router/router"

const app = createApp(App)

app.use(router)

app.mount("#app")
