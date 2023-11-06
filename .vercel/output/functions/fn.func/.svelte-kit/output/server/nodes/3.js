import * as server from '../entries/pages/stock/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/stock/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/stock/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.ff523f28.js","_app/immutable/chunks/scheduler.75ef617e.js","_app/immutable/chunks/index.72c84c87.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.5eb1e741.js","_app/immutable/chunks/index.18f64558.js","_app/immutable/chunks/singletons.3ed62e7e.js"];
export const stylesheets = ["_app/immutable/assets/3.52d57f70.css","_app/immutable/assets/ProgressBar.4f1e9ba5.css"];
export const fonts = [];
