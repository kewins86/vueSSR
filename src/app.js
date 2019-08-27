// 通用入口，创建vue实例
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from "./store"
import {sync} from 'vuex-router-sync' // 把当VueRouter状态同步到Vuex中

export function createApp(context) {
	const router = createRouter()
	const store = createStore()
	sync(store, router)
	const app = new Vue({
		router,
		store,
		context,
		render: h => h(App)
	})
	return { app, router }
}
