import api from '../base'

const fetchChat = {
  
  create : async ({roomName}) =>{
      return await api({
        method : 'POST',
        url : `/api/chat/chats`,
        data:{
          name : roomName,
        }
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
  
  getLog : async () =>{
    return await api({
      method : 'GET',
      url : `/api/chat/chats`,

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

}

export {
  fetchChat
}