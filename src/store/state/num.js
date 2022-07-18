/*
 * @Author: luo_h603
 * @Date: 2022-07-15 15:41:47
 * @LastEditTime: 2022-07-15 15:47:39
 * @LastEditors: luo_h603
 * @Description: 
 * God help those who help themselves
 */
export default {
    namespaced: true,
    //全局状态初始化
    state: {
        count: 1,
    },
    //类似计算属性，计算status
    getters: {
        countStatus(state) {
            return state.count <= 1
        }
    },
    // 更新状态，提交mutations
    mutations: {
        setCount(state, num) {
            state.count = num
        }
    },
    // 异步更新状态，传递数据到mutations更改
    actions: {
        setCountPrimise(context, num) {
            return new Promise((resolve, reject) => {
                if (num >= 100) {
                    reject('超过100')
                } else {
                    context.commit('setCount', num)
                    resolve()
                }
            })
        }
    },
}