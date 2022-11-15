const baseURL = {
  dev: 'http://139.159.142.8', // 开发环境
  test: 'http://192.168.1.41:32104', // 测试环境
  pro: 'http://hatx.cloudta.cn', // 生产环境
  yuntaPro: 'http://iot.cloudta.cn', // 云塔生产环境
}
const env = 'dev' // 当前使用环境

module.exports = {
  //路径前缀
  publicPath: "/",
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
      config.mode = 'production';
      config["performance"] = {//打包文件大小配置
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
    }
  },
  css: {
    extract: { ignoreOrder: true }
  },
  //开发模式反向代理配置，生产模式请使用Nginx部署并配置反向代理
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: baseURL[env], // 服务接口地址代理
        //远程演示服务地址,可用于直接启动项目
        //target: 'https://saber.bladex.vip/api',
        ws: true,
        pathRewrite: {
          '^/api': env === 'dev' ? '/' : '/api'
        }
      },
      '/flow': {
        //本地服务接口地址
        target: 'http://192.168.1.71:1880',
        //远程演示服务地址,可用于直接启动项目
        //target: 'https://saber.bladex.vip/api',
        ws: true,
      },
      '/auth/token': {
        //本地服务接口地址
        target: 'http://192.168.1.71:1880',
        //远程演示服务地址,可用于直接启动项目
        //target: 'https://saber.bladex.vip/api',
        ws: true,
      },
      '/senceauth/token': {
        //本地服务接口地址
        target: 'http://192.168.1.74:1990',
        //远程演示服务地址,可用于直接启动项目
        //target: 'https://saber.bladex.vip/api',
        ws: true,
        pathRewrite: {
          '^/senceauth': '/auth'
        }
      },
      '/senceflow': {
        //本地服务接口地址
        target: 'http://192.168.1.74:1990',
        //远程演示服务地址,可用于直接启动项目
        //target: 'https://saber.bladex.vip/api',
        ws: true,
        pathRewrite: {
          '^/senceflow': '/flow'
        }
      },
    },
  }
};
