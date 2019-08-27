const express = require('express')
const Vue = require('vue')
const fs = require('fs')
const app = express() //express 实例

const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('./../dist/server/vue-ssr-server-bundle.json')
const clientManifest = require('./../dist/client/vue-ssr-client-manifest.json')
const rendnerer = createBundleRenderer(bundle, {
	runInNewContext: false,
	template: fs.readFileSync('./../src/index.temp.html', 'utf-8'),
	clientManifest: clientManifest
})
function renderToString (context) {
	return new Promise((resolve, reject) => {
		rendnerer.renderToString(context,(err,html) => {
			if (err) {
				reject(err)
				return
			}
			resolve(html)
		})
	})
}
app.use(express.static('./../dist/client'))
// 服务端路由声明
app.get('*', async function (req,res) {
	try {
		const context = {
			title: 'ssr text',
			url: req.url,
		}
		const html = await renderToString(context)
		res.send(html)
	} catch (error) {
		res.status.send('Internal Server Error')
	}
})
app.listen(3000, () => {
	console.log('服务端渲染启动成功');
})
