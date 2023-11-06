

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.b1a26c81.js","_app/immutable/chunks/scheduler.75ef617e.js","_app/immutable/chunks/index.72c84c87.js"];
export const stylesheets = ["_app/immutable/assets/2.a745d17c.css"];
export const fonts = [];
