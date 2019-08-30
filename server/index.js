const express = require('express')
const Vue = require('vue')
const fs = require('fs')
const app = express() //express 实例

const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('../dist/server/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json')
const renderer = createBundleRenderer(bundle, {
	runInNewContext: false,
	template: fs.readFileSync('../src/index.temp.html', 'utf-8'),
	clientManifest: clientManifest
})
function renderToString (context) {
	console.log('1',context);
	return new Promise((resolve, reject) => {
		console.log('2',resolve);
		renderer.renderToString(context,(err,html) => {
			console.log('3',html);
			if (err) {
				console.log('4',error);
				reject(err)
				return
			}
			console.log('5',context);
			resolve(html)
		})
	})
}
app.use(express.static('../dist/client', {index: false}))
// 服务端路由声明
app.get('*', async function (req,res) {
	console.log('6');
	try {
		const context = {
			title: 'ssr text',
			url: req.url,
		}
		console.log('7',context);
		const html = await renderToString(context)
		console.log('8', html);
		res.send(html)
	} catch (error) {
		console.log('9', error);
		res.status(500).send('Internal Server Error')
	}
})
app.listen(3001, () => {
	console.log('服务端启动成功');
})
