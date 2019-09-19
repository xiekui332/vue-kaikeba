import request from '@/utils/request'
// 订单统计
export function statistics (data){
    return request({
        url:'http://192.168.84.211:9999/api/order/haikou/getProductCount',
        method: 'get'
    })
}
// 订单列表
export function getList (data){
    return request({
        url:'http://192.168.21.178:8080/api/order/haikou/getHaiKouOrderByConditions/1/10',
        data,
        method: 'post'
    })
}
// 历史订单
export function historyTrackPoints (data){
    return request({
        url:'http://192.168.21.178:8080/track/historyTrackPoints',
        data,
        method: 'post'
    })
}
// 实时订单
export function realtimeOrder (data){
    return request({
        url:'http://192.168.21.178:8080/track/realtimeOrder',
        data,
        method: 'post'
    })
}

