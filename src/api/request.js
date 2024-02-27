// 二次封装axios请求(为了用到它的请求和响应的拦截器)
import axios from "axios";
// 用create方法创建一个axios实例
// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径，发送请求的时候，路径当中会出现
  baseURL: "/",//后面跟本地对应的servlet
  // 设置携带cookie
  withCredentials: true,
  // 代表请求超时时s间5s
  timeout: 150000,
})

// 查
export const get = (url, params) => {
  return requests.get(url, { params });
};

//   增
export const post = (url, data) => {
  return requests.post(url, data);
};
//   改
export const put = (url, data) => {
  return requests.put(url, data);
};

//   删
export const del = (url) => {
  return requests.delete(url);
};

// 封装请求拦截器
requests.interceptors.request.use(config => {
  // config:配置对象，对象里有headers请求头
  // 将token存放
  // console.log(getToken())
  if(getToken()){
    // console.log('存在')
    const token = localStorage.getItem('HOSPITALTOKEN')//或者从vuex中拿也行
    config.headers.TOKEN = token;
  }else{
    // console.log('token不存在')
    // window.location.replace('/login')
  }

  return config
}), (error) => {
  return Promise.reject(error)
}

import { showMessage } from "@/util/message";
import { getToken, removeToken,removeUserData,removeUsername } from "@/util/token";
import store from "@/store";
// 封装响应拦截器
requests.interceptors.response.use(res => {
  // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
  // console.log(res)
  if (res.data.flag === false) {
    // console.log(res.data.msg)
    if(res.data.msg === 'NOTLOGIN' ){ 
      // console.log(res.data.msg)
      showMessage('未登录或登录已过期，请重新登录')


      // 用于token过期的处理
      removeToken()
      removeUsername()
      removeUserData()
      //重定向登录页面，并且将浏览器保存的用户数据和页面展示出来的用户信息全部清除
      window.location.replace('/#/login')
      store.commit('USERLOGOUT')
      return
    }
  }
  return res.data;
}), (error) => {
  return Promise.reject(error)
}

export default requests;