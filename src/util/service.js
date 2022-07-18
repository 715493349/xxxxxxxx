/*
 * @Author: luo_h603
 * @Date: 2022-07-18 14:43:19
 * @LastEditTime: 2022-07-18 14:59:56
 * @LastEditors: luo_h603
 * @Description: 
 * God help those who help themselves
 */
import axios from 'axios';
import { ElLoading } from 'element-plus';
import { ElMessage } from 'element-plus'

// 创建实例
// const loadingObj = new ElLoading({
//     text: '加载中...',
//     spinner: 'el-icon-loading',
//     background: 'rgba(0, 0, 0, 0.8)'
// })

let loadingObj = null;
const Service = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/', // api的base_url
    timeout: 5000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        // 'Access-Control-Allow-Credentials': 'true',
    },
});

// 请求拦截器
Service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        loadingObj = ElLoading.service({
            text: '加载中...',
            lock: true,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        })
        return config;
    }
);

// 响应拦截器
Service.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        loadingObj.close();
        const data = response.data
        if (!data.data) {
            ElMessage.error(data.meta.msg || '服务器错误')
            return data
        }
        return response.data;
    }, error => {
        // 对响应错误做点什么
        loadingObj.close();
        ElMessage.error({
            message: '网络错误，请稍后再试！',
            type: 'error',
            duration: 2000
        })
        return Promise.reject(error);
    }
);

// post请求
// export const post = config => {
//         return Service.post({
//             ...config,
//             method: 'post',
//             data: config.data,
//         })
//     }
export function post(config) {
    return Service({
        ...config,
        method: 'post',
        data: config.data,
    })
}

export function get(config) {
    return Service({
        ...config,
        method: 'get',
        data: config.data,
    })
}