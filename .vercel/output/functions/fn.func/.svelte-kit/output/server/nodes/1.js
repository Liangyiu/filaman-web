

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.11a1c239.js","_app/immutable/chunks/scheduler.75ef617e.js","_app/immutable/chunks/index.72c84c87.js","_app/immutable/chunks/singletons.3ed62e7e.js","_app/immutable/chunks/index.18f64558.js"];
export const stylesheets = [];
export const fonts = [];
