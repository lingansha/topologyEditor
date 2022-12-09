import axios from 'axios'
import { Message } from 'element-ui'
// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers['Platform'] = 'web'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    // 超时
    timeout: 10 * 1000,
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 让每个请求携带自定义token 请根据实际情况自行修改
        if(localStorage.getItem('userInfo')){
          config.headers['Authorization'] = 'bearer '+JSON.parse(localStorage.getItem('userInfo')).token
        }
        return config;
    },
    error => {
        console.log('err：' + error);
        return Promise.reject(error);
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        console.log(response,'==response==')
        // return response;
        // // 未设置状态码则默认成功状态
        const code = response.data.code || 200;
        
        // 获取错误信息
        const errorCode = {
            '401': '认证失败，无法访问系统资源',
            '403': '当前操作没有权限',
            '404': '访问资源不存在',
            'default': '系统未知错误,请反馈给管理员'
        };
        const msg = errorCode[code] || response.data.msg || errorCode['default'];
        if (code === 500) {
            return Promise.reject(new Error(msg))
        }else if (code == 401) {
         Message({
                message: "认证失败！",
                type: 'error'
         });
          return response.data
        } else if (code !== 200) {
            return Promise.reject('error')
        }
        else{
            return response.data
        }
    },
    error => {
      console.log(error,'==response==')
        if(error.response.status==401){
          Message({
            message: '登录失效',
            type: 'error'
          });
          localStorage.clear()
        }
        console.log('err：' + error);
        let { message } = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        }
        else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        }
        else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        return Promise.reject(message);
    }
)
export default service;