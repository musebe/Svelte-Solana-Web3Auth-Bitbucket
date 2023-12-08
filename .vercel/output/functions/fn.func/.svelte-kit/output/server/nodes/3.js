

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.b79b5578.js","_app/immutable/chunks/scheduler.e3945ab3.js","_app/immutable/chunks/index.4e0e09fa.js","_app/immutable/chunks/authFunctions.2a27f1e8.js","_app/immutable/chunks/singletons.655b2fbf.js","_app/immutable/chunks/preload-helper.a4192956.js"];
export const stylesheets = [];
export const fonts = [];
