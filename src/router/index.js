import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import Detail from '@/components/Detail'

Vue.use(Router)

// 导出Router实例工厂函数
export function createRouter() {
	return new Router ({
		mode: 'history',
		routes: [
			{path: '/', component: Index},
			{path: '/detail', component: Detail},
		]
	})
}