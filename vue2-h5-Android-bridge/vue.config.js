const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // webpack配置
  chainWebpack: config => {
    // 生产环境配置
    if (isProduction) {
      // 删除预加载
      config.plugins.delete('preload');
      config.plugins.delete('prefetch');
      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
      })
    }
  },
  configureWebpack: config => {
    // 生产环境配置
    if (isProduction) {
      // 打包优化，去除console.log
      // vuecli4默认引入依赖terser插件，在这个基础上直接添加属性即可
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    }
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProduction,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px",
            viewportWidth: 375,
            unitPrecision: 3,
            propList: ["*"],
            viewportUnit: "vw",
            fontViewportUnit: "vw",
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: /(\/|\\)(node_modules)(\/|\\)/,
          })
        ]
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
  },
}
