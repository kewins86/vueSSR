import { createApp } from "./app"

const { app, router, store } = createApp()

router.onReady(() => {
	//挂载
	store,
	app.$mount('#app')
})
