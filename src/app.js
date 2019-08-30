// 通用入口，创建vue实例
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from "./store"

export function createApp(context) {
	const router = createRouter()
	const store = createStore()
	const app = new Vue({
		router,
		store,
		render: h => h(App)
	})
	return { app, router }
}
