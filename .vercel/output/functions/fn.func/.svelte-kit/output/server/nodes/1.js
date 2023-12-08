

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.e2eb3801.js","_app/immutable/chunks/scheduler.e3945ab3.js","_app/immutable/chunks/index.4e0e09fa.js","_app/immutable/chunks/stores.b2df75e5.js","_app/immutable/chunks/singletons.93dfd99c.js"];
export const stylesheets = [];
export const fonts = [];
