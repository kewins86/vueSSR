import Vue from 'vue'
import { createApp } from "./app"

const { app, router, store } = createApp()

// 如果有__INITIAL_STATE__变量，则将store的状态用它替换
if (window.__INITIAL_STATE__) {
	store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
	// 通过路由勾子，执行拉取数据逻辑
	router.beforeResolve((to, from, next) => {
		// 找到增量组件，拉取数据
		const matched = router.getMatchedComponents(to)
		const prevMatched = router.getMatchedComponents(from)
		let diffed = false
		const activated = matched.filter((c, i) => {
			return diffed || (diffed = (prevMatched[i] !== c))
		})
		// 组件数据通过执行asyncData方法获取
		const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
		if (!asyncDataHooks.length) {
			return next()
		}
		// 要注意asyncData方法要返回promise，asyncData调用的vuex action也必须返回promise
		Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
			.then(() => {
				next()
			})
			.catch(next)
	})
	//挂载
	app.$mount('#app')
})
