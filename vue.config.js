const baseURL = {
  dev: 'http://192.168.1.74:3001', // 开发环境
  test: 'http://192.168.1.41:32104', // 测试环境
  pro: 'http://hatx.cloudta.cn', // 生产环境
}
const env = 'dev' // 当前使用环境

module.exports = {
  //路径前缀
  publicPath: "/",
  //开发模式反向代理配置，生产模式请使用Nginx部署并配置反向代理
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: baseURL[env], // 服务接口地址代理
        //远程演示服务地址,可用于直接启动项目
        //target: 'https://saber.bladex.vip/api',
        ws: true,
      }
    },
  }
};
