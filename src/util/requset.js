/*
 * @Author: luo_h603
 * @Date: 2022-07-18 16:32:45
 * @LastEditTime: 2022-07-19 19:10:07
 * @LastEditors: luo_h603
 * @Description: 
 * God help those who help themselves
 */
// import {get, post } from './service'
import req from './service'

// export const loginApi = data => {
//     return post({
//         url: '/login',
//         data: data
//     })
// }

//登录 
export function loginApi(data) {
    return req({
        url: '/login',
        method: 'post',
        data: data
    })
}

// 获取用户列表
export function getUserList(data) {
    return req({
        url: '/users',
        method: 'get',
        params: data
    })
}

// 新增用户列表
export function addUser(data) {
    return req({
        url: '/users',
        method: 'post',
        data: data
    })
}

// 更新用户状态
export function userState(data) {
    return req({
        url: `users/${data.id}/state/${data.mg_state}`,
        method: 'put',
        data: data
    })
}