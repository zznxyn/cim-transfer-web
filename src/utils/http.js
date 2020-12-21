import axios from 'axios'
import qs from 'qs'
import {
    Message,
    Loading
} from 'element-ui'
// 判断开发环境 设置不同的请求域名
switch (process.env.VUE_APP_BASE_URL) {
    case 'test': // 注意这里的名字要和步骤二中设置的环境名字对应起来
        axios.defaults.baseURL = "http://192.168.1.6:9000" //测试环境
        break
    case 'prod':
        axios.defaults.baseURL = "http://cim.bochao.com.cn:1590" //生产环境
        break
    case 'dev':
        axios.defaults.baseURL = "http://192.168.0.33:9000" //开发环境
        break
}
// 请求超时
// axios.defaults.timeout = 5000

window.ServerUrl = axios.defaults.baseURL;

let loading

function startLoading() {
    // console.log(loading)
    if (!loading) {
        loading = Loading.service({
            lock: true,
            text: '加载中',
            spinner: 'el-icon-loading',
            target: '#CimMainArea'
            // background:'rgba(0,0,0,0.8)'
        })
    }
}

function endLoading() {
    if (loading) {
        loading.close()
        loading = undefined
    }
}
// 请求拦截器
axios.interceptors.request.use(config => {
    // startLoading()
    /*  if (config.method.toLowerCase() == 'post') {
         config.data = qs.stringify(config.data)
     } */
    if (sessionStorage.getItem('token')) {
        config.headers.token = sessionStorage.getItem('token');
    }

    return config
}, err => {
    // endLoading()

    Message.error({
        message: '请求超时!'
    })
    return Promise.resolve(err)
})
// 响应拦截器
axios.interceptors.response.use(data => {
    // endLoading()
    if (data) {
        switch (data.data.code) {
            case 201:
                sessionStorage.removeItem('token');
                router.push('/login');
        }
    }
    if (data.status && data.status == 200 && data.data.status == 'error') {
        Message.error({
            message: data.data.msg
        })
        return
    }
    return data
}, err => {
    // endLoading()
    // window.location.href = '/error500'
})

class Http {
    static get(url, params) {
        params = {
            params: params,
            paramsSerializer: params => {
                return qs.stringify(params, {
                    indices: false
                })
            }
        }
        return this.resThen(axios.get(url, params))
    }
    static post(url, params, successMessage) {
        return this.postThen(axios.post(url, qs.stringify(params)), successMessage)
    }
    // GET
    static resThen(response) {
        return response.then(res => {
            const code = res.data.code
            const message = res.data.message
            const data = res.data.data
            if (code === 1) {
                return Promise.resolve(data)
            } else if (code === 201) {
                Message.error({
                    message: message
                })
                setTimeout(() => {
                    window.location.href = "/login"
                }, 1000);

            } else {
                Message.error({
                    message: message
                })
                throw (message)
            }
        })
    }
    // post
    static postThen(response, successMessage) {
        return response.then(res => {
            const code = res.data.code
            const message = res.data.message
            const data = res.data.data
            if (code === 1) {
                if (successMessage !== undefined) {
                    Message.success(successMessage)
                }
                return Promise.resolve(data)
            } else if (code === 201) {
                window.location.href = "/login"
            } else {
                Message.error(message)
            }
        })
    }
}

export default Http
