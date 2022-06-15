// 封装ls存取token

import axios from "axios";
import {useSearchParams} from "react-router-dom";
import qs from "qs";

const key = 'token'

const setToken = (token) => {
    return window.localStorage.setItem(key, token)
}

const getToken = () => {
    return window.localStorage.getItem(key)
}

const removeToken = () => {
    return window.localStorage.removeItem(key)
}

async function verifyToken() {
    //
    const qs =require('qs')
    console.log( window.location.href )
    const searchParams = qs.parse( window.location.href.split('?')[1] )
    console.log( searchParams )
    if( searchParams.hasOwnProperty('token') ){
        setToken( searchParams.token )
        window.localStorage.setItem('userName', searchParams.userName )
        window.localStorage.setItem('userId', searchParams.userId)
        //
        const token = getToken()
        console.log("TOKEN==" + token)
        var res = await axios.get("http://124.220.171.17:3000/api/oauth/verify",{
            headers : {'token':token}
        })
        console.log("[RES]")
        console.log(res)
        if( res.data.code != 0) {
            console.log("The token is false")
            console.log("[REDIRECT] : GO LOGIN")
        }else{
            console.log("The token is true")
            window.localStorage.setItem('userName', res.data.data.userName)
            window.localStorage.setItem('userId', res.data.data.userId)
            setToken(token)
        }
        //
    }else{
        const token = getToken()
        console.log("TOKEN==" + token)
        var res = await axios.get("http://124.220.171.17:3000/api/oauth/verify",{
                headers : {'token':token}
            })
        console.log("[RES]")
        console.log(res)
        if( res.data.code != 0) {
            console.log("The token is false")
            console.log("[REDIRECT] : GO LOGIN")
            const oldLocation = window.location
            var url = 'http://124.220.171.17:3000/login?redir='
            const nowUrl = oldLocation.toString().slice(7)
            url = url + encodeURIComponent(nowUrl)
            window.location.href = url
        }else{
            console.log("The token is true")
            window.localStorage.setItem('userName', res.data.data.userName)
            window.localStorage.setItem('userId', res.data.data.userId)
            setToken(token)
        }
    }
    //
}

export {
    setToken,
    getToken,
    removeToken,
    verifyToken
}
