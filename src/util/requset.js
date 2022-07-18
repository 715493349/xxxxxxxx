/*
 * @Author: luo_h603
 * @Date: 2022-07-18 16:32:45
 * @LastEditTime: 2022-07-18 16:40:59
 * @LastEditors: luo_h603
 * @Description: 
 * God help those who help themselves
 */
import {get, post } from './service'

// export const loginApi = data => {
//     return post({
//         url: '/login',
//         data: data
//     })
// }

//登录 
export function loginApi(data) {
    return post({
        url: '/login',
        data
    })
}