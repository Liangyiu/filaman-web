export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.ed9a1a4a.js","app":"_app/immutable/entry/app.4b1c95a2.js","imports":["_app/immutable/entry/start.ed9a1a4a.js","_app/immutable/chunks/scheduler.75ef617e.js","_app/immutable/chunks/singletons.3ed62e7e.js","_app/immutable/chunks/index.18f64558.js","_app/immutable/entry/app.4b1c95a2.js","_app/immutable/chunks/scheduler.75ef617e.js","_app/immutable/chunks/index.72c84c87.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/stock",
				pattern: /^\/api\/stock\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/stock/_server.ts.js'))
			},
			{
				id: "/stock",
				pattern: /^\/stock\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();