import request from '@/utils/request' // 引入封装的request.js文件
// 暴露出我们的接口请求,export导出
// 登录接口
export function Login(data) {
    return request({
        url: '/api/users/login',
        method: 'post',
        data: data,
    })
}