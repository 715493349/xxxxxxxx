/*
 * @Author: luo_h603
 * @Date: 2022-07-14 16:29:45
 * @LastEditTime: 2022-07-14 20:48:44
 * @LastEditors: luo_h603
 * @Description: 状态管理
 * God help those who help themselves
 */
import { createStore } from 'vuex'
import number from './state/num'
import userInfo from './state/userInfo'

export default createStore({
    // 分模块管理
    modules: {
        number,
        userInfo
    }
})