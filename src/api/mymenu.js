import request from '@/utils/request' // 引入封装的request.js文件
// 暴露出我们的接口请求,export导出
// 创建自定义组件栏目接口
export function add(data) {
    return request({
        url: '/api/system/customize_component_menu/add',
        method: 'post',
        data: data,
    })
}
//获取自定义组件列表
export function list(params) {
    return request({
        url: '/api/system/customize_component_menu/list',
        method: 'get',
        params: params,
    })
}
// 创建自定义组件接口
export function createComponent(data) {
    return request({
        url: '/api/system/customize_component_menu/create_component',
        method: 'post',
        data: data,
    })
}
// 创建自定义组件接口批量
export function createComponentList(data) {
    return request({
        url: '/api/system/customize_component_menu/create_component_list',
        method: 'post',
        data: data,
    })
}