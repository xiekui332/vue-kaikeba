import request from '@/utils/request'

// 首页订单概况
export function orderOverview (data){
    return request({
        url:'http://192.168.85.166:8080/track/orderOverview',
        data,
        method: 'post'
    })
}

export function orderGps (data){
    return request({
        url:'http://192.168.85.166:8080/track/orderGps',
        data,
        method: 'post'
    })
}

// 订单数量变化
export function hourOrderCount (data){
    return request({
        url:'http://192.168.85.166:8080/track/hourOrderCount',
        data,
        method: 'post'
    })
}

// 订单统计
export function statistics (data){
    return request({
        url:'http://192.168.84.211:9999/api/order/haikou/getProductCount',
        method: 'get'
    })
}

// 点击订单列表
export function getList (data){
    return request({
        url:'api/order/haikou/getHaiKouOrderByConditions/1/10',
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

