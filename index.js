import fs from "fs";
import * as terser from "terser";
import JavaScriptObfuscator from "javascript-obfuscator";

async function minifymix(inputFilePath) {
  if (!fs.existsSync(inputFilePath)) {
    console.log(`minifyMix ${inputFilePath}: No such file`);
  }
  const outputFilePath = inputFilePath.replace(".js", ".mix.js");

  // 读取输入文件
  const code = fs.readFileSync(inputFilePath, "utf8");
  // 使用 terser 压缩代码
  const options = {
    compress: {
      arrows: true,
      booleans: true,
      collapse_vars: true,
      comparisons: true,
      computed_props: true,
      conditionals: true,
      dead_code: true,
      drop_console: true, // 删除 console 语句
      drop_debugger: true, // 删除 debugger 语句
      evaluate: true,
      expression: true,
      hoist_funs: true,
      hoist_props: true,
      hoist_vars: false,
      if_return: true,
      inline: true,
      join_vars: true,
      keep_classnames: false,
      keep_fargs: false,
      keep_fnames: false,
      loops: true,
      negate_iife: true,
      passes: 3, // 多次压缩
      properties: true,
      pure_funcs: null,
      pure_getters: true,
      reduce_funcs: true,
      reduce_vars: true,
      sequences: true,
      side_effects: true,
      switches: true,
      toplevel: true,
      typeofs: true,
      unused: true,
    },
    mangle: {
      toplevel: true, // 混淆顶级作用域
    },
    output: {
      beautify: false, // 不美化输出
      comments: false, // 删除所有注释
    },
    toplevel: true, // 顶级作用域
    nameCache: null, // 缓存变量和属性名
    sourceMap: false, // 不生成 source map
    ecma: 5, // ECMAScript 版本
    keep_classnames: false, // 不保留类名
    keep_fnames: false, // 不保留函数名
    safari10: false, // 不需要兼容 Safari 10
    module: false, // 不处理 ES6 模块
  };
  const minifiedCode = await terser.minify(code, options);

  // 检查 terser 是否出错
  if (minifiedCode.error) {
    console.error("Terser Error:", minifiedCode.error);
    return;
  }

  const obfuscationOptions = {
    compact: true, // 压缩代码
    controlFlowFlattening: true, // 启用控制流展平
    controlFlowFlatteningThreshold: 0.5, // 控制流展平的概率（0到1之间）
    deadCodeInjection: true, // 启用死代码注入
    deadCodeInjectionThreshold: 0.5, // 死代码注入的概率（0到1之间）
    debugProtection: true, // 启用调试保护
    debugProtectionInterval: 1, // 启用调试保护间隔
    disableConsoleOutput: true, // 禁用 console 输出
    identifierNamesGenerator: "hexadecimal", // 标识符名称生成器（'hexadecimal', 'mangled', 'mangled-shuffled'）
    log: true, // 禁用日志输出
    renameGlobals: true, // 重命名全局变量
    rotateStringArray: true, // 旋转字符串数组
    selfDefending: true, // 启用自我防御
    splitStrings: true, // 启用字符串拆分
    splitStringsChunkLength: 10, // 字符串拆分的块长度
    stringArray: true, // 启用字符串数组
    stringArrayEncoding: ["rc4"], // 字符串数组编码（'base64', 'rc4'）
    stringArrayThreshold: 1, // 字符串数组的概率（0到1之间）
    transformObjectKeys: true, // 转换对象键
    unicodeEscapeSequence: false, // 禁用 Unicode 转义序列
  };
  // 使用 javascript-obfuscator 混淆代码
  const obfuscatedCode = JavaScriptObfuscator.obfuscate(
    minifiedCode.code,
    obfuscationOptions
  );

  // 保存混淆后的代码到输出文件
  fs.writeFileSync(outputFilePath, obfuscatedCode.getObfuscatedCode(), "utf8");

  console.log("minifyMix output file:", outputFilePath);
  console.log("minifyMix Done!");
}

export default minifymix;

