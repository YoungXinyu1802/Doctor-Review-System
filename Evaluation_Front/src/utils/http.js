// 封装axios
// 实例化  请求拦截器 响应拦截器

import axios from 'axios'
import { getToken } from './token'
import { history } from "./history";
// import { useNavigate } from "react-router-dom"
//
// const navigate = useNavigate()

const http = axios.create({
    baseURL: 'http://124.220.171.17:8800',
    timeout: 5000
})
//添加请求拦截器
http.interceptors.request.use((config) => {
    // if not login add token
    const token = getToken()
    if (token) {
        const url="http://124.220.171.17:3000/api/oauth/verify"
        let formData=new FormData()
        formData.append("token",token)
        axios.get(url, {
            params: {
                token: token
            }
        }).then( function (res){
            if( res.data.code != 0) {
                console.log("The token is false")
            }else{
                window.localStorage.setItem('userName', res.data.data.userName)
                console.log("The token is true")
            }
        }).catch(function (error){
            console.log(error)
        })
        config.headers.Authorization = `${token}`
    }else{
        const oldLocation = window.location
        var url = 'http://124.220.171.17:3000/login?redir='
        const nowUrl = oldLocation.toString().slice(7)
        url = url + encodeURIComponent(nowUrl)
        window.location.href(url)
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// // 添加响应拦截器
// http.interceptors.response.use((response) => {
//     // 2xx 范围内的状态码都会触发该函数。
//     // 对响应数据做点什么
//     return response.data
// }, (error) => {
//     // 超出 2xx 范围的状态码都会触发该函数。
//     // 对响应错误做点什么
//     if (error.response.status === 401) {
//         // 跳回到登录 reactRouter默认状态下 并不支持在组件之外完成路由跳转
//         // 需要自己来实现
//         history.push('/')
//     }
//     return Promise.reject(error)
// })

export { http }
