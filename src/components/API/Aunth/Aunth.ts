export const getToken=()=>{
    return localStorage.getItem("jwtToken") || null
}
export const setToken=(token:string)=>{
    return localStorage.setItem("jwtToken",token)
}
export const removeToken=()=>{
    localStorage.removeItem("jwtToken")
}