

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.6edd61c0.js","_app/immutable/chunks/scheduler.e3945ab3.js","_app/immutable/chunks/index.4e0e09fa.js","_app/immutable/chunks/stores.6916e7b3.js","_app/immutable/chunks/singletons.655b2fbf.js"];
export const stylesheets = [];
export const fonts = [];
