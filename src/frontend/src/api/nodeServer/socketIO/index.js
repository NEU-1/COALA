import api from '../base'

const socketIO = {
  
  fetchEnter : async (_url) =>{
      return await api({
        method : 'GET',
        url : _url
      })
      .catch(error =>{
        if (error.response){
          // console.log(error.response.data)
          // console.log(error.response.status)
          // console.log(error.response.headers)
        }else if(error.request){
          // console.log(error.request)
        }else{
          // console.log('Error', error.message)
        }
      })
  },
  
  fetchExit : () =>{
    return undefined
  }
}

export default socketIO