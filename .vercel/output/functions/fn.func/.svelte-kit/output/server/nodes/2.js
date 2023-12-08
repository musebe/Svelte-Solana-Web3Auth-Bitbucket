

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.36fd056d.js","_app/immutable/chunks/scheduler.e3945ab3.js","_app/immutable/chunks/index.4e0e09fa.js","_app/immutable/chunks/authFunctions.2a27f1e8.js","_app/immutable/chunks/singletons.655b2fbf.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/utils.645ccb14.js"];
export const stylesheets = [];
export const fonts = [];
