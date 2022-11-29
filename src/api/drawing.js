import request from '@/utils/request' // 引入封装的request.js文件
// 暴露出我们的接口请求,export导出
// 登录接口
export function save(data) {
    return request({
        url: '/api/drawing/save',
        method: 'post',
        data: data,
    })
}
export function detail(params) {
    return request({
        url: '/api/drawingsee/detail',
        method: 'get',
        params: params,
    })
}
