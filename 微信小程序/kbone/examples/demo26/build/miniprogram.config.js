module.exports = {	
	origin: 'https://test.miniprogram.com',	
	entry: '/',	
	router: {		
		page1: ['/a'],
		page2: ['/b'],
		page3: ['/c'],
	},	
	redirect: {		
		notFound: 'page1',		
		accessDenied: 'page1',
	},
	generate: {
		globalVars: [['SVGElement', 'function SVGElement() {}']], // 兼容 vue3 3.0.8+ 版本
	},
	app: {
		navigationBarTitleText: 'miniprogram-project',
	},
	projectConfig: {
		appid: 'wx14c7c4cd189644a1',
        projectname: 'kbone-demo26',
	},
	packageConfig: {
		author: 'wechat-miniprogram',
	},
}