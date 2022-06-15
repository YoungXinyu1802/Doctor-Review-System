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

const verifyToken = () => {
    var goLogin = true
    //
    const qs =require('qs')
    console.log( window.location.href )
    const searchParams = qs.parse( window.location.href.split('?')[1] )
    console.log( searchParams )
    if( searchParams.hasOwnProperty('token') ){
        setToken( searchParams.token )
        window.localStorage.setItem('userName', searchParams.userName )
        window.localStorage.setItem('userId', searchParams.userId)
        goLogin = false
    }
    //
    const token = getToken()
    if( token ){
            var url="http://124.220.171.17:3000/api/oauth/verify"
            url = url + '?token=' + token
            console.log(url)
            axios.get(url
            ).then( function (res){
                console.log(res)
                if( res.data.code != 0) {
                    console.log("The token is false")
                }else{
                    console.log("The token is true")
                    window.localStorage.setItem('userName', res.data.data.userName)
                    window.localStorage.setItem('userId', res.data.data.userId)
                    setToken(token)
                    goLogin = false
                }
            }).catch(function (error){
                console.log(error)
            })
    }
    if( goLogin == true ){
        const oldLocation = window.location
        var url = 'http://124.220.171.17:3000/login?redir='
        const nowUrl = oldLocation.toString().slice(7)
        url = url + encodeURIComponent(nowUrl)
        window.location.href = url
    }
    // const qs =require('qs')
    // console.log( window.location.href )
    // const searchParams = qs.parse( window.location.href.split('?')[1] )
    // console.log( searchParams )
    // if( searchParams.hasOwnProperty('token') ){
    //     setToken( searchParams.token )
    //     window.localStorage.setItem('userName', searchParams.userName )
    //     window.localStorage.setItem('userId', searchParams.userId)
    // }else{
    //     const oldLocation = window.location
    //     var url = 'http://124.220.171.17:3000/login?redir='
    //     const nowUrl = oldLocation.toString().slice(7)
    //     url = url + encodeURIComponent(nowUrl)
    //     //url = url + nowUrl
    //     window.location.href = url
    // }
    // if (token != undefined) {
    //     const url="http://124.220.171.17:3000/api/oauth/verify"
    //     let formData=new FormData()
    //     formData.append("token",token)
    //     axios.get(url, {
    //         params: {
    //             token: token
    //         }
    //     }).then( function (res){
    //         if( res.data.code != 0) {
    //             console.log("The token is false")
    //             const oldLocation = window.location
    //             var url = 'http://124.220.171.17:3000/login?redir='
    //             const nowUrl = oldLocation.toString().slice(7)
    //             url = url + encodeURIComponent(nowUrl)
    //             //url = url + nowUrl
    //             window.location.href = url
    //         }else{
    //             window.localStorage.setItem('userName', res.data.data.userName)
    //             setToken(token)
    //             console.log("The token is true")
    //         }
    //     }).catch(function (error){
    //         console.log(error)
    //     })
    // }else{
    //     const oldLocation = window.location
    //     var url = 'http://124.220.171.17:3000/login?redir='
    //     const nowUrl = oldLocation.toString().slice(7)
    //     url = url + encodeURIComponent(nowUrl)
    //     //url = url + nowUrl
    //     window.location.href = url
    // }
}

export {
    setToken,
    getToken,
    removeToken,
    verifyToken
}
