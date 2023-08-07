import api from '../base';

const fetchRoom = {
  create: async ({ roomName }) => {
    return await api({
      method: 'POST',
      url: `/api/chat/chat_room`,
      data: {
        name: roomName,
      },
    }).catch((error) => {
      if (error.response) {
        // console.log(error.response.data)
        // console.log(error.response.status)
        // console.log(error.response.headers)
      } else if (error.request) {
        // console.log(error.request)
      } else {
        // console.log('Error', error.message)
      }
    });
  },

  read: async () => {
    return await api({
      method: 'GET',
      url: `/api/chat/chat_room`,
    }).catch((error) => {
      if (error.response) {
        // console.log(error.response.data)
        // console.log(error.response.status)
        // console.log(error.response.headers)
      } else if (error.request) {
        // console.log(error.request)
      } else {
        // console.log('Error', error.message)
      }
    });
  },

  join: async ({ roomName, email }) => {
    return await api({
      method: 'POST',
      url: `/api/chat/room_member`,
      data: {
        name: roomName,
        email,
        // 유저 정보 넣어야함...
      },
    }).catch((error) => {
      if (error.response) {
        // console.log(error.response.data)
        // console.log(error.response.status)
        // console.log(error.response.headers)
      } else if (error.request) {
        // console.log(error.request)
      } else {
        // console.log('Error', error.message)
      }
    });
  },

  execute: async () => {
    return await api({
      method: 'DELETE',
      url: `/api/chat/room_member`,
    }).catch((error) => {
      if (error.response) {
        // console.log(error.response.data)
        // console.log(error.response.status)
        // console.log(error.response.headers)
      } else if (error.request) {
        // console.log(error.request)
      } else {
        // console.log('Error', error.message)
      }
    });
  },
};

export { fetchRoom };
