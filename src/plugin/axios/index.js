import store from '@/store'
import axios from 'axios'
import {Message} from 'element-ui'
import util from '@/libs/util'
import router from '@/router'

// 创建一个错误
function errorCreat(msg) {
    const err = new Error(msg)
    errorLog(err)
    throw err
}

// 记录和显示错误
function errorLog(err) {
    // 添加到日志
    store.dispatch('d2admin/log/add', {
        type: 'error',
        err,
        info: '数据请求异常'
    })
    // 打印到控制台
    if (process.env.NODE_ENV === 'development') {
        util.log.danger('>>>>>> Error >>>>>>')
        console.log(err)
    }
    // 显示提示
    Message({
        message: err.message,
        type: 'error',
        duration: 5 * 1000
    })
}

// 创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        console.log("请求拦截 ---》", config);
        // 在请求发送之前做一些处理
        const token = util.cookies.get('token')
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        config.headers['token'] = token
        return config
    },
    error => {
        // 发送失败
        console.log(error)
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        console.log("响应拦截 ---》", response);
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data
        // 这个状态码是和后端约定的
        const {code} = dataAxios
        // 根据 code 进行判断
        if(response.data.code === 200) {
            console.log(response.data.code)
            // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
            return dataAxios
        } else if(response.data.code === 401){
                router.push({
                    name:'login'
                })
        } else {
            console.log(response.data.message);
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
            Message({
                message: response.data.msg,
                type: 'error'
            })
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误';
                    break
                case 401:
                    error.message = '未授权，请登录';
                    break
                case 403:
                    error.message = '拒绝访问';
                    break
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`;
                    break
                case 408:
                    error.message = '请求超时';
                    break
                case 500:
                    error.message = '服务器内部错误';
                    break
                case 501:
                    error.message = '服务未实现';
                    break
                case 502:
                    error.message = '网关错误';
                    break
                case 503:
                    error.message = '服务不可用';
                    break
                case 504:
                    error.message = '网关超时';
                    break
                case 505:
                    error.message = 'HTTP版本不受支持';
                    break
                default:
                    break
            }
        }
        errorLog(error)
        return Promise.reject(error)
    }
)

export default service
