import request from '@/utils/request' // 引入封装的request.js文件
// 暴露出我们的接口请求,export导出
export function save(data) {
    return request({
        url: '/api/drawing/save',
        method: 'post',
        data: data,
    })
}
export function update(data) {
    return request({
        url: '/api/drawing/update',
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
//创建动画
export function createAnimate(params) {
    return request({
        url: '/api/system/customize_component_menu/create_animate',
        method: 'post',
        data: params,
    })
}
//获取动画列表
export function getAnimateList(params) {
    return request({
        url: '/api/system/customize_component_menu/animate_list',
        method: 'get',
        params: params,
    })
}
//获取动画列表分页
export function getAnimateListPage(params) {
    return request({
        url: '/api/system/customize_component_menu/animate_list_page',
        method: 'get',
        params: params,
    })
}
//删除动画
export function deleteAnimate(params) {
    return request({
        url: '/api/system/customize_component_menu/delete_animate',
        method: 'post',
        data: params,
    })
}
//获取图片分页列表
export function getImagesListPage(params) {
    return request({
        url: '/api/uploads/images_list_page',
        method: 'get',
        params: params,
    })
}
//保存通信模板信息
export function saveCommunication(params) {
    return request({
        url: '/api/drawing/saveCommunication',
        method: 'post',
        data: params,
    })
}
//保存通信模板信息
export function communicationList(params) {
    return request({
        url: '/api/drawing/communicationList',
        method: 'get',
        params: params,
    })
}

