

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.f103e086.js","_app/immutable/chunks/scheduler.e3945ab3.js","_app/immutable/chunks/index.4e0e09fa.js","_app/immutable/chunks/authFunctions.a8864b2c.js","_app/immutable/chunks/singletons.227df374.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/utils.0aa98e6a.js"];
export const stylesheets = [];
export const fonts = [];
