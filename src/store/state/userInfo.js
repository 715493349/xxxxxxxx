/*
 * @Author: luo_h603
 * @Date: 2022-07-15 15:41:59
 * @LastEditTime: 2022-07-15 16:09:12
 * @LastEditors: luo_h603
 * @Description: 
 * God help those who help themselves
 */
export default {
    state: {
        userInfo: (localStorage.getItem("loginData") && JSON.parse(localStorage.getItem("loginData"))) || {},
    },
    mutations: {
        setUserInfo(state, data) {
            state.userInfo = data
        }
    }
}