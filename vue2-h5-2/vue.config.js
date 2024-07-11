const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = process.env.port || process.env.npm_config_port || 8080; // dev port

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: process.env.NODE_ENV === "development",
  devServer: {
    // open: true,
    // host: '172.22.95.1',
    port,
    https: false,
    // 以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {
      // 配置跨域
      "/dev-api": {
        target: "http://172.22.71.5:4001", // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          "^/dev-api": "", // 请求的时候使用这个api就可以
        },
      },
    },
  },
  chainWebpack: (config) => {
    console.log(config);
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("store", resolve("src/store"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
      .set("api", resolve("src/api"))
      .set("utils", resolve("src/utils"));
    if (process.env.NODE_ENV !== "production") {
      config.output.chunkFilename(`[name].[chunkhash:8].js`);
      config.output.filename(`[name].[hash].js`);
    }

    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};
