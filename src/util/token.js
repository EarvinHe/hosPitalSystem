// 存储token和用户信息
// token
export const setToken = (token) => {
    localStorage.setItem('HOSPITALTOKEN', token)
}

export const getToken = () => {
    return localStorage.getItem('HOSPITALTOKEN')
}

export const removeToken = () => {
    localStorage.removeItem('HOSPITALTOKEN')
}

// 用户信息
export const setUserName = (userName) => {
    localStorage.setItem('hosUserName', userName)
}

export const gettUserName = () => {
    return localStorage.getItem('hosUserName')
}

export const removeUsername = () => {
    localStorage.removeItem('hosUserName')
}

export const setUserData = (userData) => {
    localStorage.setItem('UserData', userData)
}

export const getUserData = () => {
    /* 将JavaScript对象转换为JSON字符串来存储，
    并在需要时将其转换回JavaScript对象。
    可以使用JSON.stringify()方法将对象转换为字符串进行存储，
    然后使用JSON.parse()方法将字符串转换回对象进行使用。 */
    return JSON.parse(localStorage.getItem('UserData'))
}

export const removeUserData = () => {
    return localStorage.removeItem('UserData')
}