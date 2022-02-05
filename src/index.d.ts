import type { LocalsObject, Options } from "pug";
import type { Plugin as VitePlugin } from "vite";

interface PluginOptions {
  pugOptions?: Options,
  pugLocals?: LocalsObject,
}

export default function(options: PluginOptions): VitePlugin
