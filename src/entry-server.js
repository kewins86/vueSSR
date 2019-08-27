import { createApp } from "./app"

export default context => {
	//返回Promise，确保路由或组件准备就绪
	return new Promise((resolve ,reject) => {
		//创建vue实例
		const { app, router, store } = createApp(context)
		//跳转首屏地址
		router.push(context.url)
		//完成promise
		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents()
			if (!matchedComponents.length) {
				return reject({ code: 404 })
			}
			// 执行asyncData方法，预拉取数据
			Promise.all(matchedComponents.map(Component => {
				if (Component.asyncData) {
					return Component.asyncData({
						store: store,
						route: router.currentRoute
					})
				}
			})).then(() => {
				// 将store的快照挂到ssr上下文上
				context.state = store.state
				resolve(app)
			}).catch(reject)
		}, reject)
	})
}
