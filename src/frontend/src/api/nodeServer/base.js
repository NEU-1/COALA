import axios from 'axios'
// const API_URL ='http://127.0.0.1:3030'
const API_URL = process.env.REACT_APP_NODE_SERVER_URL
// console.log(API_URL)
const api = axios.create({
    baseURL: API_URL,
})

// api token 설정 메소드 정의
api.setToken = function(token){
    const Access_Token = localStorage.getItem('access_tocken');
    const Refresh_Tocken = localStorage.getItem('refresh_token');
    this.defaults.headers.common['Access_Token'] = Access_Token
    this.defaults.headers.common['Access_Token'] = Refresh_Tocken
    this.defaults.headers.common['Access-Control-Allow-Origin'] = [API_URL]
}


// api token 제거 메소드 정의
api.clearToken = function(){
    delete this.defaults.headers.common['Authorization']
}

export default api;