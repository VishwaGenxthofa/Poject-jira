// import axios from "axios";
// import { getToken } from "./Aunth";
// const Api=axios.create({
 
//     baseURL:"https://dummyjson.com/auth/",
//     headers:{
//         'content-type':'apllication/json'
//     }
    
// })
//  Api.interceptors.request.use(
//     (config)=>{
//         const token=getToken()
//         if(token){
//             config.headers.Authorization=`Bearer ${token}`
//         }
//         return(config)
//     },
//     (error)=> Promise.reject(error)
    
//  )
//  export default Api