import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export function createStore() {
	return new Vuex.Store({
		state: {
			count: 111
		},
		mutations: {
			add (state) {
				state.count +=1
			}
		},
		strict: process.env.NODE_ENV !== 'production' // 线上环境关闭store检查
	})
}
