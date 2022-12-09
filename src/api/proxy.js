import request from '@/utils/request' // 引入封装的request.js文件
// 暴露出我们的接口请求,export导出
// 登录接口
export function proxyRequest(data) {
    return request({
        url: '/api/proxy/request',
        method: 'post',
        data: data,
    })
}