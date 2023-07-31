// 存储token和用户信息
// token
export const setToken =(token)=>{
    localStorage.setItem('HOSPITALTOKEN',token)
}

export const getToken = ()=>{
   return localStorage.getItem('HOSPITALTOKEN')
}

export const removeToken = ()=>{
    localStorage.removeItem('HOSPITALTOKEN')
}

// 用户信息
export const setUserName = (userName)=>{
    localStorage.setItem('hosUserName',userName)
}

export const gettUserName = ()=>{
   return localStorage.getItem('hosUserName')
}

export const removeUsername= ()=>{
    localStorage.removeItem('hosUserName')
}

export const setUserData = (userData)=>{
    localStorage.setItem('UserData',userData)
}

export const getUserData = ()=>{
  return localStorage.getItem('UserData')
}

export const   removeUserData = ()=>{
   return localStorage.removeItem('UserData')
}