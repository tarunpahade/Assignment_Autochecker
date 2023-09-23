import { JsMinifyOptions, Output, ParseOptions, Script, Module, Program, Options, SyncInitInput, InitOutput, InitInput } from '@swc/wasm-web'

let swc: {
    transformSync: any; browserslist?: (query: string, opts: any) => any; minify?: (src: string, opts
        // eslint-disable-next-line @next/next/no-assign-module-variable
        ? // eslint-disable-next-line @next/next/no-assign-module-variable
        : JsMinifyOptions | undefined) => Promise<Output>; minifySync?: (code: string, opts?: JsMinifyOptions | undefined) => Output; parse?: { (src: string, options: ParseOptions & { isModule: false }): Promise<Script>; (src: string, options?: ParseOptions | undefined): Promise<Module> }; parseSync?: { (src: string, options: ParseOptions & { isModule: false }): Script; (src: string, options?: ParseOptions | undefined): Module }; print?: (m: Program, options?: Options | undefined) => Promise<Output>; printSync?: (m: Program, options?: Options | undefined) => Output; transform?: (code: string | Program, options?: Options | undefined, experimental_plugin_bytes_resolver?: any) => Promise<Output>; initSync?: (module: SyncInitInput) => InitOutput; default?: (module_or_path?: InitInput | Promise<InitInput> | undefined) => Promise<InitOutput>
} | null = null

export async function transformCode(codeString: string) {
  if (swc === null) {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module = await import('@swc/wasm-web')
    await module.default()
    swc = module
  }
  return swc.transformSync(codeString, {
    filename: 'index.tsx',
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
      },
    },
    module: {
      type: 'commonjs',
    },
  }).code
}

export async function executeCode(
  codeString: string,
  dependencies: Record<string, unknown>
) {
  const transformedCode = await transformCode(codeString)
  const exports: Record<string, unknown> = {}
  const require = (path: string | number) => {
    if (dependencies[path]) {
      return dependencies[path]
    }
    throw Error(`Module not found: ${path}.`)
  }
  const result = new Function('exports', 'require', transformedCode)

  result(exports, require)

  return exports.default
}