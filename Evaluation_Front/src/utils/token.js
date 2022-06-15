// 封装ls存取token

import axios from "axios";
import {useSearchParams} from "react-router-dom";

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

const verifyToken = () => {
    const qs =require('qs')
    const searchParams = qs.parse( window.location.href.split('?')[1] )
    console.log( searchParams )
    if( searchParams!=null ){
        setToken( searchParams.token )
        window.localStorage.setItem('userName', searchParams.userName )
        window.localStorage.setItem('userId', searchParams.userId)
    }
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
                setToken(token)
                console.log("The token is true")
            }
        }).catch(function (error){
            console.log(error)
        })
    }else{
        const oldLocation = window.location
        var url = 'http://124.220.171.17:3000/login?redir='
        const nowUrl = oldLocation.toString().slice(7)
        //url = url + encodeURIComponent(nowUrl)
        url = url + nowUrl
        window.location.href = url
    }
}

export {
    setToken,
    getToken,
    removeToken,
    verifyToken
}
